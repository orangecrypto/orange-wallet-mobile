import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import BIP32Factory from 'bip32';
import ecc from '@bitcoinerlab/secp256k1';
import ECPairFactory from 'ecpair';
import * as bitcoinMessage from 'bitcoinjs-message';
import { Buffer } from 'buffer';
import { initEccLib } from 'bitcoinjs-lib';
initEccLib(ecc);
const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);
export async function signBitcoinMessage(message: string, mnemonic: string) {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = bip32.fromSeed(seed);

  const messageLines = message.split('\n');
  const addressLine = messageLines.find(line => line.startsWith('address:'));
  const expectedAddress = addressLine?.split('address:')[1].trim();

  if (!expectedAddress) throw new Error('Address not found in message');

  const network = bitcoin.networks.bitcoin;

  const derivationPaths = [
    "m/44'/0'/0'/0/0",  // P2PKH
    "m/49'/0'/0'/0/0",  // P2SH-P2WPKH
    "m/84'/0'/0'/0/0",  // Native SegWit
    "m/86'/0'/0'/0/0",  // Taproot (P2TR)
  ];

  let matchedKeyPair: ReturnType<typeof ECPair.fromWIF> | null = null;

  for (const path of derivationPaths) {
    const child = root.derivePath(path);

    let derivedAddress: string | undefined;
    if (path.startsWith("m/44'")) {
      derivedAddress = bitcoin.payments.p2pkh({ pubkey: Buffer.from(child.publicKey), network }).address;
    } else if (path.startsWith("m/49'")) {
      derivedAddress = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: Buffer.from(child.publicKey), network }),
        network,
      }).address;
    } else if (path.startsWith("m/84'")) {
      derivedAddress = bitcoin.payments.p2wpkh({ pubkey: Buffer.from(child.publicKey), network }).address;
    } else if (path.startsWith("m/86'")) {
      derivedAddress = bitcoin.payments.p2tr({ internalPubkey: Buffer.from(child.publicKey).slice(1, 33), network }).address;
    }

    if (derivedAddress === expectedAddress) {
      matchedKeyPair = ECPair.fromPrivateKey(child.privateKey!, { compressed: true });
      break;
    }
  }

  if (!matchedKeyPair) {
    throw new Error(`Address mismatch: unable to derive matching address for ${expectedAddress}`);
  }

  const signature = bitcoinMessage.sign(
    message,
    Buffer.from(matchedKeyPair.privateKey!),
    matchedKeyPair.compressed
  );

  return signature.toString('base64');
}
