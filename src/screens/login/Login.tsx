import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import { Dispatch } from "@reduxjs/toolkit";
import { push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { validatePasswordStrength } from "@utils/Validations";
import { Color } from "@values/color";
import { Fonts } from '@values/fonts';
import { useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import useSeedVault from '@hooks/useSeedVault';
import { useAppDispatch } from "@redux/store";
import { clearLoginReducer, loginReducerType, setPassword, setPasswordError, setPasswordFeedback } from "@redux/slice/LoginReducer";
import { str2buf } from "@orangecryptohq/orangeseed";
const Login = () => {
    
    const { unlockVault } = useSeedVault()
    const { password, passwordError, passwordFeedback } = useSelector((state: { loginReducer: loginReducerType }) => state.loginReducer)
    const dispatch: Dispatch = useAppDispatch()
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const handlePasswordChange = (inputPassword) => {
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        console.log(strengthMessage)
        dispatch(setPasswordError(strengthMessage))
        dispatch(setPasswordFeedback(feedback))

    };

    const handleSubmit = async () => {
        const { strengthMessage } = validatePasswordStrength(password);
        if (strengthMessage === strings.weakPassword || strengthMessage === strings.moderatePassword) {
            dispatch(setPasswordError(strings.useStrongPassword))
        } else {

            try {
                await unlockVault(str2buf(password))
                dispatch(clearLoginReducer())
                push(RouteType.WALLETBALANCE)

            } catch (error) {
                console.error("Error initializing SeedVault:", error.message);
                Toast.show({
                    type: 'error',
                    text1: error.message,
                });
            }

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
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
                            keyboardType={'default'}
                            passwordIconVisible={localAssets.eye}
                            passwordIconHidden={localAssets.eyeoff}
                            style={styles.input} />
                        <Text style={[styles.passwordError, { color: passwordError === strings.strongPassword ? Color.green : Color.red }]}>{passwordError}</Text>
                        <Text style={styles.passwordError}>{passwordFeedback}</Text>
                        <TouchableOpacity onPress={() => push(RouteType.FORGOTPASSWORD)}>
                            <Text style={styles.forgotPassword}>{strings.forgotPassword}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <CommonButton
                        title={strings.unlock}
                        onPress={() => handleSubmit()}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        disabled={passwordError === strings.strongPassword ? false : true}
                        width={'100%'}
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
        color: Color.orangeButton,
        marginTop: Responsive.size22,
    },
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },
    forgotPassword: {
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
        color: Color.white,
        marginTop: Responsive.size16,
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
    passwordError: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: Color.red,
        lineHeight: Responsive.size18
    }
});

export default Login;
