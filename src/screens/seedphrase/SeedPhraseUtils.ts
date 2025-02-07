import { newWallet, walletFromSeedPhrase } from '@orangecryptohq/orangeseed/dist';
import { strings } from '@strings/i18n';
import Toast from "react-native-toast-message";

export const validateCurrentStep = (currentStepIndex, isSeedPhraseVerified, password, confirmPassword) => {
    if (currentStepIndex === 1 && !isSeedPhraseVerified) {
        Toast.show({ type: 'warning', text1: strings.seedPhrasenotMatched });
        return false;
    }   
    if (currentStepIndex === 3 && password !== confirmPassword) {
        Toast.show({ type: 'error', text1: strings.passwordNotMatch });
        return false;
    }
    return true;
};

export const createWallet = async (words) => {
    try {
        const wallet = words ? await walletFromSeedPhrase({ mnemonic: words, index: 0n, network: 'Mainnet' })
            : await newWallet();
        const account = {
            id: 0,
            btcAddress: wallet.btcAddress,
            btcPublicKey: wallet.btcPublicKey,
            masterPubKey: wallet.masterPubKey,
            ordinalsAddress: wallet.ordinalsAddress,
            ordinalsPublicKey: wallet.ordinalsPublicKey,
            stxAddress: wallet.stxAddress,
            stxPublicKey: wallet.stxPublicKey,
        };

        return { account, wallet };

    } catch (error) {
        Toast.show({ type: 'error', text1: error.message });
        console.log('createWallet', error.message)
    }
};

export const restoreWallet = async (seed: string) => {
    try {
        const wallet = await walletFromSeedPhrase({
            mnemonic: seed,
            index: 0n,
            network: 'Mainnet',
        });
        const account = {
            id: 0,
            btcAddress: wallet.btcAddress,
            btcPublicKey: wallet.btcPublicKey,
            masterPubKey: wallet.masterPubKey,
            ordinalsAddress: wallet.ordinalsAddress,
            ordinalsPublicKey: wallet.ordinalsPublicKey,
            stxAddress: wallet.stxAddress,
            stxPublicKey: wallet.stxPublicKey,
        };

        return { account, wallet };
    } catch (error) {
        Toast.show({ type: 'error', text1: error.message });
        console.log('createWallet', error.message)
    }
};