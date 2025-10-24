import { btcTransaction, getBtcFeeRate, runesTransaction } from "@orangecryptohq/orangeseed";
import { TransactionSummary } from "@orangecryptohq/orangeseed/dist/transactions/bitcoin";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import Toast from "react-native-toast-message";

type TransactionBuildPayload = {
    transaction?: btcTransaction.EnhancedTransaction; // Mark as optional
    summary?: TransactionSummary;
};

export const generateTransaction = async (
    transactionContext: btcTransaction.TransactionContext,
    tokenName: string,
    toAddress: string,
    amount: bigint,
    feeRate: number,
): Promise<TransactionBuildPayload> => {

    let transaction: btcTransaction.EnhancedTransaction | undefined;
    const safeFeeRate = Number(feeRate);
    try {
        transaction = await runesTransaction.sendRunes(
            transactionContext,
            tokenName,
            toAddress,
            amount,
            safeFeeRate
        );
        console.log('transaction', transaction);
    } catch (error) {
        console.error('sendRunes failed:', error);
        Toast.show({ type: 'error', text1: 'Something went wrong' });
        throw new Error(`Transaction failed: ${error}`);
    }

    if (!transaction) {
        throw new Error('Transaction object is undefined after sendRunes');
        
    }

    try {
        const summary = await transaction.getSummary();
        return { transaction, summary };
    } catch (e) {
        console.error('Error fetching transaction summary:', e);
        if (e instanceof Error && e.message.includes('Insufficient funds')) {
            return { transaction };
        }
        throw e;
    }
};

export const generateTransactionAndSummary = async (amount, selectedCoin, walletAddress, transactionContext, network) => {
    const decimalsToBase = BigNumber(10 ** (selectedCoin.decimals || 0));
    console.log('decimalsToBase', decimalsToBase);
    const realAmountToSend = BigNumber(amount || 0).multipliedBy(decimalsToBase);
    
    const feeRate = (await getBtcFeeRate(network.type)).regular;
    console.log("feeRate value:", feeRate);
    
    return generateTransaction(
        transactionContext,
        selectedCoin.name,
        walletAddress,
        BigInt(realAmountToSend.toFixed()),
         feeRate
    );
};
