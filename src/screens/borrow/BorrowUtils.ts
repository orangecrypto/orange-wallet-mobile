import { btcTransaction, NetworkType, satsToBtc } from "@orangecryptohq/orangeseed";
import { getUTXOs } from "@screens/swap/CreatePSBT";
import AppConfig from 'react-native-config';
import * as bitcoin from "bitcoinjs-lib";
/**
 * Validates if the amount falls within any of the valid ranges.
 * Returns true if valid, or an error message string if not.
 *
 * @param {Array<{min: string, max: string}>} ranges
 * @param {string | number} amount
 * @returns {true | string}
 */
export const validateAmountWithRanges = (ranges, amount) => {
  if (!Array.isArray(ranges) || ranges.length === 0) {
    return 'No ranges are available.';
  }

  try {
    const amountBigInt = BigInt(amount);

    const isInRange = ranges.some(({ min, max }) => {
      const minVal = BigInt(min);
      const maxVal = BigInt(max);
      return amountBigInt >= minVal && amountBigInt <= maxVal;
    });

    if (isInRange) return true;

    // Sort ranges by min value
    const sortedRanges = ranges
      .map(({ min, max }) => ({
        min: BigInt(min),
        max: BigInt(max),
      }))
      .sort((a, b) => (a.min < b.min ? -1 : 1));

    // Find nearest range min > input
    const nearestMin = sortedRanges.find(r => amountBigInt < r.min)?.min;

    // Format all available ranges
    const rangeText = sortedRanges
      .map(r => `${r.min.toString()} to ${r.max.toString()}`)
      .join(', ');

    const nearestText = nearestMin
      ? ` Nearest available offer from ${nearestMin.toString()}.`
      : '';

    return `No offers available for this amount.${nearestText} Available ranges: ${rangeText}`;
  } catch (err) {
    console.error('Invalid input or range format:', err);
    return 'Invalid input.';
  }
};
const sats = (val: any) => satsToBtc(new BigNumber(val || 0));

export const calculateFiatValues = async (breakdown) => {
  try {
    const response = await fetch(
      `https://api-orange-marketcap.orangewebservices.com/coins/fiat?symbol=BTC&fiat_currency=USD`,
      {
        headers: {
          'apikey': AppConfig.ORANGE_MARKETCAP_API_KEY,
        },
      }
    );
    const data = await response.json();
    const btcPrice = data?.BTC;

    if (!btcPrice) return null;

    const repayment = sats(breakdown.total_repayment_sats) * btcPrice;
    const loan = sats(breakdown.principal_sats) * btcPrice;
    const interest = sats(breakdown.interest_sats) * btcPrice;

    return {
      repayment: Number(repayment.toFixed(0)),
      loan: Number(loan.toFixed(0)),
      interest: Number(interest.toFixed(0)),
    };
  } catch (err) {
    console.error('Error calculating fiat values:', err);
    return null;
  }
};
export const getFiateValue = async (value, symbol = 'BTC') => {
  try {
    const response = await fetch(
      `https://api-orange-marketcap.orangewebservices.com/coins/fiat?symbol=${symbol}&fiat_currency=USD`,
      {
        headers: {
          'apikey': AppConfig.ORANGE_MARKETCAP_API_KEY,
        },
      }
    );
    const data = await response.json();
    const price = data?.[symbol];
    if (price) {
      return value * price;
    }
    return null;
  } catch (error) {
    console.error('Error fetching fiat value:', error);
    return null;
  }
};




export const getFiateRate = async (symbol = 'BTC') => {
  try {
    const response = await fetch(
      `https://api-orange-marketcap.orangewebservices.com/coins/fiat?symbol=${symbol}&fiat_currency=USD`,
      {
        headers: {
          'apikey': AppConfig.ORANGE_MARKETCAP_API_KEY,
        },
      }
    );
    const data = await response.json();
    const price = data?.[symbol];
    console.log('getFiateRate', price)
    return price;
  } catch (error) {
    console.error('Error fetching fiat value:', error);
    return 0;
  }
};

export function formatDueDate(isoString: string) {
  const date = new Date(isoString);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const time = `${hours}:${minutes}${ampm}`;

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); //
  const year = date.getFullYear();

  return `${time} • ${day}/${month}/${year}`;
}

export function getRawRuneAmount(amount: number, divisibility: number): string {
  const factor = Math.pow(10, divisibility);
  const rawAmount = amount * factor;

  // Optional: validate that rawAmount is an integer
  if (!Number.isInteger(rawAmount)) {
    throw new Error("Amount must be a valid number for given divisibility");
  }

  return rawAmount.toString();
}

export async function getTransactionSize(network: NetworkType | string, address: string, repayment: number) {
  const txUtxo = await getUTXOs(network, address);
  console.log('getTransactionSize', `txUtxo ${JSON.stringify(txUtxo)}`)
  const txSize = await estimateTxSizeFromUtxos(txUtxo, repayment)
  console.log('getTransactionSize', `txSize ${txSize}`)
  return txSize
}


function serializeWitness(witness: Buffer[]): Buffer {
  const bufferArray = [];
  bufferArray.push(Buffer.from([witness.length]));
  for (const item of witness) {
    bufferArray.push(Buffer.from([item.length]));
    bufferArray.push(item);
  }
  return Buffer.concat(bufferArray);
}

async function estimateTxSizeFromUtxos(utxos: any, repayment:any) {
  const network = bitcoin.networks.bitcoin;
  const dummyAddress = '3MwySGKUN4QFomvgiJcbKPG68EA4QyuhkA'; // P2WPKH mainnet

  const psbt = new bitcoin.Psbt({ network });
  const script = bitcoin.address.toOutputScript(dummyAddress, network);

  utxos.forEach((utxo) => {
    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: {
        script,
        value: utxo.value,
      },
    });
  });

  const totalValue = utxos.reduce((acc, u) => acc + u.value, 0);

  console.log('estimateTxSizeFromUtxos',`repayment ${repayment}`)
  psbt.addOutput({
    address: dummyAddress,
    value: totalValue , // some fee estimation
  });

  utxos.forEach((_, i) => {
    psbt.finalizeInput(i, () => {
      const dummySignature = Buffer.alloc(72, 0x00);
      const dummyPubkey = Buffer.alloc(33, 0x02);
      return {
        finalScriptWitness: serializeWitness([dummySignature, dummyPubkey]),
      };
    });
  });

  const tx = psbt.extractTransaction();
  const vSize = tx.virtualSize();

  return vSize;
}


import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import ecc, * as secp256k1 from "@bitcoinerlab/secp256k1";
import { ECPairFactory } from 'ecpair';
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";

const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

export async function signPsbtWithMnemonic(base64Psbt: string,txnContext: any) {
  let parsedPsbt: btcTransaction.EnhancedPsbt;
      try {
        parsedPsbt = new btcTransaction.EnhancedPsbt(txnContext, base64Psbt);
      } catch (err) {
        console.error('[useSubmitLoan] Failed to parse PSBT', err);
        throw new Error('Invalid PSBT');
      }

      const signedPsbt = await parsedPsbt.getSignedPsbtBase64({
        finalize: false,
      });
  return signedPsbt;
}
