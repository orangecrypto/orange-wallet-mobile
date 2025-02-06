import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { Dispatch } from "@reduxjs/toolkit";
import { strings } from "@strings/i18n";
import { validatePasswordStrength } from "@utils/Validations";
import { Color } from "@values/color";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { seedPhraseReducerType, setConfirmPassword, setConfirmPasswordError, setConfirmPasswordFeedBack, setDisabled } from "./SeedPhraseReducer";
import { styles } from "./styles";

const ConfirmPassword = () => {
    const { confirmPassword, confirmPasswordError, confirmPasswordFeedback } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer)
    const dispatch: Dispatch = useAppDispatch()
    const handlePasswordChange = (inputPassword: any) => {
        dispatch(setConfirmPasswordFeedBack(''))
        dispatch(setConfirmPasswordError(''))
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        dispatch(setConfirmPasswordError(strengthMessage))
        dispatch(setConfirmPasswordFeedBack(feedback))
        if (strengthMessage === strings.strongPassword) {
            dispatch(setDisabled(false))
        } else {
            dispatch(setDisabled(true))
        }
    };

    useEffect(() => {
        dispatch(setDisabled(true))
    }, [])
    return (
        <View style={styles.container}>
            <Image source={localAssets.lock} style={styles.topIcon} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.confirmPassword}</Text>
                <Text style={styles.reviewText}>{strings.confirmPasswordDec} </Text>
                <CustomTextInput
                    placeholder={strings.confirmPassword}
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
                    style={styles.input} />

                <Text style={[styles.passwordError, { color: confirmPasswordError === strings.strongPassword ? Color.green : Color.red }]}>{confirmPasswordError}</Text>
                <Text style={styles.passwordError}>{confirmPasswordFeedback}</Text>  

            </View>
        </View>
    );
};

export default ConfirmPassword;
