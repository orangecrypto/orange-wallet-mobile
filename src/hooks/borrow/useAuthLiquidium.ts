import useSeedVault from '@hooks/useSeedVault';
import { fetchAuthData, submitAuthData } from '@screens/borrow/authentication/GenerateToken';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

export const useAuthLiquidium = (shouldRun = true) => {
  const {
    selectedAccount: { ordinalsAddress, btcAddress } = {},
  } = useSelector((state: any) => state.appReducer);
  console.log('useAuthLiquidium',`ordinalsAddress :${ordinalsAddress}`)
  console.log('useAuthLiquidium',`btcAddress :${btcAddress}`)
  const { getSeed } = useSeedVault();
  const [authLoading, setAuthLoading] = useState(false);
  const [authData, setAuthData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const getAuthToken = useCallback(async () => {
    try {
      setAuthLoading(true);
      setError(null);

      const seed = await getSeed();
      const payload = await fetchAuthData(btcAddress, ordinalsAddress, seed);
      const result = await submitAuthData(payload);

      setAuthData(result);
      return result;
    } catch (err) {
      console.error('Auth submit error:', err);
      setError(err);
      return null;
    } finally {
      setAuthLoading(false);
    }
  }, [btcAddress, ordinalsAddress, getSeed]);

  

  return {
    authLoading,
    authData,
    error,
    getAuthToken,
  };
};
