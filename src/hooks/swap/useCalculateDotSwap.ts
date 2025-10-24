import { Config } from '@config/Config';
import axios from 'axios';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

interface GetReceiveAmountParams {
  exchangeToken: string;
  receiveToken: string;
  exchangeAmount: string;
  address: string;
}

export const useCalculateDotSwap = () => {
  const getReceiveAmount = useCallback(async ({
    exchangeToken,
    receiveToken,
    exchangeAmount,
    address,
  }: GetReceiveAmountParams): Promise<any | null> => {
    try {
      const requestData = {
        send_coin_type: "btc",
        send_tick: exchangeToken,
        receive_coin_type: "runes",
        receive_tick: receiveToken,
        address,
      };

      console.log("getReceiveAmount request", requestData);

      const response = await axios.post(`${Config.DOTSWAP_BASE_URL}/brc20swap/swap_info`, requestData);

      if (!response.data || !response.data.data) {
        const msg = response.data?.msg || "Unknown error from API";
        Toast.show({ type: 'error', text1: msg });
        console.error("API responded with error:", msg);
        return null;
      }

      console.log("getReceiveAmount response", response.data.data);
      return response.data.data;

    } catch (err: any) {
      let errorMessage = "Failed to fetch swap info.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.msg || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      Toast.show({ type: 'error', text1: errorMessage });
      console.error("Error:", errorMessage);
      return null;
    }
  }, []);

  return { getReceiveAmount };
};
