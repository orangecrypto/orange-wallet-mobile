import React, { useRef } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { lineHeight: Responsive.size40 }]}> 
                    {`${strings.receive} ${route?.params?.item?.name}`}
                </Text>
                <ViewShot ref={qrRef} style={styles.qrView}>
                    <QRCode
                        value={route?.params?.item?.address}
                        size={Platform.OS === 'ios' ? Responsive.size150 : Responsive.size170}
                        backgroundColor={Color.white}
                    />
                </ViewShot>
                <Text
                    style={styles.qrcodeAddressText}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                >
                    {route?.params?.item?.address}
                </Text>
            </View>
            <Text style={styles.warningText}>{strings.warning}:
                <Text style={styles.warningMessage}> {strings.receiveWarningMessage}</Text>
            </Text>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.close}
                    onPress={() => resetNavigation(RouteType.WALLETBALANCE)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    height={Responsive.size50}
                />
                <CommonButton
                    title={strings.share}
                    onPress={captureAndShare}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    height={Responsive.size50}
                />
            </View>
            </ScrollView>
        </View>
    );
};

export default ViewQr;
