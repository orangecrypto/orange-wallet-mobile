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
import { useEffect, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { clearSeedPhraseReducer, seedPhraseReducerType, setConfirmPasswordError, setPasswordError } from "./SeedPhraseReducer";

const SeedPhrase = ({ route }) => {
    const steps = [
        { id: 1, component: SeedPhraseView },
        { id: 2, component: SeedPhraseVerification },
        { id: 3, component: EnterPassword },
        { id: 4, component: ConfirmPassword },
    ];
    
    const { password, confirmPassword } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer);
    const [currentStepIndex, setCurrentStepIndex] = useState(route?.params?.backupLatter ? 2 : 0); 
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const dispatch: Dispatch = useAppDispatch();
    
    const validatePassword = (password, step) => {
        const { strengthMessage } = validatePasswordStrength(password);
        if ([strings.weakPassword, strings.moderatePassword].includes(strengthMessage)) {
            const errorAction = step === 2 ? setPasswordError : setConfirmPasswordError; 
            dispatch(errorAction(strings.useStrongPassword));
            return false;
        }
        return true;
    };
    
    const handleNextStep = () => {
        if (currentStepIndex === 2 && !validatePassword(password, currentStepIndex)) return; 
        if (currentStepIndex === 3) { 
            if (!validatePassword(confirmPassword, currentStepIndex)) return;
            if (password === confirmPassword) {
                push(RouteType.SUCCESS);
                dispatch(clearSeedPhraseReducer());
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
            style={styles.container}>
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
                        height={Responsive.size50}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
        padding: Responsive.size18,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    stepContainer: {
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: Color.backbackgroundbg,
        width: "100%",
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size12,
        borderRadius: Responsive.size10,
        justifyContent: "space-between",
        marginVertical: Responsive.size18
    },
    stepText: {
        fontSize: Responsive.size16,
        color: Color.white,
    },
    progressBarContainer: {
        height: Responsive.size8,
        width: "20%",
        backgroundColor: Color.black,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
    },
    progressBar: {
        height: "100%",
        backgroundColor: Color.orangeButton,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        marginTop: Responsive.size20,
    },
    button: {
        paddingVertical: Responsive.size5,
        paddingHorizontal: Responsive.size10,
        backgroundColor: Color.orangeButton,
        borderRadius: Responsive.size5,
        marginBottom: Responsive.size10,
    },
    buttonText: {
        color: Color.white,
        fontSize: Responsive.size16,
    },
    disabledButton: {
        backgroundColor: Color.grey,
    },
    buttonContainerConitnue: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: Responsive.size20,
    },
});

export default SeedPhrase;
