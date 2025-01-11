import { Image, StyleSheet, Text, View } from "react-native";
import CommonButton from "@components/CommonButton";
import { strings } from "@strings/i18n";
import { black, orangeBorder, orangeButton, white } from "@values/color"
import { push } from "@routes/Navigator";
import { BACKUPWALLET } from "@routes/RouteType";
import { Responsive } from '@utils/Responsive';
import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import { useState } from "react";
import { Fonts } from '@values/fonts';

const Login = () => {

        const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
            <Image source={localAssets.pill} style={styles.topIcon} />
            <Text style={styles.password}>{strings.password}</Text>
            <CustomTextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    showPasswordToggle={true}
                    passwordIconVisible={localAssets.eye}
                    passwordIconHidden={localAssets.eyeoff}
                    style={styles.input}/>
                      <Text style={styles.forgotPassword}>{strings.forgotPassword}</Text>
            </View>
          
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.unlock}
                    onPress={() => push(BACKUPWALLET)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    borderColor={orangeBorder}
                    width={'100%'}
                    height={Responsive.size45}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        padding: Responsive.size20,
    },
    contentContainer: {
        flex: 1,
        justifyContent:'flex-start',
        marginTop: Responsive.size100
    },
   
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
    },

    topIcon: {
        height: Responsive.size120,
        width: Responsive.size120,
        alignSelf:'center'
    },

    password: {
        fontSize: Responsive.size22,
        fontFamily:Fonts.bold,
        color: orangeButton,
        marginTop: Responsive.size22,
    },
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },
    forgotPassword: {
        fontSize: Responsive.size14,
        fontFamily:Fonts.regular,
        color: white,
        marginTop: Responsive.size16,
        textDecorationLine: 'underline',
        alignSelf:'center'
    },
});

export default Login;
