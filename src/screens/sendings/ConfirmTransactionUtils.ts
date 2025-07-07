import { satsToBtc } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { microStxToStx, truncateAddress } from "@utils/cryptoUtils";



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