import ecc from '@bitcoinerlab/secp256k1';
import { Account, bip39, createWalletGaiaConfig, deriveWalletConfigKey, getBnsName, makeWalletConfig, WalletConfig, walletFromSeedPhrase } from "@orangecryptohq/orangeseed";
import { GAIA_HUB_URL } from "@orangecryptohq/orangeseed/dist/constant";
import { getPublicKeyFromPrivate } from "@stacks/encryption";
import { GaiaHubConfig, uploadToGaiaHub } from '@stacks/storage';
import BIP32Factory, { BIP32Interface } from 'bip32';
import { encryptContent } from "./StackEncryption";


export async function createWalletAccount(seedPhrase, selectedNetwork, networkObject, walletAccounts) {
  const accountIndex = walletAccounts.length;
  const { stxAddress, btcAddress, ordinalsAddress, masterPubKey, stxPublicKey, btcPublicKey, ordinalsPublicKey } = await walletFromSeedPhrase({
    mnemonic: seedPhrase,
    index: BigInt(accountIndex),
    network: selectedNetwork.type,
  });
  const bnsName = await getBnsName(stxAddress, networkObject);
  const newAccount = {
    id: accountIndex,
    stxAddress,
    btcAddress,
    ordinalsAddress,
    masterPubKey,
    stxPublicKey,
    btcPublicKey,
    ordinalsPublicKey,
    bnsName,
    accountType: 'software',
  };
  const updateAccountsList = [...walletAccounts, newAccount];
  const seed = await bip39.mnemonicToSeed(seedPhrase);
  const bip32 = await BIP32Factory(ecc);
  const rootNodee: BIP32Interface = bip32.fromSeed(Buffer.from(seed));
  const walletConfigKey = await deriveWalletConfigKey(convertToBufferBIP32(rootNodee));
  const gaiaHubConfig = await createWalletGaiaConfig({
    gaiaHubUrl: GAIA_HUB_URL,
    configPrivateKey: walletConfigKey,
  });
  try {

    await updateWalletConfig({
      walletAccounts: updateAccountsList,
      gaiaHubConfig,
      configPrivateKey: walletConfigKey,
    });
    console.log('updateWalletConfig', updateAccountsList)
    return updateAccountsList;
  }
  catch (err) {
    console.error('updateWalletConfig', err)
    return updateAccountsList;
  }
}


export const updateWalletConfig = async ({
  walletAccounts,
  configPrivateKey,
  walletConfig: _walletConfig,
  gaiaHubConfig,
}: {
  walletAccounts: Account[];
  configPrivateKey: string;
  walletConfig?: WalletConfig;
  gaiaHubConfig: GaiaHubConfig;
}) => {
  const walletConfig = _walletConfig || makeWalletConfig(walletAccounts);
  const encrypted = await encryptWalletConfig({ configPrivateKey, walletConfig: walletConfig });
  try {
    await uploadToGaiaHub('wallet-config.json', encrypted, gaiaHubConfig, undefined, undefined, undefined, true);
  } catch (error) {
    console.log('updateWalletConfig', `uploadToGaiaHub ${error}`)
  }
  return walletConfig;
};

export const encryptWalletConfig = async ({
  configPrivateKey,
  walletConfig,
}: {
  configPrivateKey: string;
  walletConfig: WalletConfig;
}) => {

  try {
    const publicKey = getPublicKeyFromPrivate(configPrivateKey);
    const encrypted = await encryptContent(JSON.stringify(walletConfig), { publicKey });
    console.log("Encrypted Data:", encrypted);
    return encrypted;
  } catch (error) {
    console.error("Error encrypting wallet config:", error);
    throw error;
  }
};

function convertToBufferBIP32(raw: BIP32Interface): any {
  return {
    chainCode: Buffer.from(raw.chainCode),
    network: raw.network,
    depth: raw.depth,
    index: raw.index,
    parentFingerprint: raw.parentFingerprint,
    privateKey: raw.privateKey ? Buffer.from(raw.privateKey) : undefined,
    identifier: Buffer.from(raw.identifier),
    fingerprint: Buffer.from(raw.fingerprint),
    publicKey: Buffer.from(raw.publicKey),
    lowR: raw.lowR,
    sign: raw.sign,
    verify: raw.verify,
    signSchnorr: raw.signSchnorr,
    verifySchnorr: raw.verifySchnorr,
    isNeutered: raw.isNeutered,
    neutered: () => convertToBufferBIP32(raw.neutered()),
    toBase58: raw.toBase58,
    toWIF: raw.toWIF,
    derive: (index: number) => convertToBufferBIP32(raw.derive(index)),
    deriveHardened: (index: number) => convertToBufferBIP32(raw.deriveHardened(index)),
    derivePath: (path: string) => convertToBufferBIP32(raw.derivePath(path)),
    tweak: raw.tweak,
  };
}