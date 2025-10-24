import { useState, useCallback } from 'react';

type SwapItem = {
  order_id: string;
  psbt: string; // signed PSBT hex
};

type SendSwapPsbtResponse = {
  tx_id: string;
};

export function useDotSwapSignedPsbt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SendSwapPsbtResponse | null>(null);

  const sendSignedSwapPsbt = useCallback(async (item: SwapItem) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('https://api.dotswap.app/brc20swap/send_swap_psbt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      const json = await res.json();

      if (json.code !== 0) {
        throw new Error(json.msg || 'Unknown error from API');
      }

      setResponse({ tx_id: json.data.tx_id });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sendSignedSwapPsbt,
    loading,
    error,
    response,
  };
}
