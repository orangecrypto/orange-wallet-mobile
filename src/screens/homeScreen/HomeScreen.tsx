import { Image, StyleSheet, Text, View } from "react-native";
import { Responsive } from '@utils/Responsive';
import CommonButton from "@components/CommonButton";
import { Color } from "@values/color";
import { strings } from "@strings/i18n";
import { localAssets } from "@assets/assets";
import { push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
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
                    onPress={() => push(RouteType.LEGAL)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    borderColor={Color.orangeBorder}
                    width={'100%'}
                    height={Responsive.size50}
                />
                <CommonButton
                    title={strings.restoreWallet}
                    onPress={() => console.log('Restore Wallet pressed')}
                    backgroundColor={Color.black}
                    textColor={Color.white}
                    borderColor={Color.blackBorder}
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
        backgroundColor: Color.black,
        padding: Responsive.size20,
    },

    topIcon: {
        height: Responsive.size120,
        width: Responsive.size120,
    },

    topText: {
        fontSize: Responsive.size22,
        fontFamily:Fonts.bold,
        color: Color.orangeButton,
        marginTop: Responsive.size22,
    },

    versionText: {
        fontSize: Responsive.size12,
        fontFamily:Fonts.regular,
        color: Color.orangeButton,
    },

    versionView: {
        backgroundColor: Color.orangeOpacityBg,
        borderColor: Color.orangeButton,
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
