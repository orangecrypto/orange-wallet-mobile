import Loader from '@components/Loader';
import useBtcClient from '@hooks/useBtcClient';
import useRunesApi from '@hooks/useRunesApi';
import useSelectedNetwork from '@hooks/useSelectedNetwork';
import useStxData from '@hooks/useStxData';
import { fetchBtcTransactionsData, getFtData, getOrdinalsFtBalance } from '@orangecryptohq/orangeseed';
import { setHeaderAddress } from '@redux/slice/WalletReducer';
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from '@reduxjs/toolkit';
import { strings } from '@strings/i18n';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Text, View } from "react-native";
import categoryItem from './CategoryItem';
import RenderCardItem from './RenderCardItem';
import { styles } from './styles';
import TokenItem from './TokenItem';
import { createTokenArray, getCardItems } from './TokenUtils';
import TransactionItem from './TransactionItem';
import { getStxAddressTransactions } from './TransactionUtils';
import { groupBtcTxsByDate, groupedTxsByDateMap, mapBtcTransactionList, mapStxTransactionList } from './WalletUtils';


const Wallet = () => {
    const flatListRef = useRef(null);
    const account = store.getState().appReducer.selectedAccount
    const stackNetwork = useSelectedNetwork()
    const dispatch: Dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [btcPrice, setBtcPrice] = useState();
    const [stxPrice, setStxPrice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cryptoArray, setCryptoArray] = useState([
        { id: 2, category: "BTC", name: "Bitcoin" },
        { id: 3, category: "BRC20", name: "ORNG" },
        { id: 4, category: "Stacks", name: "Stacks" },

    ])
    const [transactionProtocol, setTransactionProtocol] = useState('all')
    const [transaction, setTransaction] = useState([])
    const { btcClient, bitcoinAddress } = useBtcClient();
    const { runesApi, ordinalsAddress } = useRunesApi();
    const { data, loading } = useStxData();

    const getBalance = async () => {
        setIsLoading(true);

        const [btcRes, brc20Res, runesRes, stacksRes] = await Promise.allSettled([
            btcClient.getBalance(bitcoinAddress),
            getOrdinalsFtBalance(store.getState().appReducer.network?.type, account?.ordinalsAddress),
            //getOrdinalsFtBalance('Testnet','bc1pk8g4rztfkxs2q9c40g6keeknjw6aadx3kzu4suzlll0remfw7xxs5x9ctv'),
            //runesApi.getRuneFungibleTokens(account?.ordinalsAddress),
            runesApi.getRuneFungibleTokens('bc1pk8g4rztfkxs2q9c40g6keeknjw6aadx3kzu4suzlll0remfw7xxs5x9ctv'),
            getFtData(account?.stxAddress, stackNetwork),
        ]);

        const btcBalance = btcRes.status === 'fulfilled' ? btcRes.value : 0;
        const brc20Tokens = brc20Res.status === 'fulfilled' ? brc20Res.value : [];
        const runesTokens = runesRes.status === 'fulfilled' ? runesRes.value : [];
        const stacksTokens = stacksRes.status === 'fulfilled' ? stacksRes.value : [];

        await updateTokenArray(btcBalance, data, brc20Tokens, runesTokens, stacksTokens);
        setIsLoading(false);
    };


    const updateTokenArray = async (btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens) => {
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
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentStep(currentIndex + 1);
        setSelectedItem(getCardItems(cryptoArray)[currentIndex]);
        setTransactionProtocol(getCardItems(cryptoArray)[currentIndex].name)

        if (await getCardItems(cryptoArray)[currentIndex].name === 'Bitcoin') {
            await handleBtcTransactions()
        } else if (await getCardItems(cryptoArray)[currentIndex].name === 'Stacks') {
            await handleStacksTransactions()
        } else {
            setTransaction([])
        }
    };

    const handleBtcTransactions = async () => {
        console.log('handleBtcTransactions', 'call')
        const btcTransaction = await fetchBtcTransactionsData(bitcoinAddress, account?.ordinalsAddress, btcClient, false)
        const groupBtcTxsByDatevalue = groupBtcTxsByDate(btcTransaction)
        setTransaction(await mapBtcTransactionList(groupBtcTxsByDatevalue, btcPrice))
    }

    const handleStacksTransactions = async () => {

        const stxAddressTransactions = await getStxAddressTransactions(account?.stxAddress, stackNetwork, 0, 10)
        const groupedTxsByDateMapData = groupedTxsByDateMap(stxAddressTransactions)
        setTransaction(await mapStxTransactionList(groupedTxsByDateMapData, stxPrice))
    }

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
        }
    };
    const handleTransactionClick = (item) => {
        console.log('handleTransactionClick', item)
    };

    const totalSteps = getCardItems(cryptoArray).length;
    const progressPercentage = (currentStep / totalSteps) * 100;
    return (
        <View style={styles.container}>
            {isLoading && <Loader loading={isLoading} />}
            <FlatList
                ref={flatListRef}
                data={getCardItems(cryptoArray)}
                horizontal
                style={styles.flatList}
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={(event) => {
                    handleScroll(event)
                }}
                showsHorizontalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                    length: Dimensions.get("window").width,
                    offset: Dimensions.get("window").width * index,
                    index,
                })}
                renderItem={({ item }) => <RenderCardItem item={item} selectedItem={selectedItem} />} />
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

                <View style={styles.contentArea}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.transactionTitle}>{`${transactionProtocol + ' ' + strings.transactions} `}</Text>
                    </View>
                    <FlatList
                        data={transaction}
                        //   keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <TransactionItem item={item} handleTransactionClick={handleTransactionClick} />}
                        ListEmptyComponent={
                            <View style={styles.emptyListContainer}>
                                <Text style={styles.emptyListText}>{strings.noTransactions}</Text>
                            </View>
                        }
                        contentContainerStyle={styles.listContainer} />
                </View>}
        </View>
    );
};
export default Wallet;