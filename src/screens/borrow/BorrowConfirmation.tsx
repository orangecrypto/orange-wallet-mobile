import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { getBtcFeeRate, satsToBtc } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { appReducerType } from "@redux/slice/appReducer";
import { BorrowReducerType } from "@redux/slice/BorrowReducer";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { formatDueDate, getFiateValue, getRawRuneAmount } from "./BorrowUtils";
import { styles } from "./styles";
import { usePrepareLoan } from "@hooks/borrow/usePrepareLoan";
import Loader from "@components/Loader";
import { useSubmitLoan } from "@hooks/borrow/useSubmitLoan";

const BorrowConfirmation = ({ route }) => {
    const [loanOfferDetails, setloanOfferDetails] = useState(route?.params?.selectedOffer ?? {});
    const { network } = useSelector((state: { appReducer: appReducerType }) => state.appReducer);
    const { medium, runeDivisiblity } = useSelector((state: { borrowReducer: BorrowReducerType }) => state.borrowReducer);
    const [networkFeeRate, setnetworkFeeRate] = useState<number>(0);
    const [repaymentFiat, setRepaymentFiat] = useState(0);
    const [loanFiat, setLoanFiat] = useState(0);
    const [interestFiat, setInterestFiat] = useState(0);
    const {
        prepareLoanAsync,
        isPending: prepareLoading
    } = usePrepareLoan();
    const {
        submitLoanAsync,
        isLoading: submitLoading
    } = useSubmitLoan();

    const handleStartLoan = async () => {
        try {
            const details = await prepareLoanAsync({
                instantOfferId: route?.params?.selectedOffer?.offer_id,
                feeRate: networkFeeRate,
                tokenAmount: getRawRuneAmount(loanOfferDetails?.loan_breakdown?.principal_sats, runeDivisiblity)
            });
            try {
                const result = await submitLoanAsync({
                    signed_psbt_base_64: details?.base64_psbt,
                    prepare_offer_id: details?.prepare_offer_id,
                });
                const loanTxId = result.loan_transaction_id;
                handleSubmite(loanTxId)
            } catch (error) {
            }
        } catch (err) {
        }
    };
    const handleSubmite = (txId: string) => {
        resetNavigation(RouteType.LOANSTATUS, { txId: txId })
    }

    useEffect(() => {
        (async () => {
            const breakdown = loanOfferDetails?.loan_breakdown || {};
            const sats = (val: any) => satsToBtc(new BigNumber(val || 0));
            const [repayment, loan, interest] = await Promise.all([
                getFiateValue(sats(breakdown.total_repayment_sats)),
                getFiateValue(sats(breakdown.principal_sats)),
                getFiateValue(sats(breakdown.interest_sats)),
                setnetworkFeeRate((await getBtcFeeRate(network?.type)).priority)
            ]);
            setRepaymentFiat(Number(repayment.toFixed(0)));
            setLoanFiat(Number(loan.toFixed(0)));
            setInterestFiat(Number(interest.toFixed(0)));
        })();
    }, []);

    return (
        <View style={styles.container}>
            {prepareLoading && <Loader loading={prepareLoading} />}
            {submitLoading && <Loader loading={submitLoading} />}
            <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                        <Text style={styles.buttonText}>{strings.back}</Text>
                    </TouchableOpacity>
                    <View style={styles.topContainer}>
                        <Text numberOfLines={1} style={styles.title}>{`${strings.borrow} `}</Text>
                    </View>
                    <Text style={styles.description}>{strings.confirmBorrow}</Text>
                    <View style={styles.borrowDetails}>
                        <View style={styles.itemDetailRow}>
                            <Text style={styles.detailsLabel}>{strings.dueDate}</Text>
                            <Text style={styles.detailsValue}>{`${formatDueDate(loanOfferDetails?.loan_breakdown?.loan_due_by_date)}`}</Text>
                        </View>
                        <View style={styles.itemDetailRow}>
                            <Text style={styles.detailsLabel}>{strings.totalRepay}</Text>
                            <View style={styles.itemRow}>
                                <Image style={styles.btcIconBorrow} source={localAssets.borrowbtc} />
                                <Text style={styles.value}>{`${satsToBtc(new BigNumber(loanOfferDetails?.loan_breakdown?.total_repayment_sats))}`} <Text style={[styles.value, { color: Color.copytint }]}>{`$${repaymentFiat}`}</Text></Text>
                            </View>
                        </View>
                        <View style={styles.loadAmountContainer}>
                            <View style={styles.itemDetailRow}>
                                <Text style={styles.detailsLabel}>{strings.loanAmount}</Text>
                                <View style={styles.itemRow}>
                                    <Image style={styles.btcIconBorrow} source={localAssets.borrowbtc} />
                                    <Text style={styles.value}>{`${satsToBtc(new BigNumber(loanOfferDetails?.loan_breakdown?.principal_sats))}`} <Text style={[styles.value, { color: Color.copytint }]}>{`$${loanFiat}`}</Text></Text>
                                </View>
                            </View>
                            <View style={styles.itemDetailRow}>
                                <Text style={styles.detailsLabel}>{strings.intrest}</Text>
                                <View style={styles.itemRow}>
                                    <Image style={styles.btcIconBorrow} source={localAssets.borrowbtc} />
                                    <Text style={styles.value}>{`${satsToBtc(new BigNumber(loanOfferDetails?.loan_breakdown?.interest_sats))}`} <Text style={styles.fiateValue}>{`$${interestFiat}`}</Text></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.itemDetailRow}>
                            <Text style={styles.detailsLabel}>{strings.loanProvider}</Text>
                            <View style={styles.itemRow}>
                                <Image style={styles.btcIconLiquidium} source={localAssets.btcliquidium} />
                                <Text style={styles.value}>{strings.Liquidiumfi}</Text>
                            </View>
                        </View>
                        <View style={styles.lineSaperator} />
                        <View style={styles.itemDetailRow}>
                            <Text style={styles.detailsLabel}>{strings.networkFee}</Text>
                            <Text style={styles.detailsValue}>{`${networkFeeRate ? networkFeeRate : 0} ${strings.sats}`}</Text>
                        </View>
                        <View style={styles.itemDetailRow}>
                            <View style={styles.itemRow}>
                                <Text style={styles.detailsLabel}>{strings.medium}</Text>
                                <TouchableOpacity style={styles.editContainer} onPress={() => push(RouteType.EDITMEDIUM)}>
                                    <Image style={styles.editIcon} source={localAssets.blueedit} />
                                    <Text style={styles.editText}>{strings.edit}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemMedium}>
                                <Text style={styles.fiateValue}>{`${medium} ${strings.satsperVb}`}</Text>
                                <Text style={styles.fiateValue}>~ $10.45 USD</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Text style={styles.warningText}>
                {strings.warning}: <Text style={styles.warningMessage}>{strings.warningMessageForLoan}</Text>
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
                    title={strings.confirm}
                    onPress={() => { handleStartLoan() }}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={"45%"}
                    disabled={false}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};
export default BorrowConfirmation;