import { getOrdinalsByAddress } from '@orangecryptohq/orangeseed/dist/api/orange';
import { BtcOrdinal } from '@orangecryptohq/orangeseed/dist/types';
import { useQuery } from '@tanstack/react-query';
import useBtcClient from './useBtcClient';
import { useSelector } from 'react-redux';
import { appReducerType } from '@redux/slice/appReducer';

const useOrdinalsByAddress = () => {
    const { network , selectedAccount} = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
    const { btcClient } = useBtcClient();
    const fetchOrdinals = async (): Promise<BtcOrdinal[]> => {
        const limit = 10; 
        try {
     const ordinals = await getOrdinalsByAddress(btcClient, network.type, selectedAccount?.ordinalsAddress);
    // const ordinals = await getOrdinalsByAddress(btcClient, network.type, 'bc1psgkjsnvc5dq2eete2q98qnmt3qsdp23wxdff6qvp9mumve9vh09smxlnuq');
      return ordinals.filter((item) => item.id !== undefined);
    } catch (error) {
      console.error("Error fetching ordinals:", error);
      return [];
    }
  };

  const {
    data: ordinals = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['ordinals', network.type, selectedAccount?.ordinalsAddress],
    queryFn: fetchOrdinals,
    enabled: !!selectedAccount?.ordinalsAddress,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnMount: false, // Don't refetch if data is fresh
    refetchOnWindowFocus: false, // Don't refetch on focus
    retry: 1, // Reduce retries
  });

  return {
    ordinals,
    isLoading,
    isError,
    refetch,
  };
};

export default useOrdinalsByAddress;
