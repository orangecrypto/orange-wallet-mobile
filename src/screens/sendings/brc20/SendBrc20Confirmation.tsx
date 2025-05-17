import CommonButton from "@components/CommonButton";
import Loader from "@components/Loader";
import useBrc20TransferFees from "@hooks/brc20/useBrc20TransferFees";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { fetchPrice } from "@utils/cryptoUtils";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../styles";
import ConfirmationItemBrc20 from "./ConfirmationItemBrc20";
import { gnerateDataForBrc20 } from "../ConfirmTransactionUtils";
import { getFeeValuesForBrc20OneStepTransfer } from "./Brc20Utils";

const SendBrc20Confirmation = ({ route }) => {
    const { network } = useSelector((state) => state.appReducer);
    const confirmData = route?.params?.confirmData;
    const [confirmationArray, setConfirmationArray] = useState([]);
    const availableRoutes = ["Edit Fees", "Edit Nonce"];
    const { commitValue, commitValueBreakdown, isLoading } = useBrc20TransferFees(confirmData?.estimateFeesParams);
    const { txFee, inscriptionFee, totalFee, transferUtxoValue } =
    getFeeValuesForBrc20OneStepTransfer(commitValueBreakdown ?? confirmData?.estimatedFees.valueBreakdown);
    
    useEffect(() => {
        const fetchAndSetData = async () => {
            const rate = await fetchPrice('BTC');
            if (confirmData.transactionType === "brc-20") {
                const confirmationArray = await gnerateDataForBrc20(network.type, rate, confirmData, txFee, inscriptionFee);
                setConfirmationArray(confirmationArray);
            }
        };
        fetchAndSetData();
    }, []);

    const confirmTransaction = async () => {
        if (confirmData.transactionType === "brc-20") {
            push(RouteType.CONFIRMBRC20, {
                estimateFeesParams: confirmData?.estimateFeesParams,
                recipientAddress: confirmData?.recipientAddress,
            });
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && <Loader loading={isLoading} />}
            <View style={styles.contentContainer}>
                <View style={styles.topContainerConfirmationScreen}>
                    <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                        <Text style={styles.buttonText}>{strings.back}</Text>
                    </TouchableOpacity>
                    <View style={styles.runeContainer}>
                        <Text style={styles.ordinalsText}>{confirmData.transactionType.toUpperCase()}</Text>
                    </View>
                </View>
                <Text style={styles.title}>{strings.sendConfirmation}</Text>
                <Text style={styles.description}>{strings.confirmationMessage}</Text>
                <FlatList
                    data={confirmationArray}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ConfirmationItemBrc20 item={item} availableRoutes={availableRoutes} type={confirmData.transactionType} />
                    )}/>
            </View>
            <View style={styles.horizontalButtonContainer}>
                <CommonButton
                    title={strings.cancel}
                    onPress={() => goBack()}
                    backgroundColor={Color.black}
                    textColor={Color.white}
                    borderColor={Color.blackBorder}
                    width={'45%'}
                    height={Responsive.size50}/>
                <CommonButton
                    title={strings.confirm}
                    onPress={confirmTransaction}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'45%'}
                    height={Responsive.size50}/>
            </View>
        </View>
    );
};
export default SendBrc20Confirmation;