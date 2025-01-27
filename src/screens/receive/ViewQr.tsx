import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { goBack, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const ViewQr = () => {

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { lineHeight: Responsive.size40 }]}>{'Recieve Ordinal and BRC20'}</Text>
                <Image style={styles.qrcodeContainer} source={localAssets.qrcodesample} />
                <Text style={styles.qrcodeAddressText}>{'1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71'}</Text>
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
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default ViewQr;
