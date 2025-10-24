import { localAssets } from "@assets/assets";
import { BtcTransactionData, parseStxTransactionData, RuneTx, satsToBtc } from "@orangecryptohq/orangeseed";
import {
  AddressTransactionWithTransfers,
  MempoolTransaction
} from '@stacks/stacks-blockchain-api-types';
import { convertBtcToUsd, convertStxToUsd, timeStampToDate } from "@utils/cryptoUtils";
import BigNumber from 'bignumber.js';
import { isAddressTransactionWithTransfers, Tx } from "./TransactionUtils";

export const mapBtcTransactionList = async (groupBtcTxsByDatevalue, btcPrice) => {

  console.log('mapBtcTransactionList',groupBtcTxsByDatevalue )
  try {
    const mappedTransactions = Object.values(groupBtcTxsByDatevalue) // Get values (arrays of transactions)
      .flat() // Flatten into a single array
      .map(({ seenTime, incoming, amount, txType, txStatus, isOrdinal, recipientAddress }) => ({
        icon: txStatus !== 'pending'? incoming ? localAssets.receive: localAssets.send :localAssets.pendingIcon,
        seenTime: txStatus !== 'pending'?  seenTime : 'pending',
        incoming,
        amount: satsToBtc(amount).toFixed(6),
        txType,
        txStatus,
        isOrdinal,
        recipientAddress,
        protocol: 'BTC',
        ticker:'BTC',
        usdValue: convertBtcToUsd(satsToBtc(new BigNumber(amount)), btcPrice)
      }));
    return mappedTransactions
  } catch (error) {
    console.log('mapBtcTransactionList', error)
  }
  return false
};


export const mapBrc20TransactionList = async (groupBrc20TxsByDatevalue, tokenName, tokePrice) => {
  try {
    const mappedTransactions = Object.values(groupBrc20TxsByDatevalue) // Get values (arrays of transactions)
      .flat() // Flatten into a single array
      .map(({ seenTime, incoming, amount, txType, txStatus, address }) => ({
        icon: incoming ? localAssets.receive: localAssets.send,
        seenTime,
        incoming : incoming,
        amount: satsToBtc(amount).toFixed(6),
        txType,
        txStatus,
        recipientAddress: address,
        protocol: 'brc-20',
        ticker:tokenName,
        usdValue: convertBtcToUsd(satsToBtc(new BigNumber(amount)), tokePrice)
      }));

      console.log('mappedTransactions', mappedTransactions)
    return mappedTransactions
  } catch (error) {
    console.log('mapBtcTransactionList', error)


  }
  return false
};


export const mapRunesTransactionList = async (grouppedRuneTransactions, divisibility, tokenPrize, ticker) => {
  
  try {
    const mappedTransactions = Object.values(grouppedRuneTransactions) // Extract arrays of transactions
      .flat() // Flatten into a single array
      .map(({ blockTimestamp, amount, txid, burned }) => ({

        icon : burned ? localAssets.failed : BigInt(amount) > 0 ? localAssets.receive : localAssets.send,
        seenTime: blockTimestamp,
        incoming: BigInt(amount) > 0, 
        amount: ftDecimals(amount, divisibility),
        recipientAddress: txid,
        protocol: 'runes',
        ticker: ticker,
        usdValue: ftDecimals(amount, divisibility) * tokenPrize
      }));
  
    console.log(mappedTransactions);
    return mappedTransactions;
  } catch (error) {
    console.log('mapBtcTransactionList', error);
  }
  return false;
  


};



export const mapStxTransactionItem = async (tx, stxPrice) => {
 

  let amount;
  let recipientAddress = '';
  let icon=0;
  // Handle different transaction types
  if (tx.txType === "token_transfer" && tx.amount) {
    amount = parseFloat(tx.amount) / 1_000_000;
    recipientAddress = tx.recipientAddress || tx.txid;
    icon = tx.incoming ? localAssets.receive: localAssets.send;
  } else {
    amount = tx[formatTransactionType(tx.txType)].function_name;
    icon = localAssets.contract;
   // recipientAddress = tx.txid;
   // amount =tx.amount;
  } 

  
  const amountValue = parseFloat(tx.amount) || 0;
  return {
    icon :tx.txStatus !== 'pending'? icon: localAssets.pendingIcon,
    seenTime: tx.txStatus !== 'pending'?  tx.seenTime: 'pending' ,
    incoming: tx.txType === "token_transfer" ? tx.incoming :'',
    amount: amount,
    txType: tx.txType,
    txStatus: tx.txStatus,
    isOrdinal: "",
    recipientAddress : tx.txType === "token_transfer" ? tx.tokenTransfer.recipientAddress: tx.txid,
    protocol: "STX",
    ticker:  tx.txType === "token_transfer" ?'STX' : '',
    usdValue : isNaN(Number(convertStxToUsd(new BigNumber(amountValue / 1_000_000), stxPrice))) ?0.00:convertStxToUsd(new BigNumber(amountValue / 1_000_000), stxPrice)
       
  };

  console.log('mapStxTransactionItem', tx)
};

export const handlePendingTransactions = async (tx, stxPrice) => {
  

  // Extract function name for contract call transactions
  let amount;

  if (tx.tx_type === "token_transfer" && tx.token_transfer) {
    amount = parseFloat(tx.token_transfer.amount) / 1_000_000;
  } else if (tx[tx.tx_type]?.function_name) {
    amount = tx[tx.tx_type].function_name;
  } else {
    amount = "N/A";
  }

  return {
    icon:localAssets.transactionarrow,
    seenTime: 'pending', 
    incoming: false,
    amount: amount,
    txType: tx.tx_type,
    txStatus: tx.tx_status,
    isOrdinal: "",
    recipientAddress: tx.tx_id, 
    protocol: "STX",
    ticker: "",
    usdValue: 0,
  };
};


export const mapStxTransactionList = async (groupStxTxsByDatevalue, stxPrice, address) => {
  const transactionPromises = Object.values(groupStxTxsByDatevalue)
    .flat()
    .map(async (txItem) => {
      if (!isAddressTransactionWithTransfers(txItem)) {
       // console.log("Transaction with true condition", parseStxTransactionData({responseTx : txItem,stxAddress: 'SP3WMZH4GCH820YP3XHD6GX5TKQ411MHSKPJ9H22R'}));
        return await mapStxTransactionItem(parseStxTransactionData({responseTx : txItem,stxAddress: address}), stxPrice); 
      } else {
        console.log("Transaction with false condition", parseStxTransactionData({responseTx : txItem.tx,stxAddress: address}));
        return await mapStxTransactionItem(parseStxTransactionData({responseTx : txItem.tx,stxAddress: address}), stxPrice);
      }
    });

  const formattedTransactions = await Promise.all(transactionPromises); 

  console.log("formattedTransactions", formattedTransactions.filter(Boolean));

  return formattedTransactions.filter(Boolean); 
};




const sortTransactionsByBlockHeight = (transactions: BtcTransactionData[]) =>
  transactions.sort((txA, txB) => {
    if (txB.blockHeight > txA.blockHeight) {
      return 1;
    }
    return -1;
  });

//if btc transaction array or brc2o transaction array 
//accepts data as it is if it is one of the above type
export const groupBtcTxsByDate = (
  transactions: BtcTransactionData[],
): { [x: string]: BtcTransactionData[] } => {
  const pendingTransactions: BtcTransactionData[] = [];
  const processedTransactions: { [x: string]: BtcTransactionData[] } = {};
  transactions.forEach((transaction) => {
    const txDate = timeStampToDate(transaction?.seenTime);

    if (transaction.txStatus === 'pending') {
      pendingTransactions.push(transaction);
    } else {
      if (!processedTransactions[txDate]) processedTransactions[txDate] = [transaction];
      else processedTransactions[txDate].push(transaction);
      sortTransactionsByBlockHeight(processedTransactions[txDate]);
    }
  });
  sortTransactionsByBlockHeight(pendingTransactions);
  if (pendingTransactions.length > 0) {
    const result = { Pending: pendingTransactions, ...processedTransactions };
    return result;
  }
  return processedTransactions;
};

export const groupedTxsByDateMap = (txs: (AddressTransactionWithTransfers | MempoolTransaction)[]) =>
  txs.reduce(
    (
      all: { [x: string]: (AddressTransactionWithTransfers | Tx)[] },
      transaction: AddressTransactionWithTransfers | Tx,
    ) => {
      const date = timeStampToDate(
        new Date(
          isAddressTransactionWithTransfers(transaction) && transaction.tx?.burn_block_time_iso
            ? transaction.tx.burn_block_time_iso
            : Date.now(),
        ),
      );
      if (!all[date]) {
        all[date] = [transaction];
      } else {
        all[date].push(transaction);
      }
      return all;
    },
    {},
  );


//acceptes data.items if is runes transaction array 
  export const groupRuneTxsByDate = (transactions: RuneTx[]): Record<string, RuneTx[]> => {
    const mappedTransactions = {};
    transactions.forEach((transaction) => {
      const txDate = timeStampToDate(new Date(transaction.blockTimestamp));
      if (!mappedTransactions[txDate]) {
        mappedTransactions[txDate] = [transaction];
      } else {
        mappedTransactions[txDate].push(transaction);
      }
    });
    return mappedTransactions;
  };

export const filterTxs = async (
    txs: (AddressTransactionWithTransfers | MempoolTransaction)[],
    filter: string,
  ): (AddressTransactionWithTransfers | MempoolTransaction)[] =>
    txs.filter((atx) => {
      const tx = isAddressTransactionWithTransfers(atx) ? atx.tx : atx;
      const acceptedTypes = tx.tx_type === 'contract_call';
      const ftTransfers = atx && isAddressTransactionWithTransfers(atx) ? atx.ft_transfers || [] : [];
      const nftTransfers =
        atx && isAddressTransactionWithTransfers(atx) ? atx.nft_transfers || [] : [];
      const fungibleTokenPostCondition = tx?.post_conditions[0] as PostConditionFungible;
      const contractFromPostCondition = `${fungibleTokenPostCondition?.asset?.contract_address}.${fungibleTokenPostCondition?.asset?.contract_name}::${fungibleTokenPostCondition?.asset?.asset_name}`;
      return (
        acceptedTypes &&
        (ftTransfers.filter((transfer) => transfer.asset_identifier.includes(filter)).length > 0 ||
          nftTransfers.filter((transfer) => transfer.asset_identifier.includes(filter)).length > 0 ||
          tx?.contract_call?.contract_id === filter ||
          (contractFromPostCondition && contractFromPostCondition === filter))
        );
    });

const formatTransactionType = (type : any): string => {
  return type.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

function ftDecimals(value: number | string | BigNumber, decimals: number): string {
  const amount = initBigNumber(value);
  return amount.shiftedBy(-decimals).toString();
}

function initBigNumber(num: string | number | BigNumber) {
  return BigNumber.isBigNumber(num) ? num : new BigNumber(num);
 }