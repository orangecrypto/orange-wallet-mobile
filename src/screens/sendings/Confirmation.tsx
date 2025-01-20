import CommonButton from "@components/CommonButton";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { SENDCONFIRMATION, WALLETBALANCE } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { orangeButton, white } from "@values/color";
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

const Confirmation = () => {
  
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
               
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
