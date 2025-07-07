import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import SendingHeader from "@components/SendingHeader";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import useAddressValidation from "@hooks/useAddressValidation";
import Clipboard from "@react-native-clipboard/clipboard";
import useGenerateSignedOrdinalTransaction from "@hooks/useGenerateSignedOrdinalTransaction";
import Loader from "@components/Loader";
import Toast from "react-native-toast-message";

const SendOrdinals = ({ route }) => {

    const [ordinalsData, setOrdinalsData] = useState(route?.params?.ordinalsData)
    const [walletAddress, setWalletAddress] = useState("");
    const { isValidAddress, errorMessage } = useAddressValidation(walletAddress, { protocol: 'runes' });
    const {
        isPending,
        generateSignedOrdinalTransaction,
        transactionData,
        transactionError
    } = useGenerateSignedOrdinalTransaction();
    console.log('SendOrdinals transactionError', transactionError)

    console.log('SendOrdinals transactionData', transactionData)

    console.log('SendOrdinals', ordinalsData)
    const handlePaste = async () => {
        setWalletAddress(await Clipboard.getString())
    };


    const generateSignedSendOrdinals = async () => {
        try {
            console.log('generateSignedSendOrdinals', 'call');
    
            console.log('walletAddress:', walletAddress);
            console.log('ordinalsData:', ordinalsData);
    
            const signedOrdinals = await generateSignedOrdinalTransaction(walletAddress, ordinalsData);
    
            if (!signedOrdinals) {
                throw new Error('Signed ordinals transaction is undefined.');
            }
    
            console.log('generateSignedSendOrdinals', `signedOrdinals: ${JSON.stringify(signedOrdinals)}`);
    
            push(RouteType.SENDORDINALSCONFIRMATION, {
                transactionData: signedOrdinals,
                confirmData: {
                    transactionType: strings.ordinals,
                    recipientAddress: walletAddress,
                },
            });
    
        } catch (error) {
            console.error('Error in generateSignedSendOrdinals:', error);
    
            Toast.show({
                type: 'error',
                text1: 'Transaction Failed',
                text2: error?.message || 'Something went wrong while signing the ordinals transaction.',
            });
        }
    };
    
    
    const handleButtonDisable = () => !(walletAddress && isValidAddress);
    return (
        <View style={styles.container}>
            {isPending && <Loader loading={isPending} />}
            <SendingHeader
                title={ordinalsData?.number}
                subtitle={strings.incription}
                ticker={'Ordinals'}
                nftIcons={localAssets.nft}
                containerStyle={styles.sendingHeader}
            />

            <View style={styles.contentContainer}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{strings.sendOrdinals}</Text>
                    <View style={styles.sendIconBakcground}>
                        <Image style={styles.sendIcon} source={localAssets.send} tintColor={Color.orangeButton} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.description}>{strings.enterwalletAddress}</Text>

                    <CustomTextInput
                        placeholder={strings.enterBitcoinAddress}
                        value={walletAddress}
                        onChangeText={setWalletAddress}
                        showPasswordToggle={false}
                        rightText={strings.paste}
                        style={styles.input}
                        keyboardType={"default"}
                        rightTextStyle={styles.pasteText}
                        onRightTextPress={() => handlePaste()} />
                    {!isValidAddress && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        </View>
                    )}

                </View>
            </View>
            <Text style={styles.importantText}>{strings.important}:
                <Text style={styles.importantMessage}> {strings.importantMessage}</Text>
            </Text>
            <View style={styles.horizontalButtonContainer}>
                <CommonButton
                    title={strings.cancel}
                    onPress={() => goBack()}
                    backgroundColor={Color.black}
                    textColor={Color.white}
                    borderColor={Color.blackBorder}
                    width={'45%'}
                    height={Responsive.size50} />
                <CommonButton
                    title={strings.next}
                    onPress={() => generateSignedSendOrdinals()}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'45%'}
                    disabled={handleButtonDisable()}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default SendOrdinals;
