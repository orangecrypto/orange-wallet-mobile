import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useBtcClient from "@hooks/useBtcClient";
import useSeedVault from "@hooks/useSeedVault";
import { ResponseError, SignedBtcTx, signOrdinalSendTransaction } from "@orangecryptohq/orangeseed";
import { appReducerType } from "@redux/slice/appReducer";

const useGenerateSignedOrdinalTransaction = () => {
  const { selectedAccount, network } = useSelector(
    (state: { seedPhraseReducer: appReducerType }) => state.appReducer
  );
  const { getSeed } = useSeedVault();
  const { btcClient } = useBtcClient();
  const [ordinalUtxo, setOrdinalUtxo] = useState(null);
  const [transactionData, setTransactionData] = useState<SignedBtcTx | null>(null);
  const [transactionError, setTransactionError] = useState<ResponseError | null>(null);

  const accountIndex = Number.isInteger(selectedAccount?.id) ? selectedAccount.id : 0;

  const { isPending, mutate } = useMutation<SignedBtcTx | undefined, ResponseError, { recipient: string; ordinal: any }>({
    mutationFn: async ({ recipient, ordinal }) => {
      try {
        const seedPhrase = await getSeed();
        if (!seedPhrase) {
          throw new Error("Failed to retrieve seed phrase.");
        }
        
       // const addressUtxos = await btcClient.getUnspentUtxos(selectedAccount.btcAddress);
       const addressUtxos = await btcClient.getUnspentUtxos('bc1ppw76rpgc5t20l7x8su2e0see95s77ltxl6re2xv54du7jn0nlv8qmnzkmv');
        const ordUtxo = addressUtxos.find(
          (utxo) => `${utxo.txid}:${utxo.vout}` === ordinal?.output
        );
        setOrdinalUtxo(ordUtxo);
        console.log('useGenerateSignedOrdinalTransaction', addressUtxos)
        console.log('useGenerateSignedOrdinalTransaction ordUtxo', ordUtxo)
        console.log('useGenerateSignedOrdinalTransaction ordinal', ordinal?.output)
        if (!ordUtxo) {
          throw new Error("Ordinal UTXO not found.");
        }

        const signedTx = await signOrdinalSendTransaction(
          recipient,
          ordUtxo,
         // selectedAccount.btcAddress,
         'bc1ppw76rpgc5t20l7x8su2e0see95s77ltxl6re2xv54du7jn0nlv8qmnzkmv',
          accountIndex,
          seedPhrase,
          btcClient,
          network.type,
          [ordUtxo]
        );

        setTransactionData(signedTx);
        return signedTx;
      } catch (error) {
        setTransactionError(error);
        console
        throw error;
      }
    },
  });

  const generateSignedOrdinalTransaction = useCallback(
    async (recipientAddress: string, ordinal: any) => {
      setTransactionData(null);
      setTransactionError(null);
      mutate({ recipient: recipientAddress, ordinal });
    },
    [mutate]
  );

  return {
    isPending,
    generateSignedOrdinalTransaction,
    transactionData,
    transactionError,
    ordinalUtxo,
  };
};

export default useGenerateSignedOrdinalTransaction;
