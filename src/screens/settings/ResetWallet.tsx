import CommonButton from "@components/CommonButton";
import Switch from "@components/Switch";
import { goBack, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Dispatch } from "@reduxjs/toolkit";
import { clearStoreData, useAppDispatch } from "../../redux/store";
import { clearCoinSettings } from "@screens/addcoin/CoinSettings";

const ResetWallet = () => {
    const dispatch: Dispatch = useAppDispatch();
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

    const handleToggle = () => {
        setIsSwitchEnabled((prev) => !prev);
    };

    const handleResetWallet = () => {
        clearStoreData()
        resetNavigation(RouteType.HOME_SCREEN)
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
                    onPress={() =>handleResetWallet() }
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    disabled={!isSwitchEnabled}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default ResetWallet;
