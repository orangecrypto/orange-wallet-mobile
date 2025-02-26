
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
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import RenderCardItem from './RenderCardItem';
import { styles } from './styles';
import TokenItem from './TokenItem';
import { createTokenArray } from './TokenUtils';
import TransactionItem from './TransactionItem';
import { getStxAddressTransactions } from './TransactionUtils';
import { groupBtcTxsByDate, groupedTxsByDateMap, mapBtcTransactionList, mapStxTransactionList } from './WalletUtils';
import { localAssets } from '@assets/assets';


const Wallet = () => {
    const flatListRef = useRef(null);
    const account = store.getState().appReducer.selectedAccount
    const stackNetwork = useSelectedNetwork()
    const dispatch: Dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [totalBalance, setTotalBalance] = useState(0.00);
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
        try
       { 
        const btcBalance = await btcClient.getBalance(bitcoinAddress)
        const brc20Tokens= await getOrdinalsFtBalance('Testnet','bc1pk8g4rztfkxs2q9c40g6keeknjw6aadx3kzu4suzlll0remfw7xxs5x9ctv')
        const runesTokens= await runesApi.getRuneFungibleTokens('bc1pk8g4rztfkxs2q9c40g6keeknjw6aadx3kzu4suzlll0remfw7xxs5x9ctv')
        const stacksTokens=await getFtData('SP3V5DY757XADMFXSSSWCJ4NSDCBJSYB92N6BXCKQ', stackNetwork)
        // const btcTransaction = await btcClient.getAddressTransactions(bitcoinAddress)
        //console.log('getStxTransactions : ', data?.transactions)
          console.log('brc20 getBalance : ',await getOrdinalsFtBalance('Testnet','bc1pk8g4rztfkxs2q9c40g6keeknjw6aadx3kzu4suzlll0remfw7xxs5x9ctv'))
          console.log('runesApi getTokens  : ',await runesApi.getRuneFungibleTokens('bc1pk8g4rztfkxs2q9c40g6keeknjw6aadx3kzu4suzlll0remfw7xxs5x9ctv'))
          console.log('stacks getTokens  : ',await getFtData('SP3V5DY757XADMFXSSSWCJ4NSDCBJSYB92N6BXCKQ', stackNetwork))
         //  console.log('useStxData baln: ', JSON.stringify(data))

       //   console.log('runesApi transaction  : ',await runesApi.getRuneTxHistory(ordinalsAddress,'',0,1))
        await updateTokenArray(btcBalance, data, brc20Tokens, runesTokens, stacksTokens )
        
        setIsLoading(false)
    }catch(error){
        setIsLoading(false)
        console.log('getBalance error', error)
    }
        
    }

    const updateTokenArray = async (btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens) => {
        const { finalCryptoArray, totalBalance, btcPrice, stxPrice } = await createTokenArray(btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens, cryptoArray);
        setCryptoArray(finalCryptoArray);
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
        } else if(await getCardItems(cryptoArray)[currentIndex].name === 'Stacks') {
            handleStacksTransactions()
        } else  {
            setTransaction([])
        }
    };

    const handleBtcTransactions = async () =>{
        console.log('handleBtcTransactions','call')
        const btcTransaction = await fetchBtcTransactionsData(bitcoinAddress, account?.ordinalsAddress, btcClient, false)
        const groupBtcTxsByDatevalue = groupBtcTxsByDate(btcTransaction)

     
        console.log('groupBtcTxsByDatevalue', groupBtcTxsByDatevalue)
        console.log('mapBtcTransactionList', await mapBtcTransactionList(groupBtcTxsByDatevalue, btcPrice))
        setTransaction(await mapBtcTransactionList(groupBtcTxsByDatevalue, btcPrice))
    }

    const handleStacksTransactions = async () =>{

        const  stxAddressTransactions = await getStxAddressTransactions(account?.stxAddress, stackNetwork,0,10)
        const  groupedTxsByDateMapData = groupedTxsByDateMap(stxAddressTransactions)
        
        console.log('handleStacksTransactions', await mapStxTransactionList(groupedTxsByDateMapData))

        setTransaction(await mapStxTransactionList(groupedTxsByDateMapData, stxPrice))
    }

    const filteredCryptoArray = selectedCategory === "All"
        ? cryptoArray
        : cryptoArray.filter((item) => item.category === selectedCategory);

    const renderCategory = (category) => (
        <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)} // Update the selected category
            style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory]}>
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText]}>
                {category}
            </Text>
        </TouchableOpacity>
    );

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

    const getCardItems = (cryptoArray) => {

        const totalFiatRate = cryptoArray.reduce((acc, item) => {
            return acc + (parseFloat(item.tokenFiatRate) || 0);
        }, 0);

        const newItem = {
            id: 1, // Unique ID
            image: localAssets.walletbalance,
            name: "all",
            category: "USD",
            assetCount: cryptoArray.length,
            balance: `$${totalFiatRate.toFixed(5)}`,
            total_sent: "0.00",
            total_received: "0.00",
            tokenFiatRate: totalFiatRate,
            protocol: "all"
        };

        return [newItem, ...cryptoArray];
    };

    const totalSteps = getCardItems(cryptoArray).length;
    const progressPercentage = (currentStep / totalSteps) * 100;
    return (
        <View style={styles.container}>
            {isLoading && <Loader loading={isLoading} />}
            <FlatList
                ref={flatListRef} // Attach the reference to FlatList
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
                    {categories.map((category) => renderCategory(category))}
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
                        // keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <TransactionItem item={item} handleTransactionClick={handleTransactionClick} />}
                        ListEmptyComponent={
                            <View style={styles.emptyListContainer}>
                                <Text style={styles.emptyListText}>{strings.noTransactions}</Text>
                            </View>
                        }
                        contentContainerStyle={styles.listContainer} />
                </View>
            }
        </View>
    );
};
export default Wallet;