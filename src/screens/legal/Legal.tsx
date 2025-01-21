import { Image, StyleSheet, Text, View } from "react-native";
import CommonButton from "@components/CommonButton";
import { strings } from "@strings/i18n";
import { black, blackBorder, orangeBorder, orangeButton, orangeOpacityBg, white } from "@values/color";
import { push } from "@routes/Navigator";
import { BACKUPWALLET } from "@routes/RouteType";
import { Responsive } from '@utils/Responsive';
import { localAssets } from "@assets/assets";
import { Fonts } from '@values/fonts';

const Legal = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.legal}</Text>
                <Text style={styles.reviewText}>{strings.reviewPolicy} <Text style={styles.orangeText}>{strings.orange}</Text> {strings.reviewOfService}</Text>

                <View style={[styles.roundedView, { marginTop: Responsive.size50 }]}>
                    <Text style={styles.roundedViewtext}>{strings.termsOfService}</Text>
                    <View style={styles.roundedIconView}>
                        <Image style={styles.pinIcon} source={localAssets.pin} />
                    </View>
                </View>

                <View style={[styles.roundedView, { marginTop: Responsive.size12 }]}>
                    <Text style={styles.roundedViewtext}>{strings.privacyPolicy}</Text>
                    <View style={styles.roundedIconView}>
                        <Image style={styles.pinIcon} source={localAssets.pin} />
                    </View>
                </View>
            </View>



            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.accept}
                    onPress={() => push(BACKUPWALLET)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    borderColor={orangeBorder}
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
        backgroundColor: black,
        padding: Responsive.size20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: Responsive.size20
    },
    title: {
        fontSize: Responsive.size32,
        color: orangeButton,
        fontFamily: Fonts.bold,

    },

    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: white,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size24
    },

    orangeText: {
        fontSize: Responsive.size18,
        color: orangeButton,
        fontFamily: Fonts.semibold,
    },

    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
    },

    roundedView: {
        borderRadius: Responsive.size10,
        borderColor: blackBorder,
        borderWidth: Responsive.size1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size10

    },
    roundedViewtext: {
        fontSize: Responsive.size18,
        color: white,
        fontFamily: Fonts.semibold,

    },

    roundedIconView: {
        width: Responsive.size32,
        height: Responsive.size32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: orangeOpacityBg,
        borderRadius: Responsive.size16

    },

    pinIcon: {
        width: Responsive.size18,
        height: Responsive.size10
    }
});

export default Legal;
