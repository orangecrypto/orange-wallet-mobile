import { useQuery } from '@tanstack/react-query';
import { getApi } from '../services/network/Api';
import { ApiEndpoints } from '../services/network/ApiEndpoints';

interface MarketDataOptions {
  currency?: string;
  
}

const fetchMarketData = async ({ currency }: MarketDataOptions) => {
  return getApi(ApiEndpoints.MARKET_ASSETS, {
    currency
  });
};

const useMarketData = (options: MarketDataOptions = {}) => {
  const {currency= 'USD' } = options;

  return useQuery({
    queryKey: ['marketData', currency],
    queryFn: () => fetchMarketData({ currency }),
    });

 
};

export default useMarketData;
