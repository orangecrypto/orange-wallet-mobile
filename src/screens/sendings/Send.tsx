import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import Loader from "@components/Loader";
import SendingHeader from "@components/SendingHeader";
import useAddressValidation from "@hooks/useAddressValidation";
import useBtcClient from "@hooks/useBtcClient";
import useGenerateSignedBtcTransaction from "@hooks/useGenerateSignedBtcTransaction";
import useSendValidation from "@hooks/useSendValidation";
import useTransactionContext from "@hooks/useTransactionContext";
import useUnsignedStxTransaction from "@hooks/useUnsignedStxTransaction";
import { btcTransaction } from "@orangecryptohq/orangeseed";
import Clipboard from "@react-native-clipboard/clipboard";
import { appReducerType } from "@redux/slice/appReducer";
import { walletReducerType } from "@redux/slice/WalletReducer";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { estimateBrc20TransferFees } from "./brc20/Brc20Utils";
import { generateTransactionAndSummary } from "./RuneUtils";
import { styles } from "./styles";

const Send = ({ route }) => {

    const { selectedAccount, network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const { tokenList } = useSelector((state: { walletReducer: walletReducerType }) => state.walletReducer);
    const coinSettings = useSelector((state) => state.coinSettingsSlice.coinSettings);
    const namesToAlwaysShow = ["Bitcoin", "Orange", "Stacks"];
    const visibleItems = [];
    const seenNames = new Set();
    
    tokenList.forEach(item => {
        if (seenNames.has(item.name)) {
            return; // Skip duplicates
        }
        const coinSetting = coinSettings.find(setting => setting.name === item.name);
        
        if (namesToAlwaysShow.includes(item.name) || (coinSetting ? coinSetting.visible : true)) {
            visibleItems.push(item);
            seenNames.add(item.name); // Track unique names
        }
    });
    const [selectedCoin, setSelectedCoin] = useState(route?.params?.tokenDetails);
    const [walletAddress, setWalletAddress] = useState("");
    const [isRuneLoading, setisRuneLoading] = useState(false);
    const { isValidAddress, errorMessage } = useAddressValidation(walletAddress, selectedCoin);
    const {
        amount,
        sendFiatRate,
        invalidFund,
        invalidFundMessage,
        onAmountChange,
        setAmount,
    } = useSendValidation(selectedCoin);

    const { isPending, generateSignedTransaction: generateSignedTransactionBtc, transactionData, transactionError } = useGenerateSignedBtcTransaction();
    const { isPending: stxIsPending, generateUnsignedTransaction, transactionData: stxTransactionData, transactionError: stxTransactionDataError } = useUnsignedStxTransaction();
    const transactionContext: btcTransaction.TransactionContext = useTransactionContext()
    const { btcClient } = useBtcClient();
    useEffect(() => {
        const handleTransaction = (transactionData, transactionError, type) => {
            if (transactionData) {
                push(RouteType.SENDCONFIRMATION, {
                    transactionData,
                    confirmData: {
                        transactionType: type,
                        recipientAddress: walletAddress,
                        sendAmount: amount,
                    }
                });
            }
            if (transactionError) {
                console.log(`${type} Transaction Error:`, transactionError);
            }
        };

        handleTransaction(transactionData, transactionError, "BTC");
        handleTransaction(stxTransactionData, stxTransactionDataError, "STX");

    }, [transactionData, transactionError, stxTransactionData, stxTransactionDataError]);

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

    const handleRuneTransaction = async (TransactionSummary) => {

        console.log('handleRuneTransaction', TransactionSummary)
        if (TransactionSummary) {
            push(RouteType.SENDCONFIRMATION, {
                transactionData: TransactionSummary,
                confirmData: {
                    transactionType: 'runes',
                    recipientAddress: walletAddress,
                    sendAmount: amount,
                    ticker: selectedCoin.ticker
                }
            });
        }
    }

    const getSignedTransaction = async () => {
        if (selectedCoin.protocol === 'btc') {
            generateSignedTransactionBtc(walletAddress, amount);
        } else if (selectedCoin.protocol === 'stacks') {
            generateUnsignedTransaction({
                associatedAddress: walletAddress,
                amount,
                memo: " ",
            });
        } else if (selectedCoin.protocol === 'runes') {
            setisRuneLoading(true)
            await handleRuneTransaction(await generateTransactionAndSummary(amount, selectedCoin, walletAddress, transactionContext, network))
            setisRuneLoading(false)
        } else if (selectedCoin.protocol === 'brc-20') {
            handeBRC20Transfer()
        }
    };

    const handeBRC20Transfer = async () => {
        setisRuneLoading(true)
        try {
            const { estimateFeesParams, estimatedFees } = await estimateBrc20TransferFees(selectedAccount, btcClient, network, selectedCoin.ticker, amount);
            console.log('handeBRC20Transfer estimateFeesParams', estimateFeesParams);
            setisRuneLoading(false)
            push(RouteType.SENDCONFIRMBRC20, {
                //transactionData: TransactionSummary,
                confirmData: {
                    transactionType: 'brc-20',
                    recipientAddress: walletAddress,
                    sendAmount: amount,
                    token: selectedCoin,
                    estimateFeesParams: estimateFeesParams,
                    estimatedFees: estimatedFees
                }
            });
        } catch (error) {
            setisRuneLoading(false)
            console.log('handleBRC20Transfer error', error);
            Toast.show({ type: 'error', text1: error?.message || 'Something went wrong.' });
            throw error;
        }
    }

    const handlePaste = async () => {
        setWalletAddress(await Clipboard.getString())
    };

    const handleButtonDisable = () => !(amount > 0 && walletAddress && isValidAddress && !invalidFund);
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {isPending && <Loader loading={isPending} />}
            {stxIsPending && <Loader loading={stxIsPending} />}
            {isRuneLoading && <Loader loading={isRuneLoading} />}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SendingHeader
                    title={`${Number(selectedCoin.balance || 0)}`}
                    subtitle={`$${selectedCoin.tokenFiatRate}`}
                    ticker={selectedCoin.ticker}
                    type={selectedCoin.name !== "Bitcoin" ? selectedCoin.protocol === "stacks" ? "SIP-10" : selectedCoin.protocol.toUpperCase() : null}
                    iconSource={selectedCoin}
                    containerStyle={styles.sendingHeader} />

                <View style={styles.contentContainer}>
                    <View style={styles.topContainer}>
                        <Text numberOfLines={1} style={styles.title}>{`${strings.send} ${selectedCoin.protocol.toLocaleUpperCase()}`}</Text>
                        <View style={styles.sendIconBakcground}>
                            <Image style={styles.sendIcon} source={localAssets.send} tintColor={Color.orangeButton} />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.description}>{strings.enterAmount}</Text>
                        <CustomTextInput
                            placeholder={strings.enterAmount}
                            value={amount}
                            onChangeText={onAmountChange}
                            dropdownOptions={visibleItems}
                            keyboardType={"numeric"}
                            selectedDropdownValue={selectedCoin.ticker}
                            onDropdownSelect={setSelectedCoin}
                            showPasswordToggle={false}
                            style={styles.input}
                            dropdownIcon={localAssets.dropdownarrow}
                        />
                        <View style={styles.errorContainer}>
                            {invalidFund && <Text style={styles.errorMessage}>{invalidFundMessage}</Text>}
                            {!invalidFund && <Text style={styles.balanceText}>{`$${(sendFiatRate * amount).toFixed(2)} USD`}</Text>}
                            <TouchableOpacity onPress={() => setAmount(selectedCoin.balance)}>
                                <Text style={[styles.rightText, styles.pasteText]}>Max</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.inputContainer, { marginTop: Responsive.size20 }]}>
                        <Text style={styles.description}>{strings.enterwalletAddress}</Text>
                        <CustomTextInput
                            placeholder={strings.enterBitcoinAddress}
                            value={walletAddress}
                            onChangeText={setWalletAddress}
                            rightText={strings.paste}
                            style={styles.input}
                            keyboardType={"default"}
                            rightTextStyle={styles.pasteText}
                            onRightTextPress={() => handlePaste()} />
                        {!isValidAddress && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorMessage}>{errorMessage}</Text>
                            </View>
                        )}
                    </View>

                </View>
            </ScrollView>
            {!isKeyboardVisible &&(<View>
                <Text style={styles.warningText}>
                    {strings.warning}: <Text style={styles.warningMessage}>{strings.warningMessage}</Text>
                </Text>
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
                        onPress={() => getSignedTransaction()}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        width={"45%"}
                        disabled={handleButtonDisable()}
                        height={Responsive.size50} />
                </View>
            </View>)}
        </KeyboardAvoidingView>
    );
};
export default Send;