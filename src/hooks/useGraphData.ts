/**
 * @deprecated This hook has been deprecated as the Market tab is no longer used.
 * The hook is kept for reference purposes only. Do not use this hook in new code.
 * @since Deprecated in 2025
 */

import { useQuery } from '@tanstack/react-query';
import { getApi } from '@services/network/Api';
import { ApiEndpoints } from '@services/network/ApiEndpoints';

interface GraphDataOptions {
  currency?: string;
  id?:string;
  count?:string;
  interval?:string
}

/**
 * @deprecated This function has been deprecated. Use alternative data fetching methods.
 */
const fetchGraphData = async ({ currency, id, count, interval }: GraphDataOptions) => {
  try {
    console.log('[fetchGraphData] Request Params:', { currency, id, count, interval });

    const response = await getApi(ApiEndpoints.MARKET_CHART, {
      currency,
      id,
      count,
      interval,
    });

    console.log('[fetchGraphData] Response:', response);

    return response;
  } catch (error) {
    console.error('[fetchGraphData] Error occurred:', {
      currency,
      id,
      count,
      interval,
      error: error?.response?.data || error.message || error,
    });

    // Optional: rethrow the error if the caller should handle it
    throw error;
  }
};

/**
 * @deprecated This hook has been deprecated as the Market tab is no longer used.
 * The hook is kept for reference purposes only. Do not use this hook in new code.
 */
const useGraphData = (options: GraphDataOptions = {}) => {
  const {currency = 'USD', id , count , interval } = options;

  return useQuery({
    queryKey: ['graphData', currency, id, count , interval],
    queryFn: () => fetchGraphData({ currency , id, count , interval}),
    retry: false,
    staleTime: 1000 * 60,
    });

 
};

export default useGraphData;
