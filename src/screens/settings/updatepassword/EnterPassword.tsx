import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { setDisabled } from "@redux/slice/SeedPhraseReducer";
import { useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { strings } from "@strings/i18n";
import { validatePasswordStrength } from "@utils/Validations";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "../styles";
import { Responsive } from "@utils/Responsive";

const EnterPassword = ({ type, onPasswordChange, handleError }: { type: "oldPassword" | "newPassword" | "confirmPassword"; onPasswordChange: (password: string) => void, handleError: (errorMessage: string) => void }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");
    const dispatch: Dispatch = useAppDispatch()

    const handlePasswordChange = (inputPassword: string) => {
        setPassword(inputPassword);
        onPasswordChange(inputPassword);
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        handleError(strengthMessage)
        setError(strengthMessage);
        setFeedback(feedback);
        dispatch(setDisabled(!(strengthMessage === strings.strongPassword)))

    };
    useEffect(() => {
        dispatch(setDisabled(true))
    }, [])

    return (
        <View style={styles.enterPasswordContainer}>
            <Image source={localAssets.lock} style={styles.passwordIcon} />
            <Text style={styles.title}>{type === "oldPassword" ? strings.updatePassword : type === "newPassword" ? strings.enterPassword : strings.confirmPassword}</Text>
            <Text style={[styles.description, { lineHeight: Responsive.size22 }]}>{type === "oldPassword" ? strings.enterCurrentPassword : type === "newPassword" ? strings.enterNewPassword : strings.confirmPasswordDec}</Text>

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
            <Text style={[styles.passwordError, { color: error === strings.strongPassword ? 'green' : 'red' }]}>
                {error}
            </Text>
            <Text style={styles.passwordError}>{feedback}</Text>
        </View>
    );
};

export default EnterPassword;