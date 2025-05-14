import { Config } from '@config/Config';
import { signBitcoinMessage } from '@screens/borrow/authentication/GenrateSignature';
import axios from 'axios';

const PREPARE_URL = 'https://alpha.liquidium.fi/api/v1/auth/prepare';
const SUBMIT_URL = 'https://alpha.liquidium.fi/api/v1/auth/submit';


export const fetchAuthData = async (btcAddress, ordinalsAddress, seed) => {
  try {
    const { data } = await axios.post(
      PREPARE_URL,
      {
        payment_address: btcAddress,
        ordinals_address: ordinalsAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${Config.LIQUIDIUM_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const ordinalsSig = await signBitcoinMessage(data.ordinals.message, seed);
    const paymentSig = await signBitcoinMessage(data.payment.message, seed);

    const finalPayload = {
      ordinals: {
        address: data.ordinals.address,
        signature: ordinalsSig,
        nonce: data.ordinals.nonce,
      },
      payment: {
        address: data.payment.address,
        signature: paymentSig,
        nonce: data.payment.nonce,
      },
    };
  return finalPayload
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || `API error: ${error.message}`
    );
  }
};

export const submitAuthData =async (finalPayload)=>{
  const { data } = await axios.post(SUBMIT_URL, finalPayload, {
    headers: {
      Authorization: `Bearer ${Config.LIQUIDIUM_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
return data
}

export const debounce = (callback: (...args: any[]) => void, delay = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);
    };
  };