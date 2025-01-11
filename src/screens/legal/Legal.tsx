import { Image, StyleSheet, Text, View } from "react-native";
import CommonButton from "../../components/CommonButton";
import { strings } from "../../resources/locale/i18n";
import { black, blackBorder, orangeBorder, orangeButton, white } from "../../resources/values/color";
import { push } from "../../routes/Navigator";
import { BACKUPWALLET } from "../../routes/RouteType";
import { Responsive } from "../../utils/Responsive";
import { localAssets } from "../../resources/assets/assets";

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
        justifyContent: 'flex-start',
        marginTop: Responsive.size20
    },
    title: {
        fontSize: Responsive.size22,
        color: orangeButton,
        fontWeight: '600',

    },

    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: white,
        fontWeight: '400',
    },

    orangeText: {
        fontSize: Responsive.size18,
        color: orangeButton,
        fontWeight: '400',
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
        fontWeight: '400',

    },

    roundedIconView: {
        width: Responsive.size32,
        height: Responsive.size32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2340333',
        borderRadius: Responsive.size16

    },

    pinIcon: {
        width: Responsive.size18,
        height: Responsive.size10
    }
});

export default Legal;
