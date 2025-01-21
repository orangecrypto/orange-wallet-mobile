import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { resetNavigation } from "@routes/Navigator";
import { WALLETBALANCE } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { orangeButton, white } from "@values/color";
import React, { useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";

const Confirmation = () => {

    const [progress, setProgress] = useState(false)

    setTimeout(() => {
        setProgress(true)
    }, 2000);

    return (
        <View style={styles.container}>
            <View style={styles.transactionProgressContainer}>
                <ImageBackground style={styles.transactionVectorBackground} source={localAssets.transactionvector}>
                    <Image source={progress ? localAssets.transactiondone : localAssets.transactionsending} style={progress ? styles.transactionVectorIconDone : styles.transactionVectorIcon} />
                </ImageBackground>

                <Text style={styles.transactionTitle}>{progress ? strings.transactionSend : strings.sendingTransaction}</Text>
                <Text style={styles.transactionDescription}>{progress ? strings.transactionSendMessage : strings.sendingTransactionMessage}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.close}
                    onPress={() => resetNavigation(WALLETBALANCE)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    width={'100%'}
                    height={Responsive.size45} />
            </View>
        </View>
    );
};

export default Confirmation;
