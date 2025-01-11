import { Image, StyleSheet, Text, View } from "react-native";
import CommonButton from "../../components/CommonButton";
import { localAssets } from "../../resources/assets/assets";
import { strings } from "../../resources/locale/i18n";
import { black, blackBorder, orangeBorder, orangeButton, white } from "../../resources/values/color";
import { push } from "../../routes/Navigator";
import { SEEDPHRASE } from "../../routes/RouteType";
import { Responsive } from "../../utils/Responsive";

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
                    onPress={() => console.log('Backup Latter Wallet pressed')}
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
        fontWeight: 'bold',
        color: orangeButton,
    },

    reviewText: {
       fontSize: Responsive.size18,
        color: white,
        fontWeight: '400',
        marginTop: Responsive.size20,
        textAlign:'center'
    },
});

export default BackupWallet;
