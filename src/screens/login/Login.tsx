import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import { Dispatch } from "@reduxjs/toolkit";
import { push } from "@routes/Navigator";
import { WALLETBALANCE } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { validatePasswordStrength } from "@utils/Validations";
import { black, green, orangeButton, red, white } from "@values/color";
import { Fonts } from '@values/fonts';
import { useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { clearLoginReducer, loginReducerType, setPassword, setPasswordError, setPasswordFeedback } from "./LoginReducer";

const Login = () => {
    const { password, passwordError, passwordFeedback } = useSelector((state: { loginReducer: loginReducerType }) => state.loginReducer)
    const dispatch: Dispatch = useAppDispatch()
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const handlePasswordChange = (inputPassword) => {
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        console.log(strengthMessage)
        dispatch(setPasswordError(strengthMessage))
        dispatch(setPasswordFeedback(feedback))

    };

    const handleSubmit = () => {
        const { strengthMessage } = validatePasswordStrength(password);
        if (strengthMessage === strings.weakPassword || strengthMessage === strings.moderatePassword) {
            dispatch(setPasswordError(strings.useStrongPassword))
        } else {
            dispatch(clearLoginReducer())
            push(WALLETBALANCE)
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
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.contentContainer}>
                        <Image source={localAssets.pill} style={styles.topIcon} />
                        <Text style={styles.password}>{strings.password}</Text>
                        <CustomTextInput
                            placeholder={strings.enterPassword}
                            value={password}
                            onChangeText={(text) => {
                                dispatch(setPassword(text))
                                handlePasswordChange(text)
                            }}
                            secureTextEntry={true}
                            showPasswordToggle={true}
                            passwordIconVisible={localAssets.eye}
                            passwordIconHidden={localAssets.eyeoff}
                            style={styles.input}/>
                        <Text style={[styles.passwordError,{color:passwordError ===  strings.strongPassword ? green :red }]}>{passwordError}</Text>
                        <Text style={styles.passwordError}>{passwordFeedback}</Text>  
                        <Text style={styles.forgotPassword}>{strings.forgotPassword}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <CommonButton
                        title={strings.unlock}
                        onPress={() => handleSubmit()}
                        backgroundColor={orangeButton}
                        textColor={white}
                        disabled={passwordError === strings.strongPassword? false: true}
                        width={'100%'}
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
        padding: Responsive.size20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: Responsive.size20,
    },
    contentContainer: {
        justifyContent: 'flex-start',
        marginTop: Responsive.size100,
        paddingBottom: Responsive.size100,  // Adds bottom padding to ensure the button doesn't overlap
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
    },
    topIcon: {
        height: Responsive.size120,
        width: Responsive.size120,
        alignSelf: 'center'
    },
    password: {
        fontSize: Responsive.size22,
        fontFamily: Fonts.semibold,
        color: orangeButton,
        marginTop: Responsive.size22,
    },
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },
    forgotPassword: {
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
        color: white,
        marginTop: Responsive.size16,
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
    passwordError:{
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color:red,
        lineHeight: Responsive.size18
    }
});

export default Login;
