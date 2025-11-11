import { useQuery } from '@tanstack/react-query';
import { getFtData, getOrdinalsFtBalance } from '@orangecryptohq/orangeseed';
import { store } from '@redux/store';
import AppConfig from 'react-native-config';

/**
 * React Query hook for fetching BRC-20 data separately (slow API)
 * This allows fast APIs to render immediately without waiting for BRC-20
 */
export const useBrc20Data = (
    ordinalsAddress: string,
    enabled: boolean = true
) => {
    return useQuery({
        queryKey: ['brc20-data', ordinalsAddress],
        queryFn: async () => {
            console.log('⏱️ [BRC20 API] Starting BRC-20 fetch at:', new Date().toLocaleTimeString());
            const startTime = Date.now();

            try {
                const data = await Promise.race([
                    getOrdinalsFtBalance(
                        AppConfig.ORANGESEED_API_KEY,
                        store.getState().appReducer.network?.type,
                        ordinalsAddress
                    ),
                    new Promise((_, reject) => {
                        setTimeout(() => reject(new Error('BRC-20 API timeout after 5 seconds')), 5000);
                    })
                ]);

                console.log(`⏱️ [BRC20 API] BRC-20 took ${Date.now() - startTime}ms`);
                return data;
            } catch (error) {
                console.warn(`⏱️ [BRC20 API] BRC-20 failed/timeout after ${Date.now() - startTime}ms`);
                return []; // Return empty array on timeout/error
            }
        },
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        enabled: enabled && !!ordinalsAddress,
    });
};

/**
 * React Query hook for fetching fast balance data (BTC, Runes, Stacks)
 * This hook fetches only the fast APIs to allow immediate rendering
 *
 * @param btcClient - Bitcoin client instance
 * @param runesApi - Runes API instance
 * @param bitcoinAddress - Bitcoin address
 * @param ordinalsAddress - Ordinals address
 * @param stxAddress - Stacks address
 * @param stackNetwork - Stacks network configuration
 * @param enabled - Whether to enable automatic fetching
 */
export const useBalanceData = (
    btcClient: any,
    runesApi: any,
    bitcoinAddress: string,
    ordinalsAddress: string,
    stxAddress: string,
    stackNetwork: any,
    enabled: boolean = true
) => {
    return useQuery({
        queryKey: ['balance-data', bitcoinAddress, ordinalsAddress, stxAddress],
        queryFn: async () => {
            console.log('⏱️ [BALANCE API] Starting FAST balance fetch (BTC, Runes, Stacks) at:', new Date().toLocaleTimeString());
            const startTime = Date.now();

            // Fetch only FAST APIs (BTC, Runes, Stacks) - ~1 second total
            const btcStart = Date.now();
            const btcPromise = btcClient.getBalance(bitcoinAddress).then(res => {
                console.log(`⏱️ [BALANCE API] BTC took ${Date.now() - btcStart}ms`);
                return res;
            });

            const runesStart = Date.now();
            const runesPromise = runesApi.getRuneFungibleTokens(ordinalsAddress).then(res => {
                console.log(`⏱️ [BALANCE API] Runes took ${Date.now() - runesStart}ms`);
                return res;
            });

            const stxStart = Date.now();
            const stxPromise = getFtData(stxAddress, stackNetwork).then(res => {
                console.log(`⏱️ [BALANCE API] Stacks took ${Date.now() - stxStart}ms`);
                return res;
            });

            const [btcRes, runesRes, stacksRes] = await Promise.allSettled([
                btcPromise,
                runesPromise,
                stxPromise,
            ]);

            const btcBalance = btcRes.status === 'fulfilled' ? btcRes.value : 0;
            const runesTokens = runesRes.status === 'fulfilled' ? runesRes.value : [];
            const stacksTokens = stacksRes.status === 'fulfilled' ? stacksRes.value : [];

            console.log(`⏱️ [BALANCE API] FAST APIs COMPLETE: ${Date.now() - startTime}ms`);

            // Log any failures
            if (btcRes.status === 'rejected') console.error('⏱️ [BALANCE API] BTC failed:', btcRes.reason?.message);
            if (runesRes.status === 'rejected') console.error('⏱️ [BALANCE API] Runes failed:', runesRes.reason?.message);
            if (stacksRes.status === 'rejected') console.error('⏱️ [BALANCE API] Stacks failed:', stacksRes.reason?.message);

            return {
                btcBalance,
                runesTokens,
                stacksTokens,
            };
        },
        staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
        gcTime: 5 * 60 * 1000, // Cache for 5 minutes (formerly cacheTime)
        refetchOnMount: false, // Don't auto-refetch when component mounts
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        refetchOnReconnect: true, // Do refetch when internet reconnects
        enabled: enabled && !!bitcoinAddress && !!ordinalsAddress && !!stxAddress,
    });
};
