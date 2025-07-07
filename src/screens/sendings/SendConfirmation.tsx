import CommonButton from "@components/CommonButton";
import Loader from "@components/Loader";
import useBtcClient from "@hooks/useBtcClient";
import useSeedVault from "@hooks/useSeedVault";
import useSelectedNetwork from "@hooks/useSelectedNetwork";
import { broadcastSignedTransaction, BtcTransactionBroadcastResponse, signTransaction, StacksTransaction } from "@orangecryptohq/orangeseed";
import { appReducerType } from "@redux/slice/appReducer";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { useMutation } from "@tanstack/react-query";
import { fetchPrice } from "@utils/cryptoUtils";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { gnerateDataForBtc, gnerateDataForSTX } from "./ConfirmTransactionUtils";
import { styles } from "./styles";

const SendConfirmation = ({ route }) => {
    const selectedNetwork = useSelectedNetwork();
    const { network, selectedAccount } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
    const transactionData = route?.params?.transactionData;
    const confirmData = route?.params?.confirmData;
    const [confirmationArray, setConfirmationArray] = useState([]);
    const availableRoutes = [
        "Edit Fees",
        "Edit Nonce",
    ];
   
    const { getSeed } = useSeedVault();
    const { btcClient } = useBtcClient();
    const {
        isPending: btcLoading,
        error: txBtcError,
        data: btcTxBroadcastData,
        mutate: mutateBtc,
    } = useMutation<BtcTransactionBroadcastResponse, Error, { txToBeBroadcasted: string }>({
        mutationFn: async ({ txToBeBroadcasted }) => btcClient.sendRawTransaction(txToBeBroadcasted)});

    const {
        isPending : stxLoading,
        error: txStxError,
        data: stxTxBroadcastData,
        mutate: mutateStx,
      } = useMutation<string, Error, { signedTx: StacksTransaction }>({
        mutationFn: async ({ signedTx }) => broadcastSignedTransaction(signedTx, selectedNetwork)});

    useEffect(() => {
        const fetchAndSetData = async () => {
            try {

                const rate = await fetchPrice(confirmData.transactionType);
                if (confirmData.transactionType === 'BTC') {
                    setConfirmationArray(await gnerateDataForBtc(transactionData, network.type, rate, confirmData));
                }
                if (confirmData.transactionType === 'STX') {
                    setConfirmationArray(await gnerateDataForSTX(transactionData, network.type, rate, confirmData));
                }
            } catch (error) {
                console.error("Error fetching price:", error);
            }
        };
        fetchAndSetData();
    }, []);

    const handleBtcTransaction = () => {
        mutateBtc(
            { txToBeBroadcasted: transactionData.signedTx },
            {
                onSuccess: (data) => push(RouteType.CONFIRMATION, { transactionId: data?.tx?.hash }),
                onError: console.error.bind(console, "Transaction Broadcast Failed:"),
            }
        );
    };
    
    const handleStxTransaction = async () => {
        try {
            const seed = await getSeed();
            const signedContractCall = await signTransaction(
                transactionData,
                seed,
                selectedAccount?.id ?? 0,
                selectedNetwork
            );
            
            mutateStx(
                { signedTx: signedContractCall },
                {
                    onSuccess: (data) => push(RouteType.CONFIRMATION, { transactionId: data }),
                    onError: console.error.bind(console, "Transaction Broadcast Failed:"),
                }
            );
        } catch (error) {
            console.log("Generate signed for STX", error);
        }
    };
    
    const confirmTransaction = async () => {
        if (confirmData.transactionType === "BTC") {
            handleBtcTransaction();
        } else if (confirmData.transactionType === "STX") {
            await handleStxTransaction();
        }
    };

    return (
        <View style={styles.container}>
            {btcLoading && <Loader loading={btcLoading} />}
            {stxLoading && <Loader loading={stxLoading} />}
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.sendConfirmation}</Text>
                <Text style={styles.description}>{strings.confirmationMessage}</Text>
                <FlatList
                    data={confirmationArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item}
                            onPress={() => {
                                if (availableRoutes.includes(item.name)) {
                                    push(item.name);
                                }
                                else {
                                    console.warn(`Route "${item.name}" is not available.`);
                                }
                            }}>
                            <Text style={styles.text}>{item.name}</Text>
                            <View style={styles.valueContainer}>
                                <Text style={styles.value}>{item.value}</Text>
                                {item.subvalue && <Text style={styles.subValue}>{item.subvalue}</Text>}
                            </View>
                        </TouchableOpacity>
                    )} />
            </View>
            <View style={styles.horizontalButtonContainer}>
                <CommonButton
                    title={strings.cancel}
                    onPress={() => goBack()}
                    backgroundColor={Color.black}
                    textColor={Color.white}
                    borderColor={Color.blackBorder}
                    width={'45%'}
                    height={Responsive.size50} />
                <CommonButton
                    title={strings.confirm}
                    onPress={() => confirmTransaction()}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'45%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};
export default SendConfirmation;