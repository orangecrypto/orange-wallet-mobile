import CommonButton from "@components/CommonButton";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, push } from "@routes/Navigator";
import { SUCCESS } from "@routes/RouteType";
import ConfirmPassword from "@screens/seedphrase/ConfirmPassword";
import EnterPassword from "@screens/seedphrase/EnterPassword";
import SeedPhraseVerification from "@screens/seedphrase/SeedPhraseVerification";
import SeedPhraseView from "@screens/seedphrase/SeedPhraseView";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { validatePasswordStrength } from "@utils/Validations";
import { backgroundbg, black, grey, orangeBorder, orangeButton, seedPhraseItemBorder, stepIndigatorBackground, white } from "@values/color";
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
    const { password, confirmPassword } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer);
    const [currentStep, setCurrentStep] = useState(route?.params?.backupLatter ? 3 : 1);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const totalSteps = 4;
    const dispatch: Dispatch = useAppDispatch();

    const handleSubmit = (password) => {
        const { strengthMessage } = validatePasswordStrength(password);
        if (strengthMessage === strings.weakPassword || strengthMessage === strings.moderatePassword) {
            if (currentStep === 3) {
                dispatch(setPasswordError(strings.useStrongPassword));
            }
            if (currentStep === 4) {
                dispatch(setConfirmPasswordError(strings.useStrongPassword));
            }
            return false;
        } else {
            return true;
        }
    };

    const handleNextStep = () => {
        if (currentStep < totalSteps) {
            if (currentStep === 3) {
                if (handleSubmit(password)) {
                    setCurrentStep(currentStep + 1);
                }
            } else {
                setCurrentStep(currentStep + 1);
            }
        }

        if (currentStep === 4) {
            if (handleSubmit(confirmPassword)) {
                if (password === confirmPassword) {
                    push(SUCCESS);
                    dispatch(clearSeedPhraseReducer());
                } else {
                    dispatch(setConfirmPasswordError(strings.passwordNotMatch));
                }
            }
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            goBack();
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

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
                            style={[styles.button, currentStep === 1 && styles.disabledButton]}
                            onPress={handlePreviousStep}>
                            <Text style={styles.buttonText}>{strings.back}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>Step {currentStep}</Text>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: `${(currentStep / totalSteps) * 100}%` }]} />
                        </View>
                    </View>
                    {currentStep === 1 ? (
                        <SeedPhraseView />
                    ) : currentStep === 2 ? (
                        <SeedPhraseVerification />
                    ) : currentStep === 3 ? (

                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1, paddingBottom: isKeyboardVisible ? Responsive.size50 : Responsive.size20 }}
                            keyboardShouldPersistTaps="handled">
                            <EnterPassword />
                        </ScrollView>

                    ) : currentStep === 4 ? (
                        <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: isKeyboardVisible ? Responsive.size50 : Responsive.size20 }}
                        keyboardShouldPersistTaps="handled">
                        <ConfirmPassword />
                        </ScrollView>
                    ) : null}
                </View>
            </ScrollView>
            {!isKeyboardVisible && (
                <View style={styles.buttonContainerConitnue}>
                    <CommonButton
                        title={strings.continue}
                        onPress={handleNextStep}
                        backgroundColor={orangeButton}
                        textColor={white}
                        borderColor={orangeBorder}
                        width={"100%"}
                        height={Responsive.size45}
                    />
                </View>
            )}
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        padding: Responsive.size18,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    stepContainer: {
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: backgroundbg,
        width: "100%",
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size12,
        borderRadius: Responsive.size10,
        justifyContent: "space-between",
        marginVertical: Responsive.size18
    },
    stepText: {
        fontSize: Responsive.size16,
        color: white,
    },
    progressBarContainer: {
        height: Responsive.size8,
        width: "20%",
        backgroundColor: black,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
    },
    progressBar: {
        height: "100%",
        backgroundColor: orangeButton,
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
        backgroundColor: orangeButton,
        borderRadius: Responsive.size5,
        marginBottom: Responsive.size10,
    },
    buttonText: {
        color: white,
        fontSize: Responsive.size16,
    },
    disabledButton: {
        backgroundColor: grey,
    },
    buttonContainerConitnue: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: Responsive.size20,
    },
});

export default SeedPhrase;
