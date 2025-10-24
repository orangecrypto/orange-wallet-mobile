import { useMutation } from "@tanstack/react-query";
import { StacksTransaction } from "@stacks/transactions";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { generateUnsignedStxTokenTransferTransaction, stxToMicrostacks } from "@orangecryptohq/orangeseed";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import useSelectedNetwork from "@hooks/useSelectedNetwork";
import useStxPendingTxData from "@hooks/useStxPendingTxData";
import useFeeMultipliers from "./useFeeMultipliers";

interface StxTransactionParams {
    associatedAddress: string;
    amount: number;
    memo?: string;
}

const useUnsignedStxTransaction = () => {
    const { selectedAccount } = useSelector((state: { appReducer: appReducerType }) => state.appReducer);
    const { stxPublicKey } = selectedAccount;
    const selectedNetwork = useSelectedNetwork();
    const { isLoading, data: stxPendingData } = useStxPendingTxData();
    const [transactionData, setTransactionData] = useState<StacksTransaction>();
    const [transactionError, setTransactionError] = useState<Error | null>(null);
    const feeMultipliers = useFeeMultipliers()
    const { isPending, mutate } = useMutation<
        StacksTransaction,
        Error,
        StxTransactionParams
    >({
        mutationFn: async ({ associatedAddress, amount, memo }) => {
            const unsignedSendStxTx: StacksTransaction =
                await generateUnsignedStxTokenTransferTransaction(
                    associatedAddress,
                    stxToMicrostacks(new BigNumber(amount)).toString(),
                    memo !,
                    stxPendingData?.pendingTransactions ?? [],
                    stxPublicKey,
                    selectedNetwork
                );

            const fee: bigint =
            BigInt(unsignedSendStxTx.auth.spendingCondition.fee.toString()) ?? BigInt(0);
          if (feeMultipliers?.data?.stxSendTxMultiplier) {
            unsignedSendStxTx.setFee(fee * BigInt(feeMultipliers?.data?.stxSendTxMultiplier));
          }
          
            return unsignedSendStxTx;
        },

        onSuccess: (responseData) => {
            const unsignedSendStxTx: StacksTransaction =responseData
            setTransactionData(unsignedSendStxTx);
        },

        onError: (error) => {
            setTransactionError(error);
        }
    });

    const generateUnsignedTransaction = useCallback((
        params: StxTransactionParams
    ) => {
        setTransactionData(null); 
        setTransactionError(null); 

        mutate(params);
    }, [mutate]);

    return { isPending, generateUnsignedTransaction, transactionData, transactionError, isLoading };
};

export default useUnsignedStxTransaction;
