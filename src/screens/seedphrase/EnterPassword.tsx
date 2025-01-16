import { Image, Keyboard, StyleSheet, Text, View } from "react-native";
import { black, green, orangeButton, red, white } from "@values/color";
import { Responsive } from '@utils/Responsive';
import { strings } from "@strings/i18n";
import { localAssets } from "@assets/assets";
import { useEffect, useState } from "react";
import CustomTextInput from "@components/CustomTextInput";
import { Fonts } from '@values/fonts';
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { seedPhraseReducerType, setPassword, setPasswordError, setPasswordFeedback } from "./SeedPhraseReducer";
import { validatePasswordStrength } from "@utils/Validations";

const EnterPassword = () => {
    const { password, passwordError, passwordFeedback } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer)
    const dispatch: Dispatch = useAppDispatch()

    const handlePasswordChange = (inputPassword) => {
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        console.log(strengthMessage)
        dispatch(setPasswordError(strengthMessage))
        dispatch(setPasswordFeedback(feedback))

        console.log(feedback)
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
        <View style={styles.container}>
            <Image source={localAssets.lock} style={styles.topIcon} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.enterPassword}</Text>
                <Text style={styles.reviewText}>{strings.enterPasswordDec} </Text>
                <CustomTextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(text) => {
                          dispatch(setPassword(text))
                        handlePasswordChange(text)}
                    }
                    secureTextEntry={true}
                    showPasswordToggle={true}
                    passwordIconVisible={localAssets.eye}
                    passwordIconHidden={localAssets.eyeoff}
                    style={styles.input}
                />

                   <Text style={[styles.passwordError,{color:passwordError === strings.strongPassword ? green :red }]}>{passwordError}</Text>
                                        <Text style={styles.passwordError}>{passwordFeedback}</Text>  {/* Show any additional feedback */}
                                    
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },

    title: {
        fontSize: Responsive.size22,
        color: orangeButton,
       fontFamily:Fonts.bold,

    },

    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },

    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: white,
        fontFamily:Fonts.semibold,
        lineHeight: Responsive.size22,
    },
    topIcon: {
        height: Responsive.size140,
        width: Responsive.size140,
        alignSelf: 'center'
    },
     passwordError:{
            fontSize: Responsive.size12,
            fontFamily: Fonts.regular,
            color:red,
            lineHeight: Responsive.size18
        }

});

export default EnterPassword;
