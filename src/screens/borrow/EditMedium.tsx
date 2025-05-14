import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import { setMedium } from "@redux/slice/BorrowReducer";
import { useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const EditMedium = () => {
    const dispatch: Dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleKeyboardShow = useCallback(() => setIsKeyboardVisible(true), []);
    const handleKeyboardHide = useCallback(() => setIsKeyboardVisible(false), []);

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const hideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, [handleKeyboardShow, handleKeyboardHide]);

    const handleInputChange = (text: string) => {
        const parsed = parseFloat(text);

        if (!text || isNaN(parsed)) {
            setValue('');
            setIsError(false);
            setIsButtonDisabled(true);
            return;
        }

        if (parsed > 0) {
            setValue(text);
            setIsError(false);
            setIsButtonDisabled(false);
        } else {
            setIsError(true);
            setErrorMessage(strings.invalidMedium);
            setIsButtonDisabled(true);
        }
    };

    const handleSaveSlippage = () => {
        dispatch(setMedium(value));
        goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={[styles.button, { marginTop: Responsive.size50 }]} onPress={goBack}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>

                <Text style={[styles.title, { marginTop: Responsive.size40 }]}>{strings.editMedium}</Text>
                <View style={[styles.inputContainer, { marginTop: Responsive.size50 }]}>
                    <CustomTextInput
                        placeholder="0"
                        value={value}
                        onChangeText={handleInputChange}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                </View>

                {isError && (
                    <View style={styles.errorContainer}>
                        <Image style={styles.errorIcon} source={localAssets.erroryellow} />
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    </View>
                )}
            </View>

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <CommonButton
                        title={strings.apply}
                        onPress={handleSaveSlippage}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        width="100%"
                        height={Responsive.size50}
                        disabled={isButtonDisabled}
                    />
                </View>
            )}
        </View>
    );
};

export default EditMedium;
