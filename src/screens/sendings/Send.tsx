import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import Loader from "@components/Loader";
import SendingHeader from "@components/SendingHeader";
import useAddressValidation from "@hooks/useAddressValidation";
import useGenerateSignedBtcTransaction from "@hooks/useGenerateSignedBtcTransaction";
import useSendValidation from "@hooks/useSendValidation";
import useUnsignedStxTransaction from "@hooks/useUnsignedStxTransaction";
import Clipboard from "@react-native-clipboard/clipboard";
import { walletReducerType } from "@redux/slice/WalletReducer";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useCallback, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import { generateTransaction } from "./RuneUtils";
import { btcTransaction, getBtcFeeRate } from "@orangecryptohq/orangeseed";
import { appReducerType } from "@redux/slice/appReducer";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import useTransactionContext from "@hooks/useTransactionContext";
import { getFtBalance } from "@utils/cryptoUtils";

const Send = ({ route }) => {

    const { network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);

    const { tokenList } = useSelector((state: { walletReducer: walletReducerType }) => state.walletReducer);
    const [selectedCoin, setSelectedCoin] = useState(route?.params?.tokenDetails);
    const [walletAddress, setWalletAddress] = useState("");
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
            console.log('generateTransactionAndSummary', await generateTransactionAndSummary())
        }


    };
    const generateTransactionAndSummary = useCallback(

        async (feeRateOverride?: number) => {
            const balance = BigNumber(getFtBalance(selectedCoin));
            const decimalsToBase = BigNumber(10 ** (selectedCoin.decimals || 0));
            console.log('decimalsToBase', decimalsToBase)
            // get real balance after accounting for rune divisibility
            const realBalance = balance.multipliedBy(selectedCoin.decimals);
            const realAmountToSend = BigNumber(amount || 0).multipliedBy(decimalsToBase);


            const feeRate= (await getBtcFeeRate(network.type)).regular
            // if (realBalance.isLessThan(realAmountToSend)) {
            //     // setAmountError(t('SEND.ERRORS.INSUFFICIENT_BALANCE'));

            //     console.log('SEND.ERRORS.INSUFFICIENT_BALANCE')
            // } else {
            //     // setAmountError('');
            //     console.log(' ')
            // }


            

            console.log("feeRate value:", feeRate);
            return generateTransaction(
                transactionContext,
                selectedCoin.name,
                walletAddress,
                BigInt(realAmountToSend.toFixed()),
                feeRateOverride !== undefined ? feeRateOverride : feeRate
            );
        },
        [amount, selectedCoin, walletAddress, transactionContext],
    );



    const handlePaste = async () => {
        setWalletAddress(await Clipboard.getString())
    };

    const handleButtonDisable = () => !(amount > 0 && walletAddress && isValidAddress && !invalidFund);
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            {isPending && <Loader loading={isPending} />}
            {stxIsPending && <Loader loading={stxIsPending} />}
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
                            dropdownOptions={tokenList}
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
            <View>
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
            </View>
        </KeyboardAvoidingView>
    );
};
export default Send;