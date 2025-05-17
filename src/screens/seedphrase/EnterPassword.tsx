import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { setDisabled } from "@redux/slice/SeedPhraseReducer";
import { useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { strings } from "@strings/i18n";
import { validatePasswordStrength } from "@utils/Validations";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

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

                {error !== strings.strongPassword && (
                    <Text style={styles.passwordError}>{strings.passwordValidationMessage}</Text>
                )}

            </View>
        </View>
    );
};

export default EnterPassword;