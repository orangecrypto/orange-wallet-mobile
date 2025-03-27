import CommonButton from "@components/CommonButton";
import Loader from "@components/Loader";
import useBtcClient from "@hooks/useBtcClient";
import useSeedVault from "@hooks/useSeedVault";
import { BtcTransactionBroadcastResponse } from "@orangecryptohq/orangeseed";
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
import ConfirmationItem from "./ConfirmationItem";
import { gnerateDataForBtc, gnerateDataForOrdinals } from "./ConfirmTransactionUtils";
import { styles } from "./styles";

const SendConfirmOrdinlas = ({ route }) => {
   
    const { network} = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
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
        mutationFn: async ({ txToBeBroadcasted }) => btcClient.sendRawTransaction(txToBeBroadcasted)
    });

     useEffect(() => {
        const fetchAndSetData = async () => {
            try {

                const rate = await fetchPrice(confirmData.transactionType);
                setConfirmationArray(await gnerateDataForOrdinals(transactionData, network.type, rate, confirmData));
               
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

    const confirmTransaction = async () => {
        if (confirmData.transactionType === strings.ordinals) {
            handleBtcTransaction();
        } 
    };

    return (
        <View style={styles.container}>
            {btcLoading && <Loader loading={btcLoading} />}
            <View style={styles.contentContainer}>
                <View style={styles.topContainerConfirmationScreen}>
                    <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                        <Text style={styles.buttonText}>{strings.back}</Text>
                    </TouchableOpacity>
                    {confirmData.transactionType === 'runes' && <View style={styles.runeContainer}>
                        <Text style={styles.ordinalsText}>{confirmData.transactionType.toUpperCase()}</Text>
                    </View>}

                </View>
                <Text style={styles.title}>{strings.sendConfirmation}</Text>
                <Text style={styles.description}>{strings.confirmationMessage}</Text>
                <FlatList
                    data={confirmationArray}
                    keyExtractor={(index) => index}
                    renderItem={({ item }) => (
                        <ConfirmationItem item={item} availableRoutes={availableRoutes} type={confirmData.transactionType} />
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
export default SendConfirmOrdinlas;