import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Config } from '@config/Config';
import Toast from 'react-native-toast-message';
import AppConfig from 'react-native-config';
import { useSelector } from 'react-redux';

interface SubmitLoanParams {
  signed_psbt_base_64: string;
  prepare_offer_id: string;
}

interface SubmitLoanResponse {
  loan_transaction_id: string;
}

export function useSubmitLoan() {

  const { liquidiumToken} = useSelector((state: any) => state.appReducer);
  const mutationFn = async ({
    signed_psbt_base_64,
    prepare_offer_id,
  }: SubmitLoanParams): Promise<SubmitLoanResponse> => {
    const url = `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/loans/start/submit`;

    const body = {
      signed_psbt_base_64,
      prepare_offer_id,
    };

    const headers = {
      Authorization: `Bearer ${AppConfig.LIQUIDIUM_API_KEY}`,
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
        'Loan submission failed. Please try again.';

      console.error('❌ Loan Submit Failed:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const mutation = useMutation<SubmitLoanResponse, Error, SubmitLoanParams>({
    mutationFn,

    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message || 'Loan Submission Failed',
      });
    },

    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Loan Submitted!',
        text2: `Transaction ID: ${data.loan_transaction_id}`,
      });
    },
  });

  return {
    submitLoan: mutation.mutate,
    submitLoanAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
