import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useState, useEffect } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { styles } from "../styles";
import useBrc20TransferExecute from "@hooks/brc20/useBrc20TransferExecute";
import { useSelector } from "react-redux";
import useSeedVault from "@hooks/useSeedVault";
import { appReducerType } from "@redux/slice/appReducer";
import { ExecuteTransferProgressCodes } from "@orangecryptohq/orangeseed";

const ConfirmBrc20 = ({ route }) => {

    const estimateFeesParams = route?.params?.estimateFeesParams;
    const recipientAddress = route?.params?.recipientAddress;
    const { selectedAccount, network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
    const [isProgressCompleted, setIsProgressCompleted] = useState(false);
    const [progressWidth, setProgressWidth] = useState(0);
    const { getSeed } = useSeedVault();
    const [hasError, setHasError] = useState(false);
    const { complete, executeTransfer, transferTransactionId, errorCode, progress } =
        useBrc20TransferExecute({
            ...estimateFeesParams,
            getSeedPhrase: getSeed,
            accountIndex: selectedAccount?.id ?? 0,
            changeAddress: selectedAccount.btcAddress,
            recipientAddress,
            network: network.type,
        });

    const progressSteps = [
        ExecuteTransferProgressCodes.CreatingInscriptionOrder,
        ExecuteTransferProgressCodes.CreatingCommitTransaction,
        ExecuteTransferProgressCodes.ExecutingInscriptionOrder,
        ExecuteTransferProgressCodes.CreatingTransferTransaction,
        ExecuteTransferProgressCodes.Finalizing,
    ];
    useEffect(() => {
        setTimeout(() => {
            executeTransfer()
        }, 100);
        if (errorCode) {
            setHasError(true);
            goBack()
            push(RouteType.WARNING)
            return;
        }
        setIsProgressCompleted(complete);

        const stepIndex = progressSteps.indexOf(progress);
        if (stepIndex !== -1) {
            const progressPercentage = ((stepIndex + 1) / progressSteps.length) * 100;
            setProgressWidth(progressPercentage);
        }
    }, [progress, complete]);

    return (
        <View style={styles.container}>
            {!isProgressCompleted && <View style={styles.stepContainer}>
                <Text style={styles.stepText}>{strings.progress}</Text>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
                </View>
            </View>}
            <View style={styles.transactionProgressContainer}>
                <ImageBackground style={styles.transactionVectorBackground} source={localAssets.transactionvector}>
                    <Image source={isProgressCompleted ? localAssets.transactiondone : localAssets.transactionsending} style={isProgressCompleted ? styles.transactionVectorIconDone : styles.transactionVectorIcon} />
                </ImageBackground>

                <Text style={styles.transactionTitle}>{isProgressCompleted ? strings.transactionSend : strings.sendingTransaction}</Text>
                <Text style={styles.transactionDescription}>{isProgressCompleted ? strings.transactionSendMessage : strings.sendingTransactionMessage}</Text>
            </View>
            {hasError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>{'transactionFailed'}</Text>

                </View>
            )}
            {isProgressCompleted && <View style={styles.transactionIdContainer}>
                <Text style={styles.transactionIdLabel} >{strings.transactionId}</Text>
                <Text style={styles.transactionIdValue}>{`${transferTransactionId}`}</Text>
            </View>}
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.close}
                    onPress={() => resetNavigation(RouteType.WALLETBALANCE)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    disabled={!isProgressCompleted}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default ConfirmBrc20;
