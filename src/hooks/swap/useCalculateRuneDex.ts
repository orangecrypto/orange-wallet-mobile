import { BigNumber } from '@orangecryptohq/orangeseed/dist/utils/bignumber';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Config } from '@config/Config';

type CalculateRuneDexParams = {
  pair: string;
  bidAmount: BigNumber;
  slippage: number; // Add slippage to the params
};

type CalculateRuneDexResponse = {
  data: any;
};

// Simple GET method
const fetchRuneDexData = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error('RuneDEX API error:', error?.response?.data || error.message);
    throw new Error('Failed to fetch data from RuneDEX');
  }
};

export const useCalculateRuneDex = () => {
  const mutation = useMutation<CalculateRuneDexResponse, Error, CalculateRuneDexParams>({
    mutationFn: async ({ pair, bidAmount, slippage }) => {
      if (!pair || !bidAmount || bidAmount.lte(0)) {
        throw new Error('Invalid pair or bidAmount');
      }

      const url = `${Config.RUNEDEX_BASE_URL}/v1/pairs/${pair}/calculate?bid_amount=${bidAmount.toString()}&slippage=${slippage}`;

      const response = await fetchRuneDexData(url);

      return { data: response };
    },
  });

  return {
    calculateRuneDex: mutation.mutateAsync,
    fetchRuneDexData,
    ...mutation,
  };
};
