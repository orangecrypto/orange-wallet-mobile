import { useQuery } from '@tanstack/react-query';
import { getApi } from '../../../services/network/Api';
import { ApiEndpoints } from '../../../services/network/ApiEndpoints';

interface MarketDataOptions {
  id?: string;
  convert?: string;
}

const fetchMarketData = async ({ id, convert }: MarketDataOptions) => {
  return getApi(ApiEndpoints.MARKETDATA, {
    id,
    convert,
    count: 108,
    interval: '5m',
  });
};

const useMarketData = (options: MarketDataOptions = {}) => {
  const { id = '1', convert = 'USD' } = options;

  const { data, error, isLoading } = useQuery({
    queryKey: ['marketData', id, convert],
    queryFn: () => fetchMarketData({ id, convert }),
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });

  return { data, error, loading: isLoading };
};

export default useMarketData;
