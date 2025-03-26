import { getInscription, Inscription } from '@orangecryptohq/orangeseed/dist';
import { appReducerType } from '@redux/slice/appReducer';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useAddressInscription = (ordinalId: string, ordinal?: Inscription | null) => {
  const { selectedAccount: { ordinalsAddress } = {}, network } = useSelector(
    (state: { appReducer: appReducerType }) => state.appReducer
  );

  const fetchOrdinals = async (): Promise<Inscription> => {
    if (ordinal && ordinal.id === ordinalId) return ordinal;
    if (!ordinalsAddress || !ordinalId) {
      throw new Error('ordinalsAddress and ordinalId are required');
    }
    return await getInscription(network.type, ordinalsAddress, ordinalId);
  };

  return useQuery({
    queryKey: ['ordinal-details', ordinalsAddress, ordinalId],
    queryFn: fetchOrdinals,
    enabled: Boolean(ordinal || (ordinalsAddress && ordinalId)),
    retry: 3,
    staleTime: 1000 * 60 * 5, // Cache result for 5 minutes
  });
};

export default useAddressInscription;
