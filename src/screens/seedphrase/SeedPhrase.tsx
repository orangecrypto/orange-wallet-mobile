import CommonButton from "@components/CommonButton";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, resetNavigation } from "@routes/Navigator";
import ConfirmPassword from "@screens/seedphrase/ConfirmPassword";
import EnterPassword from "@screens/seedphrase/EnterPassword";
import SeedPhraseVerification from "@screens/seedphrase/SeedPhraseVerification";
import SeedPhraseView from "@screens/seedphrase/SeedPhraseView";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { validatePasswordStrength } from "@utils/Validations";
import { Color } from "@values/color";
import 'fast-text-encoding';
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { clearSeedPhraseReducer, seedPhraseReducerType, setConfirmPasswordError, setIsRestoreWallet, setPasswordError } from "./SeedPhraseReducer";
import { styles } from './styles';
import { createWallet, restoreWallet, validateCurrentStep } from "./SeedPhraseUtils";
import { setAccount, setIsWalletCreated, setWallet } from "../../redux/slice/appReducer";
import { RouteType } from "@routes/RouteType";
import seedVault from "../../services/seedVault/seedVault";
import { str2buf } from "@orangecryptohq/orangeseed";
const SeedPhrase = ({ route }) => {
    const seeValutInstance = seedVault.getInstance()
    const { getSeed, changePassword, hasSeed, clearVaultStorage, storeSeed, init } = seeValutInstance
    const steps = [
        { id: 1, component: SeedPhraseView },
        { id: 2, component: SeedPhraseVerification },
        { id: 3, component: EnterPassword },
        { id: 4, component: ConfirmPassword },
    ];

    const { password, confirmPassword, isSeedPhraseVerified, disabled, isRestoreWallet } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer);
    const [currentStepIndex, setCurrentStepIndex] = useState(
        route?.params?.backupLatter ? 2 : route?.params?.restoreWallet ? 1 : 0
    );
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const dispatch: Dispatch = useAppDispatch();
    dispatch(setIsRestoreWallet(route?.params?.restoreWallet || false))
    const validatePassword = (password, step) => {
        const { strengthMessage } = validatePasswordStrength(password);
        if (password === '') {
            Toast.show({
                type: 'error',
                text1: strings.enterPassword,
            });
            return false;
        }
        else if ([strings.weakPassword, strings.moderatePassword].includes(strengthMessage)) {
            const errorAction = step === 2 ? setPasswordError : setConfirmPasswordError;
            dispatch(errorAction(strings.useStrongPassword));
            return false;
        }
        return true;
    };

    const handleNextStep = async () => {
        console.log('handleNextStep ', currentStepIndex)
        const words = await getSeed()
        if (!validateCurrentStep(currentStepIndex, isSeedPhraseVerified, password, confirmPassword, dispatch, strings, validatePassword)) {
            return;
        }

        if (currentStepIndex === 3 && isRestoreWallet) {
            console.log('Wallet Restore')
            const { account, wallet } = await restoreWallet(words)

            const hasseed = await hasSeed() ;
            if (hasseed) {
                await clearVaultStorage();
            }
            const encoder = new TextEncoder();
            
            await init(encoder.encode(confirmPassword));
            await storeSeed(words);
            dispatch(setAccount(account));
            dispatch(setWallet(wallet));
            dispatch(clearSeedPhraseReducer());
            dispatch(setIsWalletCreated(true));
            resetNavigation(RouteType.WALLETBALANCE);
            return
        }
        if (currentStepIndex === 3) {

            console.log("words", words);
            const { account, wallet } = await createWallet(words);
            const encoder = new TextEncoder();
            await changePassword(str2buf(''), encoder.encode(confirmPassword))
            dispatch(setAccount(account));
            dispatch(setWallet(wallet));
            dispatch(clearSeedPhraseReducer());
            dispatch(setIsWalletCreated(true));
            resetNavigation(RouteType.WALLETBALANCE);
            return;
        }
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousStep = () => {
        if (route?.params?.backupLatter && currentStepIndex === 2) {
            goBack();
        } else if (route?.params?.restoreWallet && currentStepIndex === 1) {
            goBack();
        } else {
            setCurrentStepIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : goBack()));
        }
    };

    useEffect(() => {


        const handleKeyboardVisibility = (isVisible) => setIsKeyboardVisible(isVisible);
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => handleKeyboardVisibility(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => handleKeyboardVisibility(false));
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const CurrentStepComponent = steps[currentStepIndex]?.component;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.seePhrasecontainer}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, currentStepIndex >= 0 && styles.disabledButton]}
                            onPress={handlePreviousStep}>
                            <Text style={styles.buttonText}>{strings.back}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>
                            Step {route?.params?.backupLatter
                                ? currentStepIndex - 1
                                : route?.params?.restoreWallet
                                    ? currentStepIndex
                                    : currentStepIndex + 1}
                        </Text>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, {
                                width: `${(route?.params?.backupLatter
                                    ? (currentStepIndex - 1) / 2
                                    : route?.params?.restoreWallet
                                        ? currentStepIndex / 3 // Adjusting progress for 3 steps in restoreWallet
                                        : (currentStepIndex + 1) / steps.length) * 100}%`
                            }]} />
                        </View>
                    </View>

                    {CurrentStepComponent && <CurrentStepComponent />}
                </View>
            </ScrollView>
            {!isKeyboardVisible && (
                <View style={styles.buttonContainerConitnue}>
                    <CommonButton
                        title={strings.continue}
                        onPress={handleNextStep}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        borderColor={Color.orangeBorder}
                        width={"100%"}
                        disabled={disabled}
                        height={Responsive.size50}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
};
export default SeedPhrase;
