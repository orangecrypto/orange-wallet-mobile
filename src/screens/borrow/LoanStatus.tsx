import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";

const LoanStatus = ({ route }) => {

    return (
        <View style={styles.container}>
            <View style={styles.transactionProgressContainer}>
                <ImageBackground style={styles.transactionVectorBackground} source={localAssets.transactionvector}>
                    <Image source={localAssets.transactiondone } style={ styles.transactionVectorIconDone} />
                </ImageBackground>

                <Text style={styles.transactionTitle}>{strings.loanStarted }</Text>
                <Text style={styles.transactionDescription}>{ strings.loanStartedMessage }</Text>
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.viewLoan}
                    onPress={() => resetNavigation(RouteType.WALLETBALANCE)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default LoanStatus;
