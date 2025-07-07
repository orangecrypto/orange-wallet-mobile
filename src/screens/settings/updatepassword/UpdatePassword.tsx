import CommonButton from "@components/CommonButton";
import useSeedVault from "@hooks/useSeedVault";
import { str2buf } from "@orangecryptohq/orangeseed";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "../styles";
import EnterPassword from "./EnterPassword";

const UpdatePassword = () => {

    const { unlockVault, changePassword } = useSeedVault()
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const handlePasswordChange = async () => {
        try {
            await changePassword(str2buf(oldPassword), str2buf(confirmPassword))
            Toast.show({ type: 'success', text1: strings.passwordUpdated });
            goBack()

        } catch (error) {
            console.log("error : ", error.message)
            Toast.show({ type: 'error', text1: error.message });
        }
    }

    const validateInputs = async () => {
        if (currentStepIndex === 0) {
            await unlockVault(str2buf(oldPassword));
            return true;
        }
        if (currentStepIndex === 2 && newPassword !== confirmPassword) {
            Toast.show({ type: "error", text1: strings.passwordNotMatch });
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        setErrorMessage("")
        try {
            if (!(await validateInputs())) return;
            setCurrentStepIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : prevIndex));
            currentStepIndex === 2 && handlePasswordChange();
        } catch (error) {
            console.log("Error:", error.message);
            Toast.show({ type: "error", text1: error.message });
        }
    };

    const handleBack = () => {
        setErrorMessage("")
        setCurrentStepIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : (goBack(), prevIndex)));
    }

    const steps = useMemo(() => [
        { id: 1, component: () => <EnterPassword type="oldPassword" onPasswordChange={setOldPassword} handleError={setErrorMessage} /> },
        { id: 2, component: () => <EnterPassword type="newPassword" onPasswordChange={setNewPassword} handleError={setErrorMessage} /> },
        { id: 3, component: () => <EnterPassword type="confirmPassword" onPasswordChange={setConfirmPassword} handleError={setErrorMessage} /> },
    ], []);

    useEffect(() => {
        const handleKeyboardShow = () => setIsKeyboardVisible(true);
        const handleKeyboardHide = () => setIsKeyboardVisible(false);
        const showSubscription = Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
        const hideSubscription = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    const CurrentStepComponent = steps[currentStepIndex]?.component;

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <ScrollView
           contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: isKeyboardVisible ? Responsive.size50 : 0,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                {CurrentStepComponent && <CurrentStepComponent />}
            </View>

            </ScrollView>
            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <CommonButton
                        title={strings.continue}
                        onPress={() => handleSubmit()}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        disabled={errorMessage != strings.strongPassword}
                        width={'100%'}
                        height={Responsive.size50}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
};
export default UpdatePassword;