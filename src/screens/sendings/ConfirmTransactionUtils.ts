import { satsToBtc } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { getImageSourceOrange, microStxToStx, truncateAddress } from "@utils/cryptoUtils";



export const gnerateDataForBtc = async (transactionData, networkType, rate, confirmData) => {
    return [
        {
            id: 1,
            name: "Amount",
            value: `${confirmData.sendAmount} ${confirmData.transactionType}`,
            subvalue: `~ $${(confirmData.sendAmount * rate).toFixed(2)} USD`
        },
        {
            id: 2,
            name: "Recipient",
            value: `${truncateAddress(confirmData.recipientAddress)}`,
            subvalue: ''
        },
        {
            id: 3,
            name: "Network",
            value: `${networkType}`,
            subvalue: ''
        },
        {
            id: 4,
            name: "Fees",
            value: `${transactionData.fee} sats`,
            subvalue: `$${(satsToBtc(new BigNumber(transactionData.fee)) * rate).toFixed(2)} USD`
        },
        {
            id: 5,
            name: "Total",
            value: `${satsToBtc(new BigNumber(transactionData.total)).toFixed(8)} ${confirmData.transactionType}`,
            subvalue: `~ $${(satsToBtc(new BigNumber(transactionData.total)) * rate).toFixed(2)} USD`
        },
        { id: 6, name: "Edit Fees", value: '', subvalue: '' },
        { id: 7, name: "Edit Nonce", value: '', subvalue: '' },
    ];
};


export const gnerateDataForSTX = async (transactionData, networkType, rate, confirmData) => {

    const feeStacks = await microStxToStx(new BigNumber(transactionData.auth.spendingCondition.fee.toString()))
    const value =  Number(feeStacks) * rate;
    const feeFiateValue = value > 0 && value < 0.01 ? '<$0.01 USD' : `$${value.toFixed(2)} USD`;
    const total = Number(confirmData.sendAmount) + Number(feeStacks)
    const totalValue =  Number(total) * rate;
    const totalFiateValue = totalValue > 0 && totalValue < 0.01 ? '<$0.01 USD' : `$${totalValue.toFixed(2)} USD`

    console.log('gnerateDataForSTX rate', rate)
    return [
        {
            id: 1,
            name: "Amount",
            value: `${confirmData.sendAmount} ${confirmData.transactionType}`,
            subvalue: `~ $${(confirmData.sendAmount * rate).toFixed(2)} USD`
        },
        {
            id: 2,
            name: "Recipient",
            value: `${truncateAddress(confirmData.recipientAddress)}`,
            subvalue: ''
        },
        {
            id: 3,
            name: "Network",
            value: `${networkType}`,
            subvalue: ''
        },
        {
            id: 4,
            name: "Fees",
            value: `${feeStacks} STX`,
            subvalue: `${feeFiateValue}`
        },
        {
            id: 5,
            name: "Total",
            value: `${total} ${confirmData.transactionType}`,
            subvalue: `~ $${totalFiateValue} USD`
        },
        { id: 6, name: "Edit Fees", value: '', subvalue: '' },
        { id: 7, name: "Edit Nonce", value: '', subvalue: '' },
    ];
};

