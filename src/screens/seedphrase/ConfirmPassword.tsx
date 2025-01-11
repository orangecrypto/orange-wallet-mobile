import { Image, StyleSheet, Text, View } from "react-native";
import { black, orangeButton, white } from "@values/color";
import { Responsive } from '@utils/Responsive';
import { strings } from "@strings/i18n";
import { localAssets } from "@assets/assets";
import { useState } from "react";
import CustomTextInput from "@components/CustomTextInput";
import { Fonts } from '@values/fonts';

const ConfirmPassword = () => {
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Image source={localAssets.lock} style={styles.topIcon} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.confirmPassword}</Text>
                <Text style={styles.reviewText}>{strings.confirmPasswordDec} </Text>
                <CustomTextInput
                    placeholder="Confirm your password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    showPasswordToggle={true}
                    passwordIconVisible={localAssets.eye}
                    passwordIconHidden={localAssets.eyeoff}
                    style={styles.input}
                />
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
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },

});

export default ConfirmPassword;
