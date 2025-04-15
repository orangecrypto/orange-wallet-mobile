import { store } from '@redux/store';
import { useState, useEffect } from 'react';
import { fetchStxAddressData } from '@orangecryptohq/orangeseed';
import useSelectedNetwork from './useSelectedNetwork';

const useStxData = () => {
  const stxAddress = store.getState().appReducer.selectedAccount?.stxAddress;
  const network = useSelectedNetwork();
  const offset = 0;
  const paginationLimit = 10;

  const [data, setData] = useState<{ balance: number; availableBalance: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchStxAddressData(stxAddress, network, offset, paginationLimit);
      setData(result);
    } catch (err: any) {
      console.error("Error fetching STX data:", err);
      setData({ balance: 0.0, availableBalance: 0.0 }); // fallback
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stxAddress && network) {
      fetchData();
    }
  }, [stxAddress, network]);

  return { data, loading, error, stxAddress };
};

export default useStxData;
