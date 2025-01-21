import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { SENDCONFIRMATION } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { black, blackBorder, orangeButton, white } from "@values/color";
import React, { useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { localAssets } from "@assets/assets";
import CustomTextInput from "@components/CustomTextInput";

const Send = () => {

    const [textValue, setTextValue] = useState('');
    const [value, setValue] = useState('');
    const [selectedCoin, setSelectedCoin] = useState('BTC');

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // Dropdown options
    const coinOptions = [
        { label: 'Bitcoin', value: 'BTC', symbol: 'BTC' },
        { label: 'Stacks', value: 'sBTC', symbol: 'BTC' },
        { label: 'Orange', value: 'ORNJ', symbol: '$ORNJ' },
        { label: 'Bridged USDT', value: 'sUSDT', symbol: 'sUSDT' },
        { label: 'Wrapped Bitcoin', value: 'xBTC', symbol: 'xBTC' },
        { label: 'Wrapped USDC', value: 'xUSD', symbol: 'xUSD' },
    ];

    return (
       <KeyboardAvoidingView
                  style={styles.container}
                  behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                  <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.sendingHeader}>
                <View>
                    <View style={styles.headerTopTextView}>
                        <Text style={styles.headerTitle}>0.02832</Text>
                        <View style={styles.tokenContainer}>
                            <Text style={styles.categoryTextBackground}>ORNJ</Text>
                            <Text style={styles.categoryTextBackground}>BRC-20</Text>
                        </View>
                    </View>
                    <Text style={[styles.headerTitle, { fontSize: Responsive.size14 }]}>0.02832</Text>
                </View>
                <Image source={localAssets.assetbitcoin} style={styles.headerIcon} />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{strings.send}</Text>
                    <View style={styles.sendIconBakcground}>
                        <Image style={styles.sendIcon} source={localAssets.send} tintColor={orangeButton} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.description}>{strings.enterAmount}</Text>

                    <CustomTextInput
                        placeholder={strings.enterAmount}
                        value={textValue}
                        onChangeText={setTextValue}
                        dropdownOptions={coinOptions}
                        keyboardType={'numeric'}
                        selectedDropdownValue={selectedCoin}
                        onDropdownSelect={setSelectedCoin}
                        showPasswordToggle={false}
                        style={styles.input}
                        dropdownIcon={localAssets.dropdownarrow} />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorMessage}>{strings.insufficientfunds}</Text>
                        <Text style={styles.balanceText} >$14.21 USD</Text>
                    </View>
                </View>

                <View style={[styles.inputContainer, { marginTop: Responsive.size50 }]}>
                    <Text style={styles.description}>{strings.enterwalletAddress}</Text>
                    <CustomTextInput
                        placeholder={strings.enterBitcoinAddress}
                        value={value}
                        onChangeText={setValue}
                        rightText={strings.paste}
                        style={[styles.input, {}]}
                        keyboardType={'numeric'}
                        rightTextStyle={styles.pasteText}
                        onRightTextPress={() => console.log('Text clicked')} />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorMessage}>{strings.invalidAddress}</Text>
                    </View>
                </View>
            </View>
            </ScrollView>
            {!isKeyboardVisible && (<View>  <Text style={styles.warningText}>{strings.warning}:
                <Text style={styles.warningMessage}> {strings.warningMessage}</Text>
            </Text>

                <View style={styles.horizontalButtonContainer}>
                    <CommonButton
                        title={strings.cancel}
                        onPress={() => goBack()}
                        backgroundColor={black}
                        textColor={white}
                        borderColor={blackBorder}
                        width={'45%'}
                        height={Responsive.size50} />

                    <CommonButton
                        title={strings.next}
                        onPress={() => push(SENDCONFIRMATION)}
                        backgroundColor={orangeButton}
                        textColor={white}
                        width={'45%'}
                        height={Responsive.size50} />
                </View> </View>)}

        </KeyboardAvoidingView>
    );
};

export default Send;
