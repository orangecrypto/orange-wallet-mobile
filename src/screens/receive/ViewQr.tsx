import React, { useRef } from "react";
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import ViewShot, { captureRef } from "react-native-view-shot";
import Share from "react-native-share";
import CommonButton from "@components/CommonButton";
import { goBack, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { styles } from "./styles";
import { localAssets } from "@assets/assets";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-toast-message";

const ViewQr = ({ route }) => {
    const qrRef = useRef(null);
    const captureAndShare = async () => {
        try {
            const uri = await captureRef(qrRef, {
                format: "png",
                quality: 0.8,
            });
            await Share.open({
                url: uri,
                type: "image/png",
                title: "Share QR Code",
            });
        } catch (error) {
            console.error("Error capturing or sharing:", error);
        }
    };

    const handleCopyPress = (address) => {
        Clipboard.setString(address)
        Platform.OS === 'ios' &&
            Toast.show({
                type: 'success',
                text1: strings.copiedMessage,
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                        <Text style={styles.buttonText}>{strings.back}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.title, { lineHeight: Responsive.size40 }]}>
                        {`${strings.receive} ${route?.params?.item?.name || ''}`}
                    </Text>
                    <ViewShot ref={qrRef} style={styles.qrView}>
                        <QRCode
                            value={route?.params?.item?.address}
                            size={Platform.OS === 'ios' ? Responsive.size164 : Responsive.size164}
                            backgroundColor={Color.white}/>
                    </ViewShot>

                    <Text
                        style={[styles.qrcodeAddressText, { lineHeight: Responsive.size26, fontSize: Responsive.size24 }]}
                        numberOfLines={3}
                        adjustsFontSizeToFit>
                        {route?.params?.item?.address}
                        <Text onPress={() => handleCopyPress(route?.params?.item?.address)} style={{ color: Color.white }}>
                            {' '} <Image style={styles.rightItemIcon} source={localAssets.copy} />
                        </Text>
                    </Text>

                </View>
            </ScrollView>

            <Text style={styles.warningText}>{strings.warning}:
                <Text style={styles.warningMessage}>
                    {route?.params?.item.name?.startsWith("Ordinals")
                        ? strings.receiveWarningMessageOrdinals
                        : route?.params?.item.name?.startsWith("Stacks")
                            ? strings.receiveWarningMessageSTX
                            : route?.params?.item.name?.startsWith("Bitcoin")
                                ? strings.receiveWarningMessageBitcoin
                                : ""}
                </Text>
            </Text>
            <View style={styles.horizontalButtonContainer}>
                <CommonButton
                    title={strings.close}
                    onPress={() => resetNavigation(RouteType.WALLETBALANCE)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'45%'}
                    height={Responsive.size50}
                />
                <CommonButton
                    title={strings.share}
                    onPress={captureAndShare}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'45%'}
                    height={Responsive.size50}
                />
            </View>
        </View>
    );
};

export default ViewQr;