import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { Dispatch } from "@reduxjs/toolkit";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { validatePasswordStrength } from "@utils/Validations";
import { black, green, orangeButton, red, white } from "@values/color";
import { Fonts } from '@values/fonts';
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { seedPhraseReducerType, setConfirmPassword, setConfirmPasswordError, setPasswordFeedback } from "./SeedPhraseReducer";

const ConfirmPassword = () => {
    const { confirmPassword, confirmPasswordError, passwordFeedback } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer)
    const dispatch: Dispatch = useAppDispatch()
    const handlePasswordChange = (inputPassword : any) => {
        dispatch(setPasswordFeedback(''))
        dispatch(setConfirmPasswordError(''))
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        console.log(strengthMessage)
        dispatch(setConfirmPasswordError(strengthMessage))
        dispatch(setPasswordFeedback(feedback))
    };
    return (
        <View style={styles.container}>
            <Image source={localAssets.lock} style={styles.topIcon} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.confirmPassword}</Text>
                <Text style={styles.reviewText}>{strings.confirmPasswordDec} </Text>
                <CustomTextInput
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={(text) => {
                        dispatch(setConfirmPassword(text))
                        handlePasswordChange(text)
                    }
                    }
                    secureTextEntry={true}
                    showPasswordToggle={true}
                    passwordIconVisible={localAssets.eye}
                    passwordIconHidden={localAssets.eyeoff}
                    style={styles.input}/>

                  <Text style={[styles.passwordError,{color:confirmPasswordError === 'Strong password' ? green :red }]}>{confirmPasswordError}</Text>
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
        fontFamily: Fonts.bold,

    },

    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',

    },


    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: white,
        fontFamily: Fonts.semibold,
        lineHeight: Responsive.size22,
    },
    topIcon: {
        height: Responsive.size140,
        width: Responsive.size140,
        alignSelf: 'center'
    },
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },
    passwordError:{
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color:red,
        lineHeight: Responsive.size18
    }

});

export default ConfirmPassword;
