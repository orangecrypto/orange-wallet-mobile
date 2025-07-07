import { AccountType, BitcoinEsploraApiProvider, brc20TransferEstimateFees, getBtcFeeRate, getNonOrdinalUtxo, NetworkType, UTXO } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { CancelToken } from "axios";

type EstimateProps = {
    addressUtxos?: UTXO[];
    tick: string;
    amount: number;
    revealAddress: string;
    feeRate: number;
    cancelToken?: CancelToken;
    network: NetworkType;
};

type BaseEstimateResult = {
    commitValue: number;
    valueBreakdown: {
        commitChainFee: number;
        revealChainFee: number;
        revealServiceFee: number;
    };
};
type TransferEstimateResult = BaseEstimateResult & {
    valueBreakdown: {
        transferChainFee: number;
        transferUtxoValue: number;
    };
};

export const estimateBrc20TransferFees = async (
    selectedAccount: AccountType,
    btcClient: BitcoinEsploraApiProvider,
    network: NetworkType,
    tick: string,
    amount: number
) => {
    const feeRate = (await getBtcFeeRate(network.type)).regular;
    const addressUtxos = await getNonOrdinalUtxo(selectedAccount.btcAddress, btcClient, network.type);

    console.log('estimateBrc20TransferFees', `feeRate ${feeRate}`);
    console.log('estimateBrc20TransferFees', `selectedAccount ${JSON.stringify(selectedAccount)}`);
    console.log('estimateBrc20TransferFees', `addressUtxos ${JSON.stringify(addressUtxos)}`);

    const estimateFeesParams: EstimateProps = {
        addressUtxos,
        tick,
        amount:Number(amount),
        revealAddress: selectedAccount.ordinalsAddress,
        feeRate,
        network: network.type,
    };

    console.log('estimateBrc20TransferFees estimateFeesParams', estimateFeesParams)

    const estimatedFees = await brc20TransferEstimateFees(estimateFeesParams);
    return { estimatedFees, estimateFeesParams };

};

export const getFeeValuesForBrc20OneStepTransfer = ({
    commitChainFee,
    revealChainFee,
    transferChainFee,
    revealServiceFee,
    transferUtxoValue,
}: TransferEstimateResult['valueBreakdown']) => {
    const txFee = new BigNumber(commitChainFee).plus(revealChainFee).plus(transferChainFee);
    const inscriptionFee = new BigNumber(revealServiceFee);
    const totalFee = new BigNumber(txFee).plus(inscriptionFee);
    return { txFee, inscriptionFee, totalFee, transferUtxoValue: new BigNumber(transferUtxoValue) };
};