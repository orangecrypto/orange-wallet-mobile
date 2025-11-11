import { useQuery } from '@tanstack/react-query';
import { getFtData, getOrdinalsFtBalance } from '@orangecryptohq/orangeseed';
import { store } from '@redux/store';
import AppConfig from 'react-native-config';

/**
 * React Query hook for fetching all balance data with caching
 * Reduces redundant API calls and improves performance
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
            console.log('[useBalanceData] Fetching balance data from blockchain APIs...');
            const startTime = Date.now();

            const [btcRes, brc20Res, runesRes, stacksRes] = await Promise.allSettled([
                btcClient.getBalance(bitcoinAddress),
                getOrdinalsFtBalance(
                    AppConfig.ORANGESEED_API_KEY,
                    store.getState().appReducer.network?.type,
                    ordinalsAddress
                ),
                runesApi.getRuneFungibleTokens(ordinalsAddress),
                getFtData(stxAddress, stackNetwork),
            ]);

            const btcBalance = btcRes.status === 'fulfilled' ? btcRes.value : 0;
            const brc20Tokens = brc20Res.status === 'fulfilled' ? brc20Res.value : [];
            const runesTokens = runesRes.status === 'fulfilled' ? runesRes.value : [];
            const stacksTokens = stacksRes.status === 'fulfilled' ? stacksRes.value : [];

            console.log(`[useBalanceData] Balance data fetched in ${Date.now() - startTime}ms`);

            return {
                btcBalance,
                brc20Tokens,
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
