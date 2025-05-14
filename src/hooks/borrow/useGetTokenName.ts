// hooks/useGetTokenName.ts
import { fetchRuneCollateral } from '@screens/mainwallet/loan/LoanUtils';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export const useGetTokenName = (runeId: string) => {
  const { liquidiumToken } = useSelector((state: any) => state.appReducer);

  const { data, error, isLoading } = useQuery({
    queryKey: ['runeCollateral', runeId],
    queryFn: () => fetchRuneCollateral(runeId, liquidiumToken),
    enabled: !!runeId && !!liquidiumToken,
    staleTime: 5 * 60 * 1000,
  });

  const getName = async () => data ?? 'Unknown';

  console.log('useGetTokenName', runeId, data);

  return { getName, data, error, isLoading };
};
