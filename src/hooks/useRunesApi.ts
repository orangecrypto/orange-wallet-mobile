import { RunesApi } from '@orangecryptohq/orangeseed';
import { store } from '@redux/store';
import { useMemo } from 'react';

const useRunesApi = () => {
  
  const ordinalsAddress = store.getState().appReducer.selectedAccount?.ordinalsAddress
  const runesApi = useMemo(() => 
    new RunesApi({ network: store.getState().appReducer.network?.type }), 
  []);

  return { runesApi, ordinalsAddress };
};

export default useRunesApi;