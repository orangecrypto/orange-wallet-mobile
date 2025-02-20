import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { generateMnemonic, str2buf } from "@orangecryptohq/orangeseed";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { Color } from "@values/color";
import { Fonts } from '@values/fonts';
import { useCallback, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import useSeedVault from '@hooks/useSeedVault';
const BackupWallet = () => {

    const {init: initSeedVault, storeSeed , hasSeed, unlockVault, clearVaultStorage }= useSeedVault()

    const generateAndStoreSeedPhrase =  useCallback( async () =>{
        let newSeePhrase : string | null = generateMnemonic()
        await initSeedVault(str2buf(''))
        await storeSeed(newSeePhrase)
        newSeePhrase = null
        
    },[initSeedVault, storeSeed])

    useEffect(() => {
        const initialize = async ()=>{
            const hasseed = await hasSeed()
            if(!hasseed){
                await generateAndStoreSeedPhrase()
                return
            }
            await unlockVault(str2buf(''))
            await clearVaultStorage()
            await generateAndStoreSeedPhrase()
            return
        }
        initialize()

    }, [clearVaultStorage, generateAndStoreSeedPhrase, hasSeed, initSeedVault]);
    
    
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
                    onPress={() => {push(RouteType.SEEDPHRASE,{backupLatter : true})}}
                    backgroundColor={Color.black}
                    textColor={Color.white}
                    borderColor={Color.blackBorder}
                    width={'40%'}
                    height={Responsive.size50} />
                <CommonButton
                    title={strings.backupNow}
                    onPress={() => push(RouteType.SEEDPHRASE)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    borderColor={Color.orangeBorder}
                    width={'40%'}
                    height={Responsive.size50} />
              
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
        padding: Responsive.size20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    title: {
        fontSize: Responsive.size18,
        color: Color.white,
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
        color: Color.orangeButton,
    },

    reviewText: {
       fontSize: Responsive.size18,
        color: Color.white,
        fontFamily:Fonts.semibold,
        marginTop: Responsive.size20,
        textAlign:'center',
        lineHeight: Responsive.size24,
    },
});

export default BackupWallet;
