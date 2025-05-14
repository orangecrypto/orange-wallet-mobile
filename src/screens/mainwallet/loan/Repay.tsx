import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { goBack, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { fetchRuneCollateral, getFiateValue } from "./LoanUtils";
import { styles } from "./styles";
import { formatDueDate } from "@screens/borrow/BorrowUtils";
import { getBtcFeeRate, satsToBtc } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { usePrepareRepayment } from "@hooks/borrow/usePrepareRepayment";
import { useSubmitRepayment } from "@hooks/borrow/useSubmitRepayment";
import Loader from "@components/Loader";

const Repay = ({ route }) => {
    const [runeName, setRuneName] = useState<string>('');
    const [repayData, setRepayData] = useState({});
    const { liquidiumToken, network } = useSelector((state: any) => state.appReducer);
    const [networkFeeRate, setnetworkFeeRate] = useState<number>(0);
    const [fiatValue, setFiatValue] = useState<string>('');
    const { prepareRepaymentAsync, isPending: loadingPreparePayment, error: prepareError } = usePrepareRepayment();
    const { submitRepaymentAsync, isPending: loadingSubmitPayment, error: submitError } = useSubmitRepayment();

    console.log('Repay', `route ${JSON.stringify(route?.params?.loanDetails)}`)

    useEffect(() => {
        const fetchValue = async () => {
            const runeDetails = await fetchRuneCollateral(route?.params?.loanDetails?.collateral_details?.rune_id, liquidiumToken)
            setRuneName(runeDetails?.slug)
            setRepayData(route?.params?.loanDetails)
            setnetworkFeeRate((await getBtcFeeRate(network?.type)).priority)
            const value = await getFiateValue(route?.params?.loanDetails?.loan_details?.principal_amount_sats);
            setFiatValue(value);
        };
        fetchValue();
    }, [route?.params?.loanDetails]);

    const handRepayment = async () => {
        console.log('handRepayment', 'call')
        try {
            const result = await prepareRepaymentAsync({
                offerId: repayData?.id,
                feeRate: networkFeeRate,
            });
            try {
                const response = await submitRepaymentAsync({
                    offerId: result.offer_id,
                    signedPsbtBase64: result.base64_psbt,
                });
                console.log('Repayment Transaction ID:', response.repayment_transaction_id);
                resetNavigation(RouteType.WALLETBALANCE)
            } catch (err) {
                console.error('Repayment Submit Error:', err);
            }
        } catch (err) {
            console.error('Repayment error:', err);
        }
        // resetNavigation(RouteType.WALLETBALANCE)
    }

    return (
        <View style={styles.container}>
              {loadingPreparePayment && <Loader loading={loadingPreparePayment} />}
            {loadingSubmitPayment && <Loader loading={loadingSubmitPayment} />}
            <View style={styles.contentContainerRepay}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <View style={styles.topContainer}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
                        {`${strings.repayLoan} `}
                    </Text>
                </View>
                <View style={styles.borrowDetails}>
                    <View style={styles.itemHeaderView}>
                        <Image style={styles.btcIconLiquidium} source={localAssets.btcliquidium} />
                        <Text style={styles.btcIconLiquidiumValue}>{runeName}</Text>
                    </View>
                    <View style={styles.itemDetailRow}>
                        <Text style={styles.detailsLabel}>{strings.collateral}</Text>
                        <Text style={styles.detailsValue}>{repayData?.collateral_details?.rune_amount}</Text>
                    </View>
                    <View style={styles.itemDetailRow}>
                        <Text style={styles.detailsLabel}>{strings.dueDate}</Text>
                        <Text style={styles.detailsValue}>{`${formatDueDate(repayData?.loan_details?.loan_term_end_date)}`}</Text>
                    </View>

                    <View style={styles.itemDetailRow}>
                        <Text style={styles.detailsLabel}>{strings.repaymentAmount}</Text>
                        <View style={styles.itemRow}>
                            <Image style={styles.btcIconBorrow} source={localAssets.borrowbtc} />
                            <Text style={styles.value}>{`${satsToBtc(new BigNumber(repayData?.loan_details?.principal_amount_sats))}`} <Text style={[styles.value, { color: Color.copytint }]}>{`$${fiatValue}`}</Text></Text>
                        </View>
                    </View>

                    <View style={styles.lineSaperator} />
                    <View style={styles.itemDetailRow}>
                        <Text style={styles.detailsLabel}>{strings.networkFee}</Text>
                        <Text style={styles.detailsValue}>{networkFeeRate} Sats</Text>
                    </View>
                    <View style={styles.itemDetailRow}>
                        <View style={styles.itemRow}>
                            <Text style={styles.detailsLabel}>{strings.medium}</Text>
                            <TouchableOpacity style={styles.editContainer}>
                                <Image style={styles.editIcon} source={localAssets.blueedit} />
                                <Text style={styles.editText}>{strings.edit}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemMedium}>
                            <Text style={styles.fiateValue}>65.9 sats/vB</Text>
                            <Text style={styles.fiateValue}>~ $10.45 USD</Text>
                        </View>
                    </View>
                </View>

            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.repay}
                    onPress={() => handRepayment()}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};
export default Repay;