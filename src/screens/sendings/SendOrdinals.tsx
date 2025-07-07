import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import SendingHeader from "@components/SendingHeader";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import {Color } from "@values/color";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

const SendOrdinals = () => {
    const [textValue, setTextValue] = useState('');

    return (
        <View style={styles.container}>

                <SendingHeader
                    title="0.02832"
                    subtitle="0.02832"
                    ticker={'BTC'}
                    type={'BRC-20'}
                    iconSource={localAssets.assetbitcoin}
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
                    backgroundColor={Color.black}
                    textColor={Color.white}
                    borderColor={Color.blackBorder}
                    width={'45%'}
                    height={Responsive.size50} />
                <CommonButton
                    title={strings.next}
                    onPress={() => push(RouteType.SENDCONFIRMATION)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'45%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default SendOrdinals;
