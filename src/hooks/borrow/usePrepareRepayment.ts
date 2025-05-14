import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Config } from '@config/Config';

interface PrepareRepaymentParams {
  offerId: string;
  feeRate: number;
}

interface RepaymentPrepareSuccessResponse {
  offer_id: string;
  base64_psbt: string;
  sides: {
    index: number;
    address: string;
    sighash: number;
    disable_tweak_signer: boolean;
  }[];
  utxo_content: {
    contains_runes: boolean;
    contains_inscriptions: boolean;
  };
}

async function prepareRepaymentRequest({
  offerId,
  feeRate,
  liquidiumToken,
}: PrepareRepaymentParams & { liquidiumToken: string }): Promise<RepaymentPrepareSuccessResponse> {
  const url = `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/loans/repay/prepare`;

  const body = {
    offer_id: offerId,
    fee_rate: feeRate,
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
    console.error('❌ Repayment Prepare Failed:', errorMessage);
    throw new Error(errorMessage);
  }
}

export function usePrepareRepayment() {
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
  } = useMutation<RepaymentPrepareSuccessResponse, Error, PrepareRepaymentParams>({
    mutationFn: async (params) => {
      return await prepareRepaymentRequest({
        ...params,
        liquidiumToken,
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message || 'Repayment Preparation Failed',
      });
    },
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Repayment Prepared Successfully',
        text2: `Offer ID: ${data.offer_id}`,
      });
    },
  });

  return {
    prepareRepayment: mutate,
    prepareRepaymentAsync: mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  };
}
