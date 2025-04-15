import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { strings } from "@strings/i18n";
import { validatePasswordStrength } from "@utils/Validations";
import { Color } from "@values/color";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "@redux/store";
import { setDisabled } from "@redux/slice/SeedPhraseReducer";

const EnterPassword = ({ type, onPasswordChange }: { type: "enter" | "confirm"; onPasswordChange: (password: string) => void }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");
    const dispatch: Dispatch = useAppDispatch()

    const handlePasswordChange = (inputPassword: string) => {
        setPassword(inputPassword);
        onPasswordChange(inputPassword);
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        setError(strengthMessage);
        setFeedback(feedback);
        dispatch(setDisabled(!(strengthMessage === strings.strongPassword)))
       
    };
    useEffect(() => {
       dispatch(setDisabled(true))
    }, [])

    return (
        <View style={styles.container}>
            <Image source={localAssets.lock} style={styles.topIcon} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{type === "enter" ? strings.enterPassword : strings.confirmPassword}</Text>
                <Text style={styles.reviewText}>{type === "enter" ? strings.enterPasswordDec : strings.confirmPasswordDec}</Text>
                <CustomTextInput
                    placeholder={type === "enter" ? strings.enterPassword : strings.confirmPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                    showPasswordToggle={true}
                    passwordIconVisible={localAssets.eye}
                    passwordIconHidden={localAssets.eyeoff}
                    style={styles.input} />
                {/* <Text style={[styles.passwordError, { color: error === strings.strongPassword ? Color.green : Color.red }]}>{error}</Text>
                <Text style={styles.passwordError}>{feedback}</Text> */}

                {error !== strings.strongPassword && <Text style={styles.passwordError}>{strings.passwordValidationMessage}</Text>}
            </View>
        </View>
    );
};

export default EnterPassword;