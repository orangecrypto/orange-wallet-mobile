import { Image, StyleSheet, Text, View } from "react-native";
import { black, orangeButton, white } from "../../resources/values/color";
import { Responsive } from "../../utils/Responsive";
import { strings } from "../../resources/locale/i18n";
import { localAssets } from "../../resources/assets/assets";
import { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";

const EnterPassword = () => {
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Image source={localAssets.lock} style={styles.topIcon} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.enterPassword}</Text>
                <Text style={styles.reviewText}>{strings.enterPasswordDec} </Text>
                <CustomTextInput
                    placeholder="Enter your password"
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
        fontWeight: '600',

    },

    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },

    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: white,
        fontWeight: '400',
    },
    topIcon: {
        height: Responsive.size140,
        width: Responsive.size140,
        alignSelf: 'center'
    },

});

export default EnterPassword;
