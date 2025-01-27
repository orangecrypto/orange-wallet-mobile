import { Responsive } from '@utils/Responsive';
import { Color } from "@values/color";
import { Fonts } from '@values/fonts';
import { StyleSheet, Text, View } from "react-native";

const Assistant = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.password}>Assistant</Text>
             
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
         alignItems:'center'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    password: {
        fontSize: Responsive.size22,
        fontFamily: Fonts.bold,
        color: Color.orangeButton,
        marginTop: Responsive.size22,
    },
});

export default Assistant;
