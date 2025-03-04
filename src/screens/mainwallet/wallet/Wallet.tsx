import Loader from '@components/Loader';
import useBtcClient from '@hooks/useBtcClient';
import useRunesApi from '@hooks/useRunesApi';
import useSelectedNetwork from '@hooks/useSelectedNetwork';
import useStxData from '@hooks/useStxData';
import { fetchBtcTransactionsData, FungibleToken, getBrc20History, getFtData, getOrdinalsFtBalance, HIRO_MAINNET_DEFAULT, StacksMainnet, StacksNetwork } from '@orangecryptohq/orangeseed';
import { setHeaderAddress } from '@redux/slice/WalletReducer';
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from '@reduxjs/toolkit';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Text, View } from "react-native";
import categoryItem from './CategoryItem';
import RenderCardItem from './RenderCardItem';
import { styles } from './styles';
import TokenItem from './TokenItem';
import { createTokenArray, getCardItems } from './TokenUtils';
import TransactionItem from './TransactionItem';
import { getStxAddressTransactions } from './TransactionUtils';
import { filterTxs, groupBtcTxsByDate, groupedTxsByDateMap, groupRuneTxsByDate, mapBrc20TransactionList, mapBtcTransactionList, mapRunesTransactionList, mapStxTransactionList } from './WalletUtils';


