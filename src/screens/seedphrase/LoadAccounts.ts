import ecc from '@bitcoinerlab/secp256k1';
import { Account, SettingsNetwork, StacksNetwork, WalletConfig, bip39, connectToGaiaHubWithConfig, deriveWalletConfigKey, getBnsName, getHubInfo, getWalletFromRootNode, makeWalletConfig } from "@orangecryptohq/orangeseed";
import { GAIA_HUB_URL } from "@orangecryptohq/orangeseed/dist/constant";
import { encryptContent } from '@screens/address/StackEncryption';
import { getPublicKeyFromPrivate } from '@stacks/encryption';
import { FetchFn, createFetchFn } from '@stacks/network';
import { GaiaHubConfig, uploadToGaiaHub } from '@stacks/storage';
import BIP32Factory, { BIP32Interface } from 'bip32';
import crypto from 'crypto';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export const loadAccount = async (
    stxAddress: string,
    selectedNetwork: any,
    account: any,
    seed: string,
    network: any
) => {
    try {
        console.log(`stxAddress: ${stxAddress}`);
        console.log('selectedNetwork:', selectedNetwork);
        console.log('account:', account);

        const accounts = await loadActiveAccounts(seed, network, selectedNetwork, [
            {
                ...account,
            },
        ]);

        return accounts;
    } catch (err) {
        console.error('Error loading account:', err);
        throw err; // rethrow if you want to handle it higher up
    }
};

export const loadActiveAccounts = async (
    secretKey: string,
    currentNetwork: SettingsNetwork,
    currentNetworkObject: StacksNetwork,
    currentAccounts: Account[],
) => {
    const walletAccounts = await restoreWalletWithAccounts(
        secretKey,
        currentNetwork,
        currentNetworkObject,
        currentAccounts
    );
   return walletAccounts
};

const getActiveAccountsFromRootNode = async (networkObject, currentAccounts, rootNode) => {
    const networkFetch = networkObject.fetchFn;
    const hubInfo = await getHubInfo(GAIA_HUB_URL, networkFetch);
    const walletConfigKey = await deriveWalletConfigKey(rootNode);
    const currentGaiaConfig = connectToGaiaHubWithConfig({
        hubInfo,
        privateKey: walletConfigKey,
        gaiaHubUrl: GAIA_HUB_URL,
    });
    return getOrCreateWalletConfig({
        walletAccounts: currentAccounts,
        configPrivateKey: walletConfigKey,
        gaiaHubConfig: currentGaiaConfig,
        fetchFn: networkFetch,
    });
};

const restoreWalletWithAccounts = async (mnemonic, selectedNetwork, networkObject, currentAccounts) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const bip32 = await BIP32Factory(ecc);
    const rootNodee: BIP32Interface = bip32.fromSeed(Buffer.from(seed));
    const masterr = bip32.fromSeed(seed);
    const walletConfig = await getActiveAccountsFromRootNode(
        networkObject,
        currentAccounts,
        rootNodee,
    );
    if (walletConfig && walletConfig.accounts.length > 0) {
        const newAccounts = await Promise.all(walletConfig.accounts.map(async (_, index) => {
            let existingAccount = currentAccounts[index];
            if (!existingAccount || !existingAccount.ordinalsAddress || !existingAccount.ordinalsPublicKey) {
                // Ensure seed is a Buffer
                const master = convertToBufferBIP32(masterr)
                const masterPubKey = master.publicKey.toString('hex');
                const rootNode = convertToBufferBIP32(rootNodee)
                let response;
                try {
                    response = await getWalletFromRootNode({
                        index: BigInt(index),
                        network: selectedNetwork.type,
                        rootNode,
                        master,
                    });
                } catch (error) {
                    return null;  // Handle error by returning null or an error object
                }
                const username = await getBnsName(response.stxAddress, networkObject);
                existingAccount = {
                    id: index,
                    stxAddress: response.stxAddress,
                    btcAddress: response.btcAddress,
                    ordinalsAddress: response.ordinalsAddress,
                    masterPubKey,
                    stxPublicKey: response.stxPublicKey,
                    btcPublicKey: response.btcPublicKey,
                    ordinalsPublicKey: response.ordinalsPublicKey,
                    bnsName: username,
                    accountType: 'software',
                };
                return existingAccount;
            } else {
                const userName = await getBnsName(existingAccount.stxAddress, networkObject);
                return {
                    ...existingAccount,
                    bnsName: userName,
                };
            }
        }));
        const validAccounts = newAccounts.filter(account => account !== null);
        return validAccounts;
    }
    return currentAccounts;
}

const getOrCreateWalletConfig = async ({
    configPrivateKey,
    walletAccounts,
    gaiaHubConfig,
    skipUpload,
    fetchFn = createFetchFn(),
}: {
    configPrivateKey: string;
    walletAccounts: Account[];
    gaiaHubConfig: GaiaHubConfig;
    skipUpload?: boolean;
    fetchFn?: FetchFn;
}): Promise<WalletConfig> => {
    try {
        const config = await fetchWalletConfig({ configPrivateKey, gaiaHubConfig, fetchFn });
        if (config) return config;
    } catch (error) {
        console.error("Error fetching wallet config:", error);
    }
    try {
        const newConfig = makeWalletConfig(walletAccounts);
        console.log('newConfig', JSON.stringify(newConfig))
        if (!skipUpload) {
            try {
                await updateWalletConfig({ configPrivateKey, walletAccounts, gaiaHubConfig });
            } catch (error) {
                console.error("Error updating wallet config:", error);
            }
        }
        return newConfig;
    } catch (error) {
        console.error("Error creating wallet config:", error);
        throw error; // Re-throw to allow handling at a higher level if needed
    }
};

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
    const publicKey = getPublicKeyFromPrivate(configPrivateKey);
    const encrypted = await encryptContent(JSON.stringify(walletConfig), { publicKey });
    console.log('encrypted', encrypted)
    await uploadToGaiaHub('wallet-config.json', encrypted, gaiaHubConfig, undefined, undefined, undefined, true);
    return walletConfig;
};

export const fetchWalletConfig = async ({
    configPrivateKey,
    gaiaHubConfig,
    fetchFn = createFetchFn(),
}: {
    configPrivateKey: string;
    gaiaHubConfig: GaiaHubConfig;
    fetchFn?: FetchFn;
}) => {
    try {
        const response = await fetchFn(`${gaiaHubConfig.url_prefix}${gaiaHubConfig.address}/wallet-config.json`);
        if (!response.ok) return null;
        const encryptedString = await response.text();
        const decrypted = await decryptECIES(JSON.parse(encryptedString), configPrivateKey);
        const configJSON = decrypted as string
        const config: WalletConfig = JSON.parse(configJSON);
        return config;
    } catch (error) {
        console.error('fetchWalletConfig', error)
        return null;
    }
};

function deriveKeys(sharedSecret: Buffer) {
    const hash = crypto.createHash('sha512').update(sharedSecret).digest();
    return {
        encryptionKey: hash.slice(0, 32), // AES-256
        macKey: hash.slice(32),          // HMAC-SHA256
    };
}

function decryptECIES(payload: any, privateKeyHex: string) {
    console.log('decryptECIES', 'call :' + payload)


    try {
        const ephemeralPK = ec.keyFromPublic(payload.ephemeralPK, 'hex').getPublic();
        console.log('decryptECIES', 'call ephemeralPK:' + ephemeralPK)
        console.log('decryptECIES', 'ephemeralPK :' + ephemeralPK)
        const privateKey = ec.keyFromPrivate(privateKeyHex, 'hex');
        console.log('decryptECIES', 'privateKey :' + ephemeralPK)

        // Step 1: Derive shared secret using ECDH
        const sharedSecret = Buffer.from(privateKey.derive(ephemeralPK).toArray());
        console.log('decryptECIES', 'sharedSecret :' + sharedSecret)
        // Step 2: Derive encryption + MAC keys
        const { encryptionKey, macKey } = deriveKeys(sharedSecret);
        console.log('decryptECIES', 'encryptionKey :' + sharedSecret)
        const iv = Buffer.from(payload.iv, 'hex');
        const cipherText = Buffer.from(payload.cipherText, 'hex');
        const mac = Buffer.from(payload.mac, 'hex');

        // Step 3: Verify HMAC
        const dataToMac = Buffer.concat([iv, Buffer.from(payload.ephemeralPK, 'hex'), cipherText]);
        const hmac = crypto.createHmac('sha256', macKey).update(dataToMac).digest();
        console.log('decryptECIES', 'dataToMac :' + dataToMac)
        if (!hmac.equals(mac)) {
            throw new Error('MAC mismatch! Data has been tampered with or wrong key.');
        }
        // Step 4: AES-256-CBC decryption
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
        console.log('decryptECIES', 'decipher :' + JSON.stringify(decipher))
        let decrypted = decipher.update(cipherText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return payload.wasString ? decrypted.toString('utf8') : decrypted;

    } catch (error) {
        console.log('decryptECIES', 'ephemeralPK :' + error)

    }
}

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
