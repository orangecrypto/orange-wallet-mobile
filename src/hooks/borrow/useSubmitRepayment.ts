import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Config } from '@config/Config';

interface SubmitRepaymentParams {
  offerId: string;
  signedPsbtBase64: string;
}

interface RepaymentSubmitSuccessResponse {
  repayment_transaction_id: string;
}

async function submitRepaymentRequest({
  offerId,
  signedPsbtBase64,
  liquidiumToken,
}: SubmitRepaymentParams & { liquidiumToken: string }): Promise<RepaymentSubmitSuccessResponse> {
  const url = `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/loans/repay/submit`;

  const body = {
    offer_id: offerId,
    signed_psbt_base_64: signedPsbtBase64,
  };

  const headers = {
    Authorization: `Bearer ${Config.LIQUIDIUM_API_KEY}`,
    'Content-Type': 'application/json',
    'x-user-token': liquidiumToken,
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.errorMessage ||
      error?.response?.data?.error ||
      error?.message ||
      'An unknown error occurred';
    console.error('❌ Repayment Submit Failed:', errorMessage);
    throw new Error(errorMessage);
  }
}

export function useSubmitRepayment() {
  const { liquidiumToken } = useSelector((state: any) => state.appReducer);

  const {
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useMutation<RepaymentSubmitSuccessResponse, Error, SubmitRepaymentParams>({
    mutationFn: async (params) => {
      return await submitRepaymentRequest({
        ...params,
        liquidiumToken,
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message || 'Repayment Submission Failed',
      });
    },
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Repayment Submitted Successfully',
        text2: `Tx ID: ${data.repayment_transaction_id}`,
      });
    },
  });

  return {
    submitRepayment: mutate,
    submitRepaymentAsync: mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  };
}
