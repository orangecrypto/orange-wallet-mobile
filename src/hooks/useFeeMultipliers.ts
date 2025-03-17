import type { AppInfo } from '@orangecryptohq/orangeseed/dist';
import { fetchAppInfo } from '@orangecryptohq/orangeseed/dist';
import { appReducerType } from '@redux/slice/appReducer';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export const useFeeMultipliers = () => {
  const { network } = useSelector((state: appReducerType) => state.appReducer);

  const fetchFeeMultiplierData = async (): Promise<AppInfo> => {
    const response = await fetchAppInfo(network.type);
    if (!response) throw new Error('Failed to fetch fee multipliers');
    return response;
  };

  return useQuery({
    queryKey: ['fee_multipliers'],
    queryFn: fetchFeeMultiplierData,
  });
};

export default useFeeMultipliers;
