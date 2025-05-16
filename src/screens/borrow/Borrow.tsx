import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import Loader from "@components/Loader";
import SendingHeader from "@components/SendingHeader";
import { useLiquidiumOffers } from "@hooks/borrow/useLiquidiumOffers";
import { useRunesCollateral } from "@hooks/borrow/useRunesCollateral";
import { setRuneDivisiblity } from "@redux/slice/BorrowReducer";
import { useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { debounce } from "./authentication/GenerateToken";
import { validateAmountWithRanges } from "./BorrowUtils";
import { styles } from "./styles";

const Borrow = ({ route }) => {

    const hasMounted = useRef(false); // Tracks first render
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(route?.params?.tokenDetails);
    const [selectedCollateral, setSelectedCollateral] = useState();
    const [rangeError, setRangeError] = useState('');
    const [isValidRange, setIsValidRange] = useState(false);
    const [amount, setAmount] = useState('')
    const { data: runeList, isLoading: loadingCollateralRunes, isError, error: runeError } = useRunesCollateral();
    const { data: runOffer, getOffer: getRuneOffer, isLoading: isRuneLoading, error: OfferError } = useLiquidiumOffers()
    const dispatch: Dispatch = useAppDispatch();
    const [runeOffers, setRuneOffers] = useState();
    
    const debouncedHandleAmountChange = useCallback(
        debounce(async (value: string, rune_id: string) => {
            try {
                if (!value) return
                const getOffer = await getRuneOffer({
                    runeId: rune_id,
                    runeAmount: Number(value)
                })
                setRuneOffers(getOffer)
                const result = validateAmountWithRanges(getOffer?.runeDetails?.valid_ranges?.rune_amount?.ranges, value)
                dispatch(setRuneDivisiblity(getOffer?.runeDetails?.common_offer_data?.rune_divisibility))
                if (result === true) {
                    setIsValidRange(true)
                    setRangeError('')
                } else {
                    setIsValidRange(false)
                    setRangeError(result)
                    console.warn(result)
                }
            } catch (error) {
                setRangeError('Failed to fetch offers or validate amount. Please try again later.')
                setIsValidRange(false)
            }
        }, 1000),[])

    useEffect(() => {
        if (hasMounted.current) {
            debouncedHandleAmountChange(amount, selectedCollateral?.rune_id);
        } else {
            hasMounted.current = true;
        }
        console.log('selectedCollateral', selectedCollateral)
    }, [amount, debouncedHandleAmountChange, selectedCollateral]);

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

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {loadingCollateralRunes && <Loader loading={loadingCollateralRunes} />}
            {isRuneLoading && <Loader loading={isRuneLoading} />}
            <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
                <SendingHeader
                    title={`${Number(selectedCoin.balance || 0)}`}
                    subtitle={`$${selectedCoin.tokenFiatRate}`}
                    ticker={selectedCoin.ticker}
                    type={selectedCoin.name !== "Bitcoin" ? selectedCoin.protocol === "stacks" ? "SIP-10" : selectedCoin.protocol : null}
                    iconSource={selectedCoin}
                    containerStyle={styles.sendingHeader} />

                <View style={styles.contentContainer}>
                    <View style={styles.topContainer}>
                        <Text numberOfLines={1} style={styles.title}>{`${strings.borrow} `}</Text>
                        <View style={styles.sendIconBakcground}>
                            <Image style={styles.sendIcon} source={localAssets.borrow} tintColor={Color.orangeButton} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.description}>{strings.offerRune}</Text>
                        <CustomTextInput
                            placeholder={'Please select'}
                            value={selectedCollateral?.name}
                            editable={false}
                            onChangeText={(text) => { console.log(text) }}
                            dropdownOptions={runeList}
                            keyboardType={'default'}
                            onDropdownSelect={setSelectedCollateral}
                            showPasswordToggle={false}
                            style={styles.input}
                            dropdownIcon={localAssets.dropdownarrow} />
                    </View>
                    <View style={[styles.inputContainer, { marginTop: Responsive.size20 }]}>
                        <Text style={styles.description}>{strings.amount}</Text>
                        <CustomTextInput
                            placeholder={strings.amount}
                            value={amount}
                            editable={!!selectedCollateral?.name}
                            onChangeText={setAmount} // Immediate update
                            style={styles.input}
                            keyboardType={"numeric"} />

                        <View style={styles.balanceContainer}>
                            <Text style={styles.balanceText}>{'Balance: 0'}</Text>
                            <View style={styles.swapContainer}>
                                <Text style={styles.swapText}>
                                    {`$${'0'} USD`}
                                </Text>
                                <Image style={styles.swapIcon} source={localAssets.swap} />
                            </View>
                        </View>
                        {rangeError && (
                            <View style={styles.errorContainer}>
                                <Image style={styles.errorIcon} source={localAssets.erroryellow} />
                                <Text style={styles.errorMessage}>{rangeError}</Text>
                            </View>)}
                    </View>
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
                            push(RouteType.BORROWOFFERS, {
                                offers: runeOffers?.runeDetails?.offers ?? []
                            });
                        }}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        width={"45%"}
                        disabled={!isValidRange}
                        height={Responsive.size50} />
                </View>
            </View>)}
        </KeyboardAvoidingView>
    );
};
export default Borrow;