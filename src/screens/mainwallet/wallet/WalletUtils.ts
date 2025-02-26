import { BtcTransactionData, fetchBtcFeeRate, fetchBtcToCurrencyRate, microstacksToStx, satsToBtc } from "@orangecryptohq/orangeseed";
import { convertBtcToUsd, convertStxToUsd, fetchBtcPrice, microStxToStx, timeStampToDate } from "@utils/cryptoUtils";
import BigNumber from 'bignumber.js';
import { isAddressTransactionWithTransfers, Tx } from "./TransactionUtils";
import {
  AddressTransactionWithTransfers,
  MempoolTransaction
} from '@stacks/stacks-blockchain-api-types';

export const mapBtcTransactionList = async (groupBtcTxsByDatevalue, btcPrice) => {
  try {
    const mappedTransactions = Object.values(groupBtcTxsByDatevalue) // Get values (arrays of transactions)
      .flat() // Flatten into a single array
      .map(({ seenTime, incoming, amount, txType, txStatus, isOrdinal, recipientAddress }) => ({
        seenTime,
        incoming,
        amount: satsToBtc(amount).toFixed(6),
        txType,
        txStatus,
        isOrdinal,
        recipientAddress,
        protocol: 'BTC',
        usdValue: convertBtcToUsd(satsToBtc(new BigNumber(amount)), btcPrice)
      }));
    return mappedTransactions
  } catch (error) {
    console.log('mapBtcTransactionList', error)
  }
  return false
};



export const mapStxTransactionList = async (groupStxTxsByDatevalue, stxPrice) => {

  const formattedTransactions = Object.values(groupStxTxsByDatevalue)
    .flat()
    .map(({ tx, stx_sent, stx_received, stx_transfers }) => ({
      seenTime: tx.block_time_iso,
      incoming: stx_received > 0 ? true : stx_sent < 0,
      amount: parseFloat(stx_transfers[0].amount) / 1_000_000,
      txType: tx.tx_type,
      txStatus: tx.tx_status,
      isOrdinal: "",
      recipientAddress:  stx_transfers[0].recipient,
      protocol: 'STX',
      usdValue: convertStxToUsd(new BigNumber(parseFloat(stx_transfers[0].amount) / 1000000), 0.7605)
    }));

  console.log('formattedTransactions stxPrice', stxPrice);

  return formattedTransactions
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
//     //acceptes data.items if is runes transaction array 
//   const groupRuneTxsByDate = (transactions: RuneTx[]): Record<string, RuneTx[]> => {
//     const mappedTransactions = {};
//     transactions.forEach((transaction) => {
//       const txDate = formatDate(new Date(transaction.blockTimestamp));
//       if (!mappedTransactions[txDate]) {
//         mappedTransactions[txDate] = [transaction];
//       } else {
//         mappedTransactions[txDate].push(transaction);
//       }
//     });
//     return mappedTransactions;
//   };
//   const filterTxs = (
//     txs: (AddressTransactionWithTransfers | MempoolTransaction)[],
//     filter: string,
//   ): (AddressTransactionWithTransfers | MempoolTransaction)[] =>
//     txs.filter((atx) => {
//       const tx = isAddressTransactionWithTransfers(atx) ? atx.tx : atx;
//       const acceptedTypes = tx.tx_type === 'contract_call';
//       const ftTransfers = atx && isAddressTransactionWithTransfers(atx) ? atx.ft_transfers || [] : [];
//       const nftTransfers =
//         atx && isAddressTransactionWithTransfers(atx) ? atx.nft_transfers || [] : [];
//       const fungibleTokenPostCondition = tx?.post_conditions[0] as PostConditionFungible;
//       const contractFromPostCondition = `${fungibleTokenPostCondition?.asset?.contract_address}.${fungibleTokenPostCondition?.asset?.contract_name}::${fungibleTokenPostCondition?.asset?.asset_name}`;
//       return (
//         acceptedTypes &&
//         (ftTransfers.filter((transfer) => transfer.asset_identifier.includes(filter)).length > 0 ||
//           nftTransfers.filter((transfer) => transfer.asset_identifier.includes(filter)).length > 0 ||
//           tx?.contract_call?.contract_id === filter ||
//           (contractFromPostCondition && contractFromPostCondition === filter))
//         );
//     });