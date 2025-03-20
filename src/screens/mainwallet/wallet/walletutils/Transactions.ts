import { fetchBtcTransactionsData, getBrc20History } from '@orangecryptohq/orangeseed';
import { getStxAddressTransactions } from './TransactionUtils';
import { filterTxs, groupBtcTxsByDate, groupedTxsByDateMap, groupRuneTxsByDate, mapBrc20TransactionList, mapBtcTransactionList, mapRunesTransactionList, mapStxTransactionList } from './WalletUtils';

export const fetchTransactions = async (token, walletContext) => {
    const {
        bitcoinAddress,
        ordinalsAddress,
        btcClient,
        runesApi,
        stxAddress,
        stackNetwork,
        btcPrice,
        stxPrice,
        pageNumber,
        limit,
        store
    } = walletContext;
    
    try {
        let newTransactions = [];

        if (token.name === 'Bitcoin') {
            console.log('Fetching Bitcoin transactions...');
            const btcTransaction = await fetchBtcTransactionsData(bitcoinAddress, ordinalsAddress, btcClient, false);
            console.log('Fetching Bitcoin transactions...', btcTransaction);
            const groupedTransactions = groupBtcTxsByDate(btcTransaction);
            newTransactions = await mapBtcTransactionList(groupedTransactions, btcPrice);
        }

        if (token.name === 'Stacks') {
            console.log('Fetching Stacks transactions...', pageNumber);
            const stxAddressTransactions = await getStxAddressTransactions(stxAddress, stackNetwork, pageNumber, limit);
            const groupedTxsByDateMapData = groupedTxsByDateMap(stxAddressTransactions);
            newTransactions = await mapStxTransactionList(groupedTxsByDateMapData, stxPrice, stxAddress);
        }

        if (token.protocol === 'runes') {
            console.log('Fetching Runes transactions...');
            const runesTransactions = await runesApi.getRuneTxHistory(ordinalsAddress, token.name, pageNumber, limit);
            const groupedRunes = await groupRuneTxsByDate(runesTransactions.items);
            newTransactions = await mapRunesTransactionList(groupedRunes, runesTransactions.divisibility, token.tokenFiatRate, token.ticker);
        }

        if (token.protocol === 'brc-20') {
            console.log('Fetching BRC-20 transactions...');
            const brc20Transactions = await getBrc20History(store.getState().appReducer.network?.type, ordinalsAddress, token.name);
            const groupedTransactions = await groupBtcTxsByDate(brc20Transactions);
            newTransactions = await mapBrc20TransactionList(groupedTransactions, token.name, token.tokenFiatRate);
        }

        if (token.protocol === 'stacks' && token?.type === 'SIP-10') {
            console.log('Fetching Stacks SIP-10 transactions...');
            const stxAddressTransactions = await getStxAddressTransactions(stxAddress, stackNetwork, pageNumber, limit);
            const sip10Transactions = await filterTxs(stxAddressTransactions, token.name);
            const groupedTxsByDateMapData = groupedTxsByDateMap(sip10Transactions);
            newTransactions = await mapStxTransactionList(groupedTxsByDateMapData, stxPrice, stxAddress);
        }

        return newTransactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};
