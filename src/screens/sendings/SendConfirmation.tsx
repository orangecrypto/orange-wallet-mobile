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
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import ConfirmationItem from "./ConfirmationItem";
import { gnerateDataForBtc, gnerateDataForRunes, gnerateDataForSTX } from "./ConfirmTransactionUtils";
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
        mutate: mutateBtc,
    } = useMutation<BtcTransactionBroadcastResponse, Error, { txToBeBroadcasted: string }>({
        mutationFn: async ({ txToBeBroadcasted }) => btcClient.sendRawTransaction(txToBeBroadcasted)
    });

    const {
        isPending: stxLoading,
        mutate: mutateStx,
    } = useMutation<string, Error, { signedTx: StacksTransaction }>({
        mutationFn: async ({ signedTx }) => broadcastSignedTransaction(signedTx, selectedNetwork)
    });

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
                if (confirmData.transactionType === 'runes') {
                    const confirmationArray = await gnerateDataForRunes(transactionData, network.type, rate, confirmData);
                    console.log('setConfirmationArray', confirmationArray)
                    setConfirmationArray(confirmationArray)
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

        console.log('handleStxTransaction', 'call')
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
                    onError: (error) => {
                        Toast.show({ type: 'error', text1: error.message });
                    },
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
        else if (confirmData.transactionType === "runes") {
            try {
                const transactionId = await transactionData.transaction.broadcast({
                    rbfEnabled: true
                })
                push(RouteType.CONFIRMATION, { transactionId: transactionId })
            } catch (error) {
                console.log('transaction.broadcast', error)
                Toast.show({ type: 'error', text1: error.message });
            }
        }       
    };
    
    return (
        <View style={styles.container}>
            {btcLoading && <Loader loading={btcLoading} />}
            {stxLoading && <Loader loading={stxLoading} />}
            <View style={styles.contentContainer}>
                <View style={styles.topContainerConfirmationScreen}>
                    <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                        <Text style={styles.buttonText}>{strings.back}</Text>
                    </TouchableOpacity>
                    {(confirmData.transactionType === 'runes' || confirmData.transactionType === 'brc-20') && (
                        <View style={styles.runeContainer}>
                            <Text style={styles.ordinalsText}>{confirmData.transactionType.toUpperCase()}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.title}>{strings.sendConfirmation}</Text>
                <Text style={styles.description}>{strings.confirmationMessage}</Text>
                <FlatList
                    data={confirmationArray}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => 
                            <ConfirmationItem item={item} availableRoutes={availableRoutes} type={confirmData.transactionType} />
                       }/>
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