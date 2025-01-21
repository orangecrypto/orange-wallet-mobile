import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { orangeButton, white } from "@values/color";
import { styles } from "./styles";
import CommonButton from "@components/CommonButton";
import { Responsive } from "@utils/Responsive";
import { ASSETDETAILS, HOME_SCREEN } from "@routes/RouteType";
import Switch from "@components/Switch";

const ResetWallet = () => {
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

    const handleToggle = () => {
        setIsSwitchEnabled((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.resetWallet}</Text>
                <Text style={styles.description}>{strings.resetWalletMessage}</Text>

            </View>
            <View style={styles.switchContainer}>
            <Switch
                isEnable={isSwitchEnabled}
                height={Responsive.size35}
                width={Responsive.size70}
                onToggle={handleToggle}/>
                </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.RESETWALLET}
                    onPress={() => resetNavigation(HOME_SCREEN)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    disabled={!isSwitchEnabled}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default ResetWallet;
