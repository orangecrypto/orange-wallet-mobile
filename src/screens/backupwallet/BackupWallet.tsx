import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { push } from "@routes/Navigator";
import { SEEDPHRASE } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { black, blackBorder, orangeBorder, orangeButton, white } from "@values/color";
import { Fonts } from '@values/fonts';
import { Image, StyleSheet, Text, View } from "react-native";

const BackupWallet = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
            <Image source={localAssets.key} style={styles.topIcon} />
            <Text style={styles.topText}>{strings.backupYourWallet}</Text>
            <Text style={styles.reviewText}>
                {strings.backupDescription}
            </Text>
            </View>

            <View style={styles.buttonContainer}>
            <CommonButton
                    title={strings.backupLater}
                    onPress={() => push(SEEDPHRASE,{backupLatter : true})}
                    backgroundColor={black}
                    textColor={white}
                    borderColor={blackBorder}
                    width={'40%'}
                    height={Responsive.size45} />
                <CommonButton
                    title={strings.backupNow}
                    onPress={() => push(SEEDPHRASE)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    borderColor={orangeBorder}
                    width={'40%'}
                    height={Responsive.size45} />
              
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
        alignItems:'center'
    },
    title: {
        fontSize: Responsive.size18,
        color: white,
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row',
        marginBottom: Responsive.size20,
    },
    topIcon: {
        height: Responsive.size200,
        width: Responsive.size200,
        marginTop: Responsive.size80
    },

    topText: {
        fontSize: Responsive.size22,
        fontFamily:Fonts.bold,
        color: orangeButton,
    },

    reviewText: {
       fontSize: Responsive.size18,
        color: white,
        fontFamily:Fonts.semibold,
        marginTop: Responsive.size20,
        textAlign:'center',
        lineHeight: Responsive.size24,
    },
});

export default BackupWallet;
