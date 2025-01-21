import { Image, StyleSheet, Text, View } from "react-native";
import { Responsive } from '@utils/Responsive';
import CommonButton from "@components/CommonButton";
import { black, blackBorder, orangeBorder, orangeButton, orangeOpacityBg, white } from "@values/color";
import { strings } from "@strings/i18n";
import { localAssets } from "@assets/assets";
import { push } from "@routes/Navigator";
import { LEGAL } from "@routes/RouteType";
import { Fonts } from '@values/fonts';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={localAssets.pill} style={styles.topIcon} />
            <Text style={styles.topText}>{strings.orangeWallet}</Text>
            <View style={styles.versionView}>
                <Text style={styles.versionText}>{strings.versionName}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.createWallet}
                    onPress={() => push(LEGAL)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    borderColor={orangeBorder}
                    width={'100%'}
                    height={Responsive.size50}
                />
                <CommonButton
                    title={strings.restoreWallet}
                    onPress={() => console.log('Restore Wallet pressed')}
                    backgroundColor={black}
                    textColor={white}
                    borderColor={blackBorder}
                    width={'100%'}
                    height={Responsive.size50}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: black,
        padding: Responsive.size20,
    },

    topIcon: {
        height: Responsive.size120,
        width: Responsive.size120,
    },

    topText: {
        fontSize: Responsive.size22,
        fontFamily:Fonts.bold,
        color: orangeButton,
        marginTop: Responsive.size22,
    },

    versionText: {
        fontSize: Responsive.size12,
        fontFamily:Fonts.regular,
        color: orangeButton,
    },

    versionView: {
        backgroundColor: orangeOpacityBg,
        borderColor: orangeButton,
        borderWidth: Responsive.size1,
        paddingHorizontal: Responsive.size8,
        paddingVertical: Responsive.size2,
        borderRadius: Responsive.size20,
        marginVertical: Responsive.size20,
    },

    buttonContainer: {
        position: 'absolute',
        bottom: Responsive.size60,
        width: '100%',
        alignItems: 'center',
    },
});

export default HomeScreen;