const Wallet = () => {

    const limit = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedToken, setSelectedToken] = useState('');

    const flatListRef = useRef(null);
    const ITEM_WIDTH = Dimensions.get("window").width - Responsive.size20;
    const ITEM_OFFSET = ITEM_WIDTH + Responsive.size20;
    const account = store.getState().appReducer.selectedAccount

    const stackNetworkMainnet = new StacksMainnet({ url: HIRO_MAINNET_DEFAULT })
    const stackNetwork = useSelectedNetwork()
    const dispatch: Dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [btcPrice, setBtcPrice] = useState();
    const [stxPrice, setStxPrice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const memoizedSelectedItem = useMemo(() =>
        selectedItem, [selectedItem]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cryptoArray, setCryptoArray] = useState([
        { id: 2, category: "BTC", name: "Bitcoin" },
        { id: 3, category: "BRC20", name: "Orange", ticker: 'ORNJ' },
        { id: 4, category: "Stacks", name: "Stacks" },

    ])
    const [transactionProtocol, setTransactionProtocol] = useState('all')
    const [transaction, setTransaction] = useState([])
    const { btcClient, bitcoinAddress } = useBtcClient();
    const { runesApi, ordinalsAddress } = useRunesApi();
    const { data, loading, stxAddress } = useStxData();

    const getBalance = async () => {
        setIsLoading(true);

        const [btcRes, brc20Res, runesRes, stacksRes] = await Promise.allSettled([
            btcClient.getBalance(bitcoinAddress),
            getOrdinalsFtBalance(store.getState().appReducer.network?.type, ordinalsAddress),
            // getOrdinalsFtBalance(store.getState().appReducer.network?.type, 'bc1pk8g4rztfkxs2q9c40g6keeknjw6aadx3kzu4suzlll0remfw7xxs5x9ctv'),
            runesApi.getRuneFungibleTokens(ordinalsAddress),
            //  runesApi.getRuneFungibleTokens('bc1pk8g4rztfkxs2q9c40g6keeknjw6aadx3kzu4suzlll0remfw7xxs5x9ctv'),
            getFtData(stxAddress, stackNetwork),
            //getFtData('ST1J2JTYXGRMZYNKE40GM87ZCACSPSSEEQVSNB7DC', stackNetwork),
        ]);

        const btcBalance = btcRes.status === 'fulfilled' ? btcRes.value : 0;
        const brc20Tokens = brc20Res.status === 'fulfilled' ? brc20Res.value : [];
        const runesTokens = runesRes.status === 'fulfilled' ? runesRes.value : [];
        const stacksTokens = stacksRes.status === 'fulfilled' ? stacksRes.value : [];

        await updateTokenArray(btcBalance, data, brc20Tokens, runesTokens, stacksTokens);
        setIsLoading(false);
    };


    const updateTokenArray = async (btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens) => {

        console.log('updateTokenArray', stacksTokens)
        const { newCryptoArray, totalBalance, btcPrice, stxPrice } = await createTokenArray(btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens, cryptoArray);
        setCryptoArray(newCryptoArray);
        setBtcPrice(btcPrice);
        setStxPrice(stxPrice);
    };

    useEffect(() => {
        setIsLoading(true)
        if (data) {
            getBalance()
        }
    }, [data])



    const categories = ["All", "BRC20", "Runes", "Stacks"];

    const handleScroll = async (event) => {
        setIsLoading(true)
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentStep(currentIndex + 1);
        setSelectedCategory(currentIndex === 0 ? 'All' : '')
        setSelectedItem(getCardItems(cryptoArray)[currentIndex]);
        setTransactionProtocol(getCardItems(cryptoArray)[currentIndex].name)

        const token = await getCardItems(cryptoArray)[currentIndex]
        setPageNumber(() => 0);
        setTransaction([])
        setSelectedToken(token)
        await fetchTransactions(token)

        setIsLoading(false)
    };


    const fetchTransactions = async (token: FungibleToken) => {
        setIsLoading(true)
    
        try {
            let newTransactions = [];
    
            if (token.name === 'Bitcoin') {
                console.log('Fetching Bitcoin transactions...');
                const btcTransaction = await fetchBtcTransactionsData(bitcoinAddress, ordinalsAddress, btcClient, false);
                const groupedTransactions = groupBtcTxsByDate(btcTransaction);
                newTransactions = await mapBtcTransactionList(groupedTransactions, btcPrice);
            }
    
            if (token.name === 'Stacks') {
                console.log('Fetching Stacks transactions...');
                //const stxAddressTransactions = await getStxAddressTransactions('SP3WMZH4GCH820YP3XHD6GX5TKQ411MHSKPJ9H22R', stackNetworkMainnet, pageNumber, limit);
                const stxAddressTransactions = await getStxAddressTransactions(stxAddress, stackNetwork, pageNumber, limit);
                const groupedTxsByDateMapData = groupedTxsByDateMap(stxAddressTransactions);
              // newTransactions = await mapStxTransactionList(groupedTxsByDateMapData, stxPrice, 'SP3WMZH4GCH820YP3XHD6GX5TKQ411MHSKPJ9H22R');
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
    
            // Append new transactions instead of replacing
            setTransaction(prev => [...prev, ...newTransactions]);
            setPageNumber(prev => prev + 1);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredCryptoArray = selectedCategory === "All"
        ? cryptoArray
        : cryptoArray.filter((item) => item.category === selectedCategory);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        const itemIndex = getCardItems(cryptoArray).findIndex((crypto) => crypto.id === item.id);
        setCurrentStep(itemIndex + 1);
        dispatch(setHeaderAddress(item.category === 'Stacks' ? account?.stxAddress : account?.btcAddress));

        if (flatListRef.current && itemIndex !== -1) {
            flatListRef.current.scrollToIndex({ index: itemIndex, animated: true });
            console.log('handleItemClick', 'call')
        }
    };
    const handleTransactionClick = (item) => {
        console.log('handleTransactionClick', item)
    };
    const handlecategoryChange = (item) => {
        setSelectedCategory(item)
        setCurrentStep(1);
        setTransactionProtocol('all')
        flatListRef.current && flatListRef.current.scrollToIndex({ index: 0, animated: true });

    };
    const renderItem = useCallback(({ item }) => (
        <RenderCardItem item={item} selectedItem={memoizedSelectedItem} />
    ), [memoizedSelectedItem]);
    const totalSteps = getCardItems(cryptoArray).length;
    const progressPercentage = (currentStep / totalSteps) * 100;
    return (
        <View style={styles.container}>

            {transactionProtocol !== 'all' && <View style={[styles.categoryContainer, { paddingHorizontal: Responsive.size20 }]}>
                {categories.map((category) =>
                    categoryItem(category, selectedCategory, handlecategoryChange)
                )}
            </View>}

            {isLoading && <Loader loading={isLoading} />}
            <FlatList
                ref={flatListRef}
                data={getCardItems(cryptoArray)}
                horizontal
                style={styles.flatList}
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={handleScroll}
                showsHorizontalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_OFFSET * index,
                    index,
                })}
                contentContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                snapToInterval={ITEM_OFFSET}
                snapToAlignment='start'
                decelerationRate='normal'
                renderItem={renderItem} />


            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>

            {transactionProtocol === 'all' ? <View style={styles.contentArea}>
                <View style={styles.categoryContainer}>
                    {categories.map((category) =>
                        categoryItem(category, selectedCategory, setSelectedCategory)
                    )}
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{strings.assets}</Text>
                    <Text style={styles.headerTitle}>{strings.quantity}</Text>
                </View>
                <FlatList
                    data={filteredCryptoArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TokenItem item={item} selectedItem={selectedItem} handleItemClick={handleItemClick} />}
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.emptyListText}>{strings.noAssets}</Text>
                        </View>
                    }
                    contentContainerStyle={styles.listContainer} />
            </View> :

                <View style={[styles.transactionContainer, { height: transactionProtocol !== 'all' ? '50%' : '60%' }]}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.transactionTitle}>{`${transactionProtocol + ' ' + strings.transactions} `}</Text>
                    </View>
                    <FlatList
                        data={transaction}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <TransactionItem item={item} handleTransactionClick={handleTransactionClick} />}
                        ListEmptyComponent={
                            <View style={styles.emptyListContainer}>
                                {!isLoading && <Text style={styles.emptyListText}>{strings.noTransactions}</Text>}
                            </View>
                        }
                        contentContainerStyle={styles.listContainer} 
                        onEndReached={()=>{
                            console.log('End Reached')
                            if ((selectedToken.protocol === 'runes' || selectedToken.protocol === 'stacks') && transaction.length >= limit) {
                                fetchTransactions(selectedToken);
                            }
                            
                        }}
                        />
                </View>}
        </View>
    );
};
export default Wallet;