import { fetchStxPendingTxData } from '@orangecryptohq/orangeseed/dist';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import useSelectedNetwork from './useSelectedNetwork';
import { appReducerType } from '@redux/slice/appReducer';
const useStxPendingTxData = () => {
    const { selectedAccount } = useSelector((state: appReducerType) => state.appReducer);
    const { stxAddress } = selectedAccount;

  const selectedNetwork = useSelectedNetwork();
  const result = useQuery({
    queryKey: ['stx-pending-transaction', { stxAddress, selectedNetwork }],
    queryFn: () => fetchStxPendingTxData(stxAddress , selectedNetwork),
  });
  return result;
};

export default useStxPendingTxData;