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
import { seedPhraseReducerType, setDisabled, setPassword, setPasswordError, setPasswordFeedback } from "./SeedPhraseReducer";
import { styles } from "./styles";

const EnterPassword = () => {
    const { password, passwordError, passwordFeedback, words } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer)
    const dispatch: Dispatch = useAppDispatch()

    const handlePasswordChange = (inputPassword) => {
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        console.log(strengthMessage)
        dispatch(setPasswordError(strengthMessage))
        dispatch(setPasswordFeedback(feedback))
        if (strengthMessage === strings.strongPassword) {
            dispatch(setDisabled(false))
        } else {
            dispatch(setDisabled(true))
        }
    };
    useEffect(() => {
        if (passwordError === strings.strongPassword) {
            dispatch(setDisabled(false))
        } else {
            dispatch(setDisabled(true))
        }

    }, [])

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
                        handlePasswordChange(text)
                    }
                    }
                    secureTextEntry={true}
                    showPasswordToggle={true}
                    passwordIconVisible={localAssets.eye}
                    passwordIconHidden={localAssets.eyeoff}
                    style={styles.input} />
                <Text style={[styles.passwordError, { color: passwordError === strings.strongPassword ? Color.green : Color.red }]}>{passwordError}</Text>
                <Text style={styles.passwordError}>{passwordFeedback}</Text>
            </View>
        </View>
    );
};

export default EnterPassword;
