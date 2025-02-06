import {
    newWallet, walletFromSeedPhrase
} from '@orangecryptohq/orangeseed/dist';
import Toast from "react-native-toast-message";
import { setConfirmPasswordError } from "./SeedPhraseReducer";


export const validateCurrentStep = (currentStepIndex, isSeedPhraseVerified, password, confirmPassword, dispatch, strings, validatePassword) => {

    if (currentStepIndex === 1 && !isSeedPhraseVerified) {
        Toast.show({ type: 'warning', text1: strings.seedPhrasenotMatched });
        return false;
    }
    if ((currentStepIndex === 2 || currentStepIndex === 3) && !validatePassword(password, currentStepIndex)) {
        return false;
    }
    if (currentStepIndex === 3 && password !== confirmPassword) {
        dispatch(setConfirmPasswordError(strings.passwordNotMatch));
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

        console.log('Account:', account);
        console.log('Wallet:', wallet);

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
