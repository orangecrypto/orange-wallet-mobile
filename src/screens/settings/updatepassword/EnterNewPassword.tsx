import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { Image, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { validatePasswordStrength } from "@utils/Validations";
import CommonButton from "@components/CommonButton";
import { orangeButton, white } from "@values/color";
import { Responsive } from "@utils/Responsive";
import { CONFIRMNEWPASSWORD } from "@routes/RouteType";

const EnterNewPassword = () => {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordFeedback, setPasswordFeedback] = useState("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const handleSubmit = () => {
        const { strengthMessage } = validatePasswordStrength(password);
        if (strengthMessage === strings.weakPassword || strengthMessage === strings.moderatePassword) {
            setPasswordError(strings.useStrongPassword)
        } else {
           push(CONFIRMNEWPASSWORD)
        }
    };

    const handlePasswordChange = (inputPassword) => {
        const { strengthMessage, feedback } = validatePasswordStrength(inputPassword);
        console.log(strengthMessage);
        setPasswordError(strengthMessage);
        setPasswordFeedback(feedback);

        console.log(feedback);
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
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <View style={styles.enterPasswordContainer}>
                    <Image source={localAssets.lock} style={styles.passwordIcon} />
                    <Text style={styles.title}>{strings.enterPassword}</Text>
                    <Text style={styles.description}>{strings.enterNewPassword}</Text>

                    <CustomTextInput
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text); 
                            handlePasswordChange(text); 
                        }}
                        secureTextEntry={true}
                        showPasswordToggle={true}
                        passwordIconVisible={localAssets.eye}
                        passwordIconHidden={localAssets.eyeoff}
                        style={styles.input} />
                    <Text style={[styles.passwordError, { color: passwordError === strings.strongPassword ? 'green' : 'red' }]}>
                        {passwordError}
                    </Text>
                    <Text style={styles.passwordError}>{passwordFeedback}</Text>
                </View>
            </View>
            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <CommonButton
                        title={strings.continue}
                        onPress={() => handleSubmit()}
                        backgroundColor={orangeButton}
                        textColor={white}
                        disabled={passwordError === strings.strongPassword? false: true}
                        width={'100%'}
                        height={Responsive.size50}
                        />
                </View>
            )}
        </View>
    );
};

export default EnterNewPassword;
