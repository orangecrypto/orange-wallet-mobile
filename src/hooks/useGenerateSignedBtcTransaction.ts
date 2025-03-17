import useBtcClient from "@hooks/useBtcClient";
import useSeedVault from "@hooks/useSeedVault";
import { btcToSats, Recipient, ResponseError, signBtcTransaction, SignedBtcTx } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { appReducerType } from "@redux/slice/appReducer";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const useGenerateSignedBtcTransaction = () => {
    const { selectedAccount, network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
    const { getSeed } = useSeedVault();
    const { btcClient } = useBtcClient();
    const [transactionData, setTransactionData] = useState<SignedBtcTx | null>(null);
    const [transactionError, setTransactionError] = useState<ResponseError | null>(null);

    const accountIndex = Number.isInteger(selectedAccount?.id) ? selectedAccount.id : 0;

    const { isPending, mutate } = useMutation<
        SignedBtcTx,
        ResponseError,
        { recipients: Recipient[]; seedPhrase: string } >({
        mutationFn: async ({ recipients, seedPhrase }) =>
            signBtcTransaction(recipients, selectedAccount.btcAddress, accountIndex, seedPhrase, btcClient, network.type),
        onSuccess: (responseData) => {
            setTransactionData(responseData);
        },
        onError: (error) => {
            setTransactionError(error);
        }
    });

    const generateSignedTransaction = useCallback(
        async (walletAddress: string, amount: number) => {
            setTransactionData(null);
            setTransactionError(null);

            const retrievedSeedPhrase = await getSeed();
            if (!retrievedSeedPhrase) {
                console.error("Seed phrase retrieval failed.");
                setTransactionError({ message: "Failed to retrieve seed phrase." });
                return;
            }
            const recipients: Recipient[] = [
                {
                    address: walletAddress,
                    amountSats: btcToSats(new BigNumber(amount)),
                },
            ];
            mutate({ recipients, seedPhrase: retrievedSeedPhrase });
        },
        [mutate, getSeed]
    );

    return { isPending, generateSignedTransaction, transactionData, transactionError };
};

export default useGenerateSignedBtcTransaction;