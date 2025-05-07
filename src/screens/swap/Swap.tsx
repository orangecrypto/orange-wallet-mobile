import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import SendingHeader from "@components/SendingHeader";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import { RouteType } from "@routes/RouteType";
import CustomTextInput from "@components/CustomTextInput";
import { walletReducerType } from "@redux/slice/WalletReducer";
import { filterVisibleTokens, getReceiveAmount } from "./SwapUtils";
import { useExchangeAmountValidation } from "@hooks/useExchangeAmountValidation";
import { useReceiveAssets } from "@hooks/useReceiveAssets";
import { appReducerType } from "@redux/slice/appReducer";
import { btcToSats } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";

const Swap = ({ route }) => {

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(route?.params?.tokenDetails);
    const [selectedReceiveAsset, setselectedReceiveAsset] = useState({});
    const [receiveAmount, setReceiveAmount] = useState('')
    const { tokenList } = useSelector((state: { walletReducer: walletReducerType }) => state.walletReducer);
    const { selectedAccount: { ordinalsAddress } = {}, network } = useSelector(
        (state: { appReducer: appReducerType }) => state.appReducer
    );
    const coinSettings = useSelector((state) => state.coinSettingsSlice.coinSettings);
    const visibleItems = filterVisibleTokens(tokenList, coinSettings);
    const {
        amount: exchangeAmount,
        setAmount: setExchangeAmount,
        isValid,
        fiatValue
    } = useExchangeAmountValidation(selectedCoin);

    const { assets: receiveAssets, loading, error } = useReceiveAssets();

    console.log('useReceiveAssets', receiveAssets)
    console.log('useExchangeAmountValidation', `isValid ${isValid}`)
    console.log('selectedReceiveAsset', `selectedReceiveAsset ${JSON.stringify(selectedReceiveAsset)}`)
    console.log('useExchangeAmountValidation', `fiatValue ${fiatValue}`)

    useEffect(() => {
        const handleKeyboardShow = () => setIsKeyboardVisible(true);
        const handleKeyboardHide = () => setIsKeyboardVisible(false);
        const showSubscription = Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
        const hideSubscription = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        if (selectedReceiveAsset?.name) {
            handleGetReceiveAmount(exchangeAmount);
        }
    }, [selectedReceiveAsset, exchangeAmount]);

    const handleGetReceiveAmount = async (exchangeAmount) => {
        try {
            const result = await getReceiveAmount({
                exchangeToken: selectedCoin?.ticker,
                receiveToken: selectedReceiveAsset?.name,
                exchangeAmount: exchangeAmount,
                address: ordinalsAddress,
            });

            console.log('getReceiveAmount result', result); // Should be a number string like "76.64"
            setReceiveAmount(result);
        } catch (e) {
            console.error("Failed to get receive amount", e);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SendingHeader
                    title={`${Number(selectedCoin.balance || 0)}`}
                    subtitle={`$${selectedCoin.tokenFiatRate}`}
                    ticker={selectedCoin.ticker}
                    type={selectedCoin.name !== "Bitcoin" ? selectedCoin.protocol === "stacks" ? "SIP-10" : selectedCoin.protocol : null}
                    iconSource={selectedCoin}
                    containerStyle={styles.sendingHeader} />

                <View style={styles.contentContainer}>
                    <View style={styles.topContainer}>
                        <Text numberOfLines={1} style={styles.title}>{`${strings.swap} `}</Text>
                        <View style={styles.sendIconBakcground}>
                            <Image style={styles.sendIcon} source={localAssets.swapIcon} tintColor={Color.orangeButton} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.description}>{strings.swapDescription}</Text>
                        <CustomTextInput
                            placeholder={'0'}
                            value={exchangeAmount}
                            onChangeText={(text) => { setExchangeAmount(text) }}
                            selectedDropdownValue={selectedCoin.ticker}
                            dropdownOptions={visibleItems}
                            keyboardType={'numeric'}
                            onDropdownSelect={(value) => {
                                setSelectedCoin(value)
                                setselectedReceiveAsset({})
                            }}
                            showPasswordToggle={false}
                            style={styles.input}
                            dropdownIcon={localAssets.dropdownarrow} />
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balanceText}>{`${strings.balance} : ${selectedCoin.balance}`}</Text>
                            <View style={styles.swapContainer}>
                                <Text style={styles.swapText}>
                                    {`$${fiatValue} USD`}
                                </Text>
                                <Image style={styles.swap} source={localAssets.swap} />

                            </View>
                        </View>
                    </View>

                    <View style={styles.swapIconBakcground}>
                        <Image style={styles.swapIcon} source={localAssets.swaparrows} />
                    </View>

                    <View style={[styles.inputContainer, { marginTop: Responsive.size20 }]}>
                        <Text style={styles.description}>{strings.swapSelectAsset}</Text>
                        <CustomTextInput
                            placeholder={'0'}
                            editable={false}
                            value={receiveAmount}
                            onChangeText={(text) => { setReceiveAmount(text) }}
                            selectedDropdownValue={selectedReceiveAsset?.ticker}
                            isDropDownClicable={!isValid}
                            dropdownOptions={receiveAssets}
                            keyboardType={'numeric'}
                            onDropdownSelect={setselectedReceiveAsset}
                            showPasswordToggle={false}
                            style={styles.input}
                            dropdownIcon={localAssets.dropdownarrow} />

                    </View>

                    {selectedReceiveAsset?.ticker === selectedCoin?.ticker && <View style={styles.errorContainer}>
                        <Image style={styles.errorIcon} source={localAssets.erroryellow} />
                        <Text style={styles.errorMessage}>{'Select Asset and Receive Asset can not be same'}</Text>
                    </View>
                    }
                </View>
            </ScrollView>
            {!isKeyboardVisible && (<View>

                <View style={styles.horizontalButtonContainer}>
                    <CommonButton
                        title={strings.cancel}
                        onPress={() => goBack()}
                        backgroundColor={Color.black}
                        textColor={Color.white}
                        borderColor={Color.blackBorder}
                        width={"45%"}
                        height={Responsive.size50} />
                    <CommonButton
                        title={strings.next}
                        onPress={() => {
                            push(RouteType.SWAPPROVIDERS, {
                                exchangeAmount: exchangeAmount,
                                exchangeToken: selectedCoin,
                                selectedReceiveAsset: selectedReceiveAsset,
                                receiveAmount : receiveAmount
                            })
                        }}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        width={"45%"}
                        disabled={
                            !isValid || !receiveAmount || receiveAmount === '0.00'
                        }
                        height={Responsive.size50} />
                </View>
            </View>)}
        </KeyboardAvoidingView>
    );
};
export default Swap;