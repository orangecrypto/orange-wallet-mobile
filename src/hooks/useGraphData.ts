import { useQuery } from '@tanstack/react-query';
import { getApi } from '@services/network/Api';
import { ApiEndpoints } from '@services/network/ApiEndpoints';

interface GraphDataOptions {
  currency?: string;
  id?:string;
  count?:string;
  interval?:string
}

const fetchGraphData = async ({ currency , id, count, interval}: GraphDataOptions) => {
  return getApi(ApiEndpoints.MARKET_CHART, {
    currency,
    id,
    count,
    interval
  });
};

const useGraphData = (options: GraphDataOptions = {}) => {
  const {currency = 'USD', id , count , interval } = options;

  return useQuery({
    queryKey: ['graphData', currency, id, count , interval],
    queryFn: () => fetchGraphData({ currency , id, count , interval}),
    retry: false,
    });

 
};

export default useGraphData;
