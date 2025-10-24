import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { setDisabled } from "@redux/slice/SeedPhraseReducer";
import { clearStoreData, useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { validatePasswordStrength } from "@utils/Validations";
import { useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { Color } from "@values/color";
import CommonButton from "@components/CommonButton";
import useSeedVault from "@hooks/useSeedVault";
import { str2buf } from "@orangecryptohq/orangeseed";
import Toast from "react-native-toast-message";
import { clearAppReducer } from "@redux/slice/appReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerifyPassword = () => {

    const { unlockVault, clearVaultStorage } = useSeedVault()
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const dispatch: Dispatch = useAppDispatch()

    const handlePasswordChange = (inputPassword: string) => {
        setPassword(inputPassword);
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        setError(strengthMessage);
        setFeedback(feedback);
        dispatch(setDisabled(!(strengthMessage === strings.strongPassword)))

    };
    const resetWallet = async () => {
        try {
            await unlockVault(str2buf(password));
            await clearVaultStorage()
            clearStoreData()
            dispatch(clearAppReducer())
            resetNavigation(RouteType.HOME_SCREEN)
            AsyncStorage.setItem('isWalletCreated', '')
        } catch (error) {
            Toast.show({ type: 'error', text1: error.message });
        }


    };

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
                    <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                        <Text style={styles.buttonText}>{strings.back}</Text>
                    </TouchableOpacity>
                    <View style={styles.enterPasswordContainer}>
                        <Image source={localAssets.lock} style={styles.passwordIcon} />
                        <Text style={styles.enterPasswordtitle}>{strings.resetWalletPassword}</Text>
                        <Text style={[styles.description, { lineHeight: Responsive.size22 }]}>{strings.enterCurrentPassword}</Text>

                        <CustomTextInput
                            placeholder=""
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                handlePasswordChange(text);
                            }}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            showPasswordToggle={true}
                            passwordIconVisible={localAssets.eye}
                            passwordIconHidden={localAssets.eyeoff}
                            style={styles.input} />
                        {password !== "" && error !== strings.strongPassword && (
                            <Text style={styles.passwordError}>{strings.passwordValidationMessage}</Text>
                        )}
                        {/* <Text style={styles.passwordError}>{feedback}</Text> */}
                    </View>
                </View>
            </ScrollView>

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <CommonButton
                        title={strings.continue}
                        onPress={() => resetWallet()}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        disabled={error != strings.strongPassword}
                        width={'100%'}
                        height={Responsive.size50}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
};
export default VerifyPassword;