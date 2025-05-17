import { Config } from '@config/Config';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface SwapRequestBody {
  ask_address: string;
  ask_amount: string;
  bid_address: string;
  bid_address_pubkey: string;
  bid_amount: string;
  bid_asset: string;
  fee_address: string;
  fee_address_pubkey: string;
  rate: number;
  slippage: string;
  slippage_tolerance: boolean;
}

const postSwap = async ({
  pair,
  body,
}: {
  pair: string;
  body: SwapRequestBody;
}) => {
  const response = await axios.post(
    `${Config.RUNEDEX_BASE_URL}/v1/pairs/${pair}/swap`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const useGetRuneDexPsbt = () => {
  return useMutation({
    mutationFn: postSwap,
  });
};
