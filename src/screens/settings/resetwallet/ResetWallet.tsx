import CommonButton from "@components/CommonButton";
import Switch from "@components/Switch";
import { clearStoreData, useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

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
                    height={Responsive.size30}
                    width={Responsive.size60}
                    onToggle={handleToggle} />

                <Text numberOfLines={1} style={styles.switchText}>{strings.iUnderstand}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.RESETWALLET}
                    onPress={() => push(RouteType.RESETWALLETPASSWORD)}
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
