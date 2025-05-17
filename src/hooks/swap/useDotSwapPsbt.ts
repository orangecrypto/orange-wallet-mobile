import { Config } from '@config/Config';
import { useState, useEffect, useCallback } from 'react';

type SwapPsbtResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export function useDotSwapPsbt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SwapPsbtResponse | null>(null);

  const getDotSwapPsbt = useCallback(async (params: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${Config.DOTSWAP_BASE_URL}/brc20swap/get_swap_psbt2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         // 'Authorization': 'Bearer orange-wallet'
        },
        body: JSON.stringify(params),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'API request failed');
      }

      setResponse({ success: true, data });
    } catch (err: any) {
      setError(err.message);
      setResponse({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  return { getDotSwapPsbt, loading, error, response };
}
