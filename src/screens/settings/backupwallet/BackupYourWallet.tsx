import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { validatePasswordStrength } from "@utils/Validations";
import CommonButton from "@components/CommonButton";
import { Color } from "@values/color";
import { Responsive } from "@utils/Responsive";
import { RouteType } from "@routes/RouteType";
import useSeedVault from "@hooks/useSeedVault";
import Toast from "react-native-toast-message";
import { str2buf } from "@orangecryptohq/orangeseed";

const BackupYourWallet = () => {

    const { unlockVault } = useSeedVault()
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordFeedback, setPasswordFeedback] = useState("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const handleSubmit = async () => {
        try {
            await unlockVault(str2buf(password));
            setPassword("")
            setPasswordError("")
            setPasswordFeedback("")
            push(RouteType.COPYSEEDPHRASE)      
        } catch (error) {
            Toast.show({ type: 'error', text1: error.message });
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
               behavior={Platform.OS === "ios" ? "padding" : "height"}
               style={styles.container}>
             
               <ScrollView
                  contentContainerStyle={{
                   flexGrow: 1,
                   paddingBottom: isKeyboardVisible ? Responsive.size50 : 0,
                 }}
                 keyboardShouldPersistTaps="handled"
                 showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <View style={styles.enterPasswordContainer}>
                    <Image source={localAssets.lock} style={styles.passwordIcon} />
                    <Text style={styles.enterPasswordtitle}>{strings.backupYourWallet}</Text>
                    <Text style={styles.description}>{strings.enterCurrentPassword}</Text>

                    <CustomTextInput
                        placeholder={''}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text); 
                           
                        }}
                        secureTextEntry={true}
                        showPasswordToggle={true}
                        passwordIconVisible={localAssets.eye}
                        passwordIconHidden={localAssets.eyeoff}
                        style={styles.input} />
                  
                </View>
                </View>
            </ScrollView>
            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <CommonButton
                        title={strings.continue}
                        onPress={() => handleSubmit()}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        disabled={password=== ''}
                        width={'100%'}
                        height={Responsive.size50}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

export default BackupYourWallet;
