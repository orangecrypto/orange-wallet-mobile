import { Responsive } from '@utils/Responsive';
import { black, orangeButton } from "@values/color";
import { Fonts } from '@values/fonts';
import { StyleSheet, Text, View } from "react-native";

const Settings = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.password}>Settings</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
         alignItems:'center'
    },
    contentContainer: {
        justifyContent: 'flex-start',
    },
    password: {
        fontSize: Responsive.size22,
        fontFamily: Fonts.bold,
        color: orangeButton,
        marginTop: Responsive.size22,
    },
});

export default Settings;
