import CommonButton from "@components/CommonButton";
import Switch from "@components/Switch";
import useSeedVault from "@hooks/useSeedVault";
import { clearAppReducer } from "@redux/slice/appReducer";
import { useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ForgotPassword = () => {
    const { clearVaultStorage } = useSeedVault()
    const dispatch: Dispatch = useAppDispatch()
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

    const handleToggle = () => {
        setIsSwitchEnabled((prev) => !prev);
    };

    const resetWallet = async () => {
        try {
            await clearVaultStorage()
            dispatch(clearAppReducer())
            resetNavigation(RouteType.HOME_SCREEN)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.forgotPasswordTitle}</Text>
                <Text style={styles.description}>{strings.forgotPasswordDescription}</Text>

            </View>
            <View style={styles.switchContainer}>
                <Switch
                    isEnable={isSwitchEnabled}
                    height={Responsive.size35}
                    width={Responsive.size70}
                    onToggle={handleToggle} />
            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.RESETWALLET}
                    onPress={() => resetWallet()}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    disabled={!isSwitchEnabled}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: Responsive.size18,
    },
    button: {
        backgroundColor: Color.backgroundbg,
        width: Responsive.size70,
        justifyContent: "center",
        alignItems: "center",
        padding: Responsive.size10,
        borderRadius: Responsive.size8,
        marginTop: Responsive.size50,
    },
    buttonText: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
    },
    title: {
        color: Color.orangeButton,
        fontSize: Responsive.size24,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    description: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size20,
        marginTop: Responsive.size10
    },
    switchContainer: {
        justifyContent: 'flex-end',
        padding: Responsive.size18
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
        padding: Responsive.size18
    },
});
export default ForgotPassword;
