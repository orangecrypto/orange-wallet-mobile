/**
 * @deprecated This hook has been deprecated as the Market tab is no longer used.
 * The hook is kept for reference purposes only. Do not use this hook in new code.
 * @since Deprecated in 2025
 */

import { getApi } from '@services/network/Api';
import { ApiEndpoints } from '@services/network/ApiEndpoints';
import { useQuery } from '@tanstack/react-query';

interface MarketDataOptions {
  currency?: string;

}

/**
 * @deprecated This function has been deprecated. Use alternative data fetching methods.
 */
const fetchMarketData = async ({ currency }: MarketDataOptions) => {
  const response = await getApi(ApiEndpoints.MARKET_ASSETS, { currency });

  // Prioritize the coin with name === 'Orange'
  const sortedResponse = response.sort((a: any, b: any) => {
    if (a.name === 'Orange') return -1;
    if (b.name === 'Orange') return 1;
    return 0;
  });

  return sortedResponse;
};

/**
 * @deprecated This hook has been deprecated as the Market tab is no longer used.
 * The hook is kept for reference purposes only. Do not use this hook in new code.
 */
const useMarketData = (options: MarketDataOptions = {}) => {
  const {currency= 'USD' } = options;

  return useQuery({
    queryKey: ['marketData', currency],
    queryFn: () => fetchMarketData({ currency }),
    retry: false,
    });

 
};

export default useMarketData;
