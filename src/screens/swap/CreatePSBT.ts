// import ecc, * as secp256k1 from "@bitcoinerlab/secp256k1";
// import { bip39, NetworkType, UTXO } from "@orangecryptohq/orangeseed";
// import BIP32Factory from "bip32";
// import * as bitcoin from "bitcoinjs-lib";
// import { Buffer } from 'buffer';
// import ECPairFactory from 'ecpair';
// bitcoin.initEccLib(ecc);
// const ECPair = ECPairFactory(secp256k1);

// function generateSwapPsbt( utxos: any[], keyPair: any) {
//   const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin });
//   const payment = bitcoin.payments.p2sh({
//     redeem: bitcoin.payments.p2wpkh({ pubkey: Buffer.from(keyPair.publicKey) }),
//   });

//   utxos.forEach((utxo) => {
//     psbt.addInput({
//       hash: utxo.txid,
//       index: utxo.vout,
//       witnessUtxo: {
//         script: payment.output!, 
//         value: utxo.value,
//       },
//       redeemScript: payment.redeem!.output, 
//     });
//   });

//   psbt.addOutput({
//     script: bitcoin.script.compile([bitcoin.opcodes.OP_RETURN, Buffer.from('swap')]),
//     value: 0,
//   });

//   return psbt.toBase64();
// }



// export async function signSwapWithPsbt(address: any, accounts: [], network: NetworkType, seedPhrase: string) {

//   console.log('signSwapWithPsbt', `call`)
//   const utxo = await getUTXOs(network, address)
//   console.log('signSwapWithPsbt', `utxo ${JSON.stringify(utxo)}`)

//   const seed = await bip39.mnemonicToSeed(seedPhrase);
//   const bip32 = await BIP32Factory(ecc);
//   const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
//   const path = "m/49'/0'/0'/0/0";
//   const child = root.derivePath(path);
//   const wif = child.toWIF();
//   console.log('WIF Private Key:', wif);
//   const keyPair = ECPair.fromWIF(wif);

//   const psbt = generateSwapPsbt(utxo, keyPair);

//   const psbtt = bitcoin.Psbt.fromBase64(psbt)
//   const signer = {
//     publicKey: Buffer.from(keyPair.publicKey),
//     sign: (hash: Buffer, lowR?: boolean) => Buffer.from(keyPair.sign(hash, lowR)), // signing function
//   };
//   console.log('keyPair :', JSON.stringify(keyPair));
//   console.log('psbtt output:',psbtt.txOutputs); 
//   console.log('psbtt input:',psbtt.txInputs); 
//   psbtt.signAllInputs(signer)
//   psbtt.finalizeAllInputs();
//   const transaction = psbtt.extractTransaction();
//   const txHex = transaction.toHex();


//   console.log('psbtt txHex:',transaction); 
  
// }

// export const getUTXOs = async (
//   network: NetworkType | string,
//   address: string
// ): Promise<UTXO[]> => {
//   const networkSubpath = network?.toLowerCase() === 'Testnet' ? '/testnet' : '';
//   const url = `https://mempool.space${networkSubpath}/api/address/${address}/utxo`;
//   const response = await fetch(url);
//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(`Failed to fetch UTXOs for address: ${address} (status: ${response.status}) - ${text}`);
//   }
//   const responseData = await response.json();
//   return responseData;
// };


import * as secp from '@noble/secp256k1';
import ecc, * as secp256k1 from "@bitcoinerlab/secp256k1";
import { bip39, NetworkType, UTXO } from "@orangecryptohq/orangeseed";
import BIP32Factory from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import { Buffer } from 'buffer';
import ECPairFactory from 'ecpair';
import * as btc from '@scure/btc-signer';
    import { hex, base64 } from '@scure/base';
bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(secp256k1);
const getBitcoinNetwork = (network: NetworkType | string) =>
  network?.toLowerCase() === 'testnet'
    ? bitcoin.networks.testnet
    : bitcoin.networks.bitcoin;

    function generateSwapPsbt(utxos: UTXO[], keyPair: any, network: bitcoin.networks.Network) {
      const psbt = new bitcoin.Psbt({ network });
    
      // Generate a P2WPKH payment from the keyPair
      const payment = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(keyPair.publicKey),
        network,
      });
    
      console.log('generateSwapPsbt', `payment ${JSON.stringify(payment)}`);
    
      // Add UTXOs as inputs
      utxos.forEach((utxo) => {
        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          witnessUtxo: {
            script: payment.output!,  // P2WPKH output script
            value: utxo.value,
          },
        });
      });
    
      // Send funds to the same P2WPKH address or any valid P2WPKH address
      psbt.addOutput({
        address: payment.address!,  // Use the correct address for this keyPair
        value: 1000,
      });
    
      return psbt.toBase64();
    }
    
    
export async function signSwapWithPsbt(
  address: string,
  accounts: [],
  network: NetworkType,
  seedPhrase: string
) {
  console.log('signSwapWithPsbt', 'call');

  const utxo = await getUTXOs(network, address);
  console.log('signSwapWithPsbt', `utxo ${JSON.stringify(utxo)}`);

  const seed = await bip39.mnemonicToSeed(seedPhrase);
  const bip32 = BIP32Factory(ecc);
  const bitcoinNetwork = getBitcoinNetwork(network);

  const root = bip32.fromSeed(seed, bitcoinNetwork);
  const path = "m/49'/1'/0'/0/0"; // Use m/49'/0'/0'/0/0 for mainnet if needed
  const child = root.derivePath(path);
  const wif = child.toWIF();
  const keyPair = ECPair.fromWIF(wif, bitcoinNetwork);

  // Generate the PSBT
  const psbtBase64 = generateSwapPsbt(utxo, keyPair, bitcoinNetwork);

  console.log('psbtBase64', psbtBase64)

    const psbt = bitcoin.Psbt.fromBase64(psbtBase64, { network: bitcoinNetwork });

  // // // Set up the signer object
  const signer = {
    publicKey: Buffer.from(keyPair.publicKey),
    sign: (hash: Buffer, lowR?: boolean) => Buffer.from(keyPair.sign(hash, lowR)),
    getPublicKey: () => Buffer.from(keyPair.publicKey),
  };

    psbt.signAllInputs(signer);
   psbt.finalizeAllInputs();
   const transaction = psbt.extractTransaction();
   const txHex = transaction.toHex();
   console.log('Final signed txHex:', txHex);
  // return txHex;
}

export const getUTXOs = async (
  network: NetworkType | string,
  address: string
): Promise<UTXO[]> => {
  const isTestnet = network?.toLowerCase() === 'testnet';
  const networkSubpath = isTestnet ? '/testnet' : '';
  const url = `https://mempool.space${networkSubpath}/api/address/${address}/utxo`;
  console.log('getUTXOs', url);

  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch UTXOs for address: ${address} (status: ${response.status}) - ${text}`);
  }
  
  const responseData = await response.json();
  return responseData;
};
async function fetchScriptPubKey(txid: string, vout: number): Promise<string> {
  const res = await fetch(`https://mempool.space/testnet/api/tx/${txid}`);
  const data = await res.json();
  return data.vout[vout].scriptpubkey;
}