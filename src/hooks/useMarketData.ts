import { getApi } from '@services/network/Api';
import { ApiEndpoints } from '@services/network/ApiEndpoints';
import { useQuery } from '@tanstack/react-query';

interface MarketDataOptions {
  currency?: string;
  
}

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


const useMarketData = (options: MarketDataOptions = {}) => {
  const {currency= 'USD' } = options;

  return useQuery({
    queryKey: ['marketData', currency],
    queryFn: () => fetchMarketData({ currency }),
    retry: false,
    });

 
};

export default useMarketData;
