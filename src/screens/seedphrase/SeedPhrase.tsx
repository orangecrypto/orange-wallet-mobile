import CommonButton from "@components/CommonButton";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import ConfirmPassword from "@screens/seedphrase/ConfirmPassword";
import EnterPassword from "@screens/seedphrase/EnterPassword";
import SeedPhraseVerification from "@screens/seedphrase/SeedPhraseVerification";
import SeedPhraseView from "@screens/seedphrase/SeedPhraseView";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { validatePasswordStrength } from "@utils/Validations";
import { Color } from "@values/color";
import { decryptSeedPhrase } from "@orangecryptohq/orangeseed";
import 'fast-text-encoding';
import { useEffect, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { setIsWalletCreated } from "../../redux/slice/appReducer";
import { useAppDispatch } from "../../redux/store";

import { clearSeedPhraseReducer, seedPhraseReducerType, setConfirmPasswordError, setPasswordError } from "./SeedPhraseReducer";
import { styles } from './styles';
import seedVault from "../../services/seedVault/seedVault";

const SeedPhrase = ({ route }) => {
    const steps = [
        { id: 1, component: SeedPhraseView },
        { id: 2, component: SeedPhraseVerification },
        { id: 3, component: EnterPassword },
        { id: 4, component: ConfirmPassword },
    ];

    const { password, confirmPassword, words, isSeedPhraseVerified, disabled } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer);
    const [currentStepIndex, setCurrentStepIndex] = useState(route?.params?.backupLatter ? 2 : 0);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const dispatch: Dispatch = useAppDispatch();

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
        if (currentStepIndex === 0 && words == '') {
            Toast.show({
                type: 'error',
                text1: strings.copySeedphrase,
            });
            return false
        };
        if (currentStepIndex === 1 && !isSeedPhraseVerified) {
            Toast.show({
                type: 'warning',
                text1: strings.seedPhrasenotMatched,
            });
            return false
        };
        if (currentStepIndex === 2 && !validatePassword(password, currentStepIndex)) return;
        if (currentStepIndex === 3) {
            if (!validatePassword(confirmPassword, currentStepIndex)) return;
            if (password === confirmPassword) {

                try {
                    const seedVaultService = seedVault.getInstance();
                    const passwordBytes = new TextEncoder().encode(confirmPassword);
                    await seedVaultService.init(passwordBytes);
                    await seedVaultService.storeSeed(words);
                    //await decryptSeedPhrase(words, confirmPassword)
                    push(RouteType.WALLETBALANCE);
                    dispatch(clearSeedPhraseReducer());
                    dispatch(setIsWalletCreated(true))
                    console.log("Seed successfully stored!");

                } catch (error) {
                    console.error("Error initializing SeedVault:", error.message);
                    Toast.show({
                        type: 'error',
                        text1: error.message,
                    });
                }
            } else {
                dispatch(setConfirmPasswordError(strings.passwordNotMatch));
            }
            return;
        }

        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStepIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : goBack()));
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
                            style={[styles.button, currentStepIndex === 0 && styles.disabledButton]}
                            onPress={handlePreviousStep}>
                            <Text style={styles.buttonText}>{strings.back}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>Step {currentStepIndex + 1}</Text>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: `${((currentStepIndex + 1) / steps.length) * 100}%` }]} />
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
