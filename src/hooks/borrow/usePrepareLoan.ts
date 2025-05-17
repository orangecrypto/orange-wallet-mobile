import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Config } from '@config/Config';
import AppConfig from 'react-native-config';

interface PrepareLoanParams {
  instantOfferId: string;
  feeRate: number;
  tokenAmount: string;
}

interface LoanPrepareSuccessResponse {
  prepare_offer_id: string;
  base64_psbt: string;
  sides: {
    index: number;
    address: string;
    sighash: number;
    disable_tweak_signer: boolean;
  }[];
}

async function prepareLoanRequest({
  instantOfferId,
  feeRate,
  tokenAmount,
  btcAddress,
  btcPublicKey,
  ordinalsAddress,
  ordinalsPublicKey,
  liquidiumToken,
}: PrepareLoanParams & {
  btcAddress: string;
  btcPublicKey: string;
  ordinalsAddress: string;
  ordinalsPublicKey: string;
  liquidiumToken: string;
}): Promise<LoanPrepareSuccessResponse> {
  const url = `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/loans/start/prepare`;

  const body = {
    instant_offer_id: instantOfferId,
    fee_rate: feeRate,
    token_amount: tokenAmount,
    borrower_payment_address: btcAddress,
    borrower_payment_pubkey: btcPublicKey,
    borrower_ordinal_address: ordinalsAddress,
    borrower_ordinal_pubkey: ordinalsPublicKey,
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
      'An unknown error occurred';
    console.error('❌ Loan Prepare Failed:', errorMessage);
    throw new Error(errorMessage);
  }
}

export function usePrepareLoan() {
  const {
    selectedAccount: {
      ordinalsAddress,
      btcAddress,
      ordinalsPublicKey,
      btcPublicKey,
    } = {},
    liquidiumToken,
  } = useSelector((state: any) => state.appReducer);

  const {
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useMutation<LoanPrepareSuccessResponse, Error, PrepareLoanParams>({
    mutationFn: async (params) => {
      return await prepareLoanRequest({
        ...params,
        btcAddress,
        btcPublicKey,
        ordinalsAddress,
        ordinalsPublicKey,
        liquidiumToken,
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message || 'Loan Preparation Failed',
      });
    },
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Loan Prepared Successfully',
        text2: `Offer ID: ${data.prepare_offer_id}`,
      });
    },
  });

  return {
    prepareLoan: mutate,       
    prepareLoanAsync: mutateAsync, 
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset, 
  };
}
