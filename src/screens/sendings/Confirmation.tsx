import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useState, useEffect } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";

const Confirmation = ({ route }) => {

    const [progress, setProgress] = useState(false);
    const [progressWidth, setProgressWidth] = useState(0); 

    useEffect(() => {
        console.log('Confirmation', route?.params?.transactionData)
        const interval = setInterval(() => {
            setProgressWidth(prev => {
                if (prev < 100) {
                    return prev + 2; 
                } else {
                    clearInterval(interval); 
                    setProgress(true); 
                    return 100;
                }
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
          {!progress &&  <View style={styles.stepContainer}>
                <Text style={styles.stepText}>{strings.progress}</Text>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
                </View>
            </View>}
            <View style={styles.transactionProgressContainer}>
                <ImageBackground style={styles.transactionVectorBackground} source={localAssets.transactionvector}>
                    <Image source={progress ? localAssets.transactiondone : localAssets.transactionsending} style={progress ? styles.transactionVectorIconDone : styles.transactionVectorIcon} />
                </ImageBackground>

                <Text style={styles.transactionTitle}>{progress ? strings.transactionSend : strings.sendingTransaction}</Text>
                <Text style={styles.transactionDescription}>{progress ? strings.transactionSendMessage : strings.sendingTransactionMessage}</Text>
            </View>

           {progress && <View style={styles.transactionIdContainer}>
            <Text style={styles.transactionIdLabel} >{strings.transactionId}</Text>
            <Text style={styles.transactionIdValue}>{`${route?.params?.transactionId}`}</Text>
            </View>}
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.close}
                    onPress={() => resetNavigation(RouteType.WALLETBALANCE)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    disabled={!progress}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default Confirmation;