export const gnerateDataForRunes = async(transactionData, networkType, rate, confirmData) =>{


    console.log('gnerateDataForRunes summary', transactionData.summary)
    console.log('gnerateDataForRunes transaction', transactionData.transaction)
    console.log('gnerateDataForRunes inputs', JSON.stringify(transactionData.summary.inputs))
    console.log('gnerateDataForRunes outputs', transactionData.summary.outputs)
    console.log('gnerateDataForRunes runes', transactionData.summary.inputs[0].extendedUtxo._bundleData.runes)
    const value =  Number(transactionData.summary.fee) * rate;
    const feeFiateValue = value > 0 && value < 0.01 ? '<$0.01 USD' : `$${value.toFixed(2)} USD`;
    return [
        {
            id: 1,
            name: "Amount",
            value: `${confirmData.sendAmount} ${confirmData.ticker}`,
            runes: transactionData.summary.inputs[0].extendedUtxo._bundleData.runes,
            FiateRate:`${value}`,
            image : await getImageSourceOrange(transactionData.summary.inputs[0].extendedUtxo._bundleData.runes[0][0])
        },
        {
            id: 2,
            name: "Recipient",
            value: `${truncateAddress(confirmData.recipientAddress)}`,
            subvalue: ''
        },
        {
            id: 3,
            name: "Inputs & Outputs",
            value: {
                ticker: confirmData.ticker,
                inputs :transactionData.summary.inputs,
                outputs :transactionData.summary.outputs
            },
            subvalue: ''
        },
        {
            id: 4,
            name: "Network",
            value: `${networkType}`,
            subvalue: ''
        },
        {
            id: 5,
            name: "Fees",
            value: {
                feeRate: transactionData.summary.feeRate,
                fee :transactionData.summary.fee,
                feeFiateValue:feeFiateValue
            },
            subvalue: `${''}`
        },
       
        { id: 6, name: "Edit Fees", value: '', subvalue: '' },
       
    ];
}

export const gnerateDataForBrc20 = async(networkType, rate, confirmData, txFee,inscriptionFee) =>{

    const totalFee = Number(txFee)+ Number(inscriptionFee) 

    const totalFeeFiateValue = Number(satsToBtc(new BigNumber(totalFee)) ) * rate
    const formattedtotal = totalFeeFiateValue > 0 && totalFeeFiateValue < 0.01 ? '<$0.01 USD' : `$${totalFeeFiateValue.toFixed(2)} USD`;
    return [
        {
            id: 1,
            name: "Amount",
            value: `${confirmData.sendAmount} ${confirmData.token.ticker}`,
            
        },
        {
            id: 2,
            name: "Inscribing and Sending",
            value: `${confirmData.sendAmount} ${confirmData.token.ticker}`,
            token: confirmData?.token,
            feeFiateValue: `$${confirmData.token.tokenFiatRate} USD`
        },
        {
            id: 3,
            name: "Recipient",
            value: `${truncateAddress(confirmData.recipientAddress)}`,
            subvalue: ''
        },
        
        {
            id: 4,
            name: "Network",
            value: `${networkType}`,
            subvalue: ''
        },
        {
            id: 5,
            name: "Fees",
            value: `${txFee} ${'sats'}`,      
        },
        {
            id: 6,
            name: "Inscription Fee",
            value: `${inscriptionFee} ${'sats'}`,     
        },
        {
            id: 7,
            name: "Total Fee",
            value: totalFee +' sats',
            subvalue: `~ $${formattedtotal} `
        },
       
        { id: 8, name: "Edit Fees", value: '', subvalue: '' },
    ];
}

export const gnerateDataForOrdinals = async (transactionData, networkType, rate, confirmData) => {
    return [
        // {
        //     id: 1,
        //     name: "Amount",
        //     value: `${confirmData.sendAmount} ${confirmData.transactionType}`,
        //     subvalue: `~ $${(confirmData.sendAmount * rate).toFixed(2)} USD`
        // },
        {
            id: 2,
            name: "Recipient",
            value: `${truncateAddress(confirmData.recipientAddress)}`,
            subvalue: ''
        },
        {
            id: 3,
            name: "Network",
            value: `${networkType}`,
            subvalue: ''
        },
        {
            id: 4,
            name: "Fees",
            value: `${transactionData.fee} sats`,
            subvalue: `$${(satsToBtc(new BigNumber(transactionData.fee)) * rate).toFixed(2)} USD`
        },
        {
            id: 5,
            name: "Total",
            value: `${satsToBtc(new BigNumber(transactionData.total)).toFixed(8)} ${confirmData.transactionType}`,
            subvalue: `~ $${(satsToBtc(new BigNumber(transactionData.total)) * rate).toFixed(2)} USD`
        },
        { id: 6, name: "Edit Fees", value: '', subvalue: '' },
    ];
};