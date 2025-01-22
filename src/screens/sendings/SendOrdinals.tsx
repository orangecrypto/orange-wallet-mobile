import CommonButton from "@components/CommonButton";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { SENDCONFIRMATION, WALLETBALANCE } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { black, blackBorder, orangeButton, white } from "@values/color";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";
import SendingHeader from "@components/SendingHeader";

const SendOrdinals = () => {
    const [textValue, setTextValue] = useState('');

    return (
        <View style={styles.container}>

            <SendingHeader
                title="0.02832"
                subtitle="0.02832"
                tokens={['Ordinals']}
                iconSource={localAssets.assetbitcoin}
                containerStyle={styles.sendingHeader} />

            <View style={styles.contentContainer}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{strings.sendOrdinals}</Text>
                    <View style={styles.sendIconBakcground}>
                        <Image style={styles.sendIcon} source={localAssets.send} tintColor={orangeButton} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.description}>{strings.enterwalletAddress}</Text>

                    <CustomTextInput
                        placeholder={strings.enterBitcoinAddress}
                        value={textValue}
                        onChangeText={setTextValue}
                        showPasswordToggle={false}
                        style={styles.input} />

                </View>
            </View>
            <Text style={styles.importantText}>{strings.important}:
                <Text style={styles.importantMessage}> {strings.importantMessage}</Text>
            </Text>
            <View style={styles.horizontalButtonContainer}>
                <CommonButton
                    title={strings.cancel}
                    onPress={() => goBack()}
                    backgroundColor={black}
                    textColor={white}
                    borderColor={blackBorder}
                    width={'45%'}
                    height={Responsive.size50} />
                <CommonButton
                    title={strings.next}
                    onPress={() => push(SENDCONFIRMATION)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    width={'45%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default SendOrdinals;
