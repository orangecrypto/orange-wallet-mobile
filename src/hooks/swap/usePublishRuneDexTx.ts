import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface PublishTxRequestBody {
  context?: string;
  psbt: string;
  request_id: string;
}

export interface PublishTxResponse {
  tx_id: string;
  status: 'pending' | 'success' | 'failed';
}

const publishTx = async (body: PublishTxRequestBody): Promise<PublishTxResponse> => {
  const response = await axios.post('https://app.runesdex.com/v1/publish-tx', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const usePublishRuneDexTx = () => {
  return useMutation({
    mutationFn: publishTx,
  });
};
