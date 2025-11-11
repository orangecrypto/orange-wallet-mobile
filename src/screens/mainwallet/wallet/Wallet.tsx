import useBtcClient from '@hooks/useBtcClient';
import useRunesApi from '@hooks/useRunesApi';
import useSelectedNetwork from '@hooks/useSelectedNetwork';
import useStxData from '@hooks/useStxData';
import { useBalanceData } from '@hooks/useBalanceData';
import { getFtData, getOrdinalsFtBalance } from '@orangecryptohq/orangeseed';
import { useIsFocused } from '@react-navigation/native';
import { resetCoinNames, setAddCoinSettings } from '@redux/slice/CoinSettings';
import { setCardIndex, setHeaderAddress, setTokenList, walletReducerType } from '@redux/slice/WalletReducer';
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from '@reduxjs/toolkit';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import AppConfig from 'react-native-config';
import { styles } from './styles';
import categoryItem from './walletcomponents/CategoryItem';
import ProgressBar from './walletcomponents/ProgressBar';
import RenderCardItem from './walletcomponents/RenderCardItem';
import TokenList from './walletcomponents/TokenList';
import TransactionList from './walletcomponents/TransactionList';
import WalletSlider from './walletcomponents/WalletSlider';
import { createTokenArray, getCardItems, updateCoinSettingList } from './walletutils/TokenUtils';
import { fetchTransactions } from './walletutils/Transactions';

const Wallet = () => {
    const isFocused = useIsFocused();
    const limit = 10;
    const [isResetting, setIsResetting] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedToken, setSelectedToken] = useState('');
    const flatListRef = useRef(null);
    const account = store.getState().appReducer.selectedAccount
    const coinSettings = useSelector((state) => state.coinSettingsSlice.coinSettings);
    const { cardIndex } = useSelector((state: { walletReducer: walletReducerType }) => state.walletReducer);
    const stackNetwork = useSelectedNetwork()
    const dispatch: Dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [btcPrice, setBtcPrice] = useState();
    const [stxPrice, setStxPrice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreAvailable, setIsMoreAvailable] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const memoizedSelectedItem = useMemo(() =>
        selectedItem, [selectedItem]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cryptoArray, setCryptoArray] = useState([
        { id: 2, category: "BTC", name: "Bitcoin" },
        { id: 3, category: "BRC20", name: "Orange", ticker: 'ORNJ' },
        { id: 4, category: "Stacks", name: "Stacks" },
    ])
    const namesToAlwaysShow = ["Bitcoin", "Orange", "Stacks"];

    // Memoize visible items to avoid recomputation on every render
    const visibleItems = useMemo(() => {
        return cryptoArray.filter(item => {
            if (namesToAlwaysShow.includes(item.name)) {
                return true;
            }
            const coinSetting = coinSettings.find(setting => setting.name === item.name);
            return coinSetting ? coinSetting.visible : false;
        });
    }, [cryptoArray, coinSettings]);

    const [transactionProtocol, setTransactionProtocol] = useState('all')
    const [transaction, setTransaction] = useState([])
    const { btcClient, bitcoinAddress } = useBtcClient();
    const { runesApi, ordinalsAddress } = useRunesApi();
    const { data, loading, stxAddress } = useStxData();

    // Use React Query for balance data with caching
    const {
        data: balanceData,
        isLoading: isBalanceLoading,
        refetch: refetchBalance,
        isFetching: isBalanceFetching
    } = useBalanceData(
        btcClient,
        runesApi,
        bitcoinAddress,
        ordinalsAddress,
        stxAddress,
        stackNetwork,
        !!data // Only enable when STX data is ready
    );

    const walletContext = {
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
    };

    const onRefresh = useCallback(async () => {
        console.log('onRefresh', 'call')
        setRefreshing(true);

        // Use React Query refetch - it will use cache if fresh, or fetch if stale
        await refetchBalance();

        if (transactionProtocol !== 'all') {
            setPageNumber(0)
            setTransaction([]);
            setIsMoreAvailable(true);
            const updatedWalletContext = { ...walletContext, pageNumber: 0 };
            const newTransactions = await fetchTransactions(selectedToken, updatedWalletContext);
            setTransaction(prev => [...prev, ...newTransactions]);
            setPageNumber(prev => prev + 10);

        }
        setRefreshing(false);
    }, [refetchBalance, transactionProtocol, selectedToken]);

    const getBalance = async (initialTokens = cryptoArray) => {
        console.log('⏱️ [TIMING] getBalance called - balanceData exists?', !!balanceData);

        // CRITICAL FIX: Don't fetch if React Query is already fetching
        if (!balanceData) {
            console.log('⏱️ [TIMING] getBalance - waiting for React Query to fetch data...');
            // React Query useBalanceData hook is already fetching
            // Just wait for it - don't duplicate the API calls!
            return;
        }

        console.log('⏱️ [TIMING] getBalance - using React Query data');
        setIsLoading(true);

        // Use data from React Query (already fetched)
        const btcBalance = balanceData.btcBalance;
        const brc20Tokens = balanceData.brc20Tokens;
        const runesTokens = balanceData.runesTokens;
        const stacksTokens = balanceData.stacksTokens;

        await updateTokenArray(btcBalance, data, brc20Tokens, runesTokens, stacksTokens, initialTokens);
        setIsLoading(false);
    };

    const updateTokenArray = useCallback(async (btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens, initialTokens) => {

       console.log("⏱️ [TIMING] updateTokenArray START at:", new Date().toLocaleTimeString());

        const { newCryptoArray, btcPrice, stxPrice } = await createTokenArray(btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens, initialTokens);
        console.log("⏱️ [TIMING] createTokenArray DONE at:", new Date().toLocaleTimeString());

        console.log("⏱️ [TIMING] Setting state... at:", new Date().toLocaleTimeString());
        setCryptoArray(newCryptoArray);
        setBtcPrice(btcPrice);
        setStxPrice(stxPrice);
        setIsResetting(true);
        console.log("⏱️ [TIMING] Dispatching Redux actions at:", new Date().toLocaleTimeString());
        dispatch(resetCoinNames()); // FIX #1: Remove await - Redux dispatch is synchronous
        dispatch(setTokenList(newCryptoArray));
        console.log("⏱️ [TIMING] updateTokenArray END at:", new Date().toLocaleTimeString());
    }, [dispatch]);

    useEffect(() => {
        console.log("⏱️ [TIMING] useEffect [isResetting] triggered:", isResetting, 'at:', new Date().toLocaleTimeString());
        if (isResetting) {
            console.log("⏱️ [TIMING] addCoinSettings START at:", new Date().toLocaleTimeString());
            addCoinSettings(cryptoArray);
            dispatch(setTokenList(cryptoArray));
            setIsResetting(false);
            console.log("⏱️ [TIMING] addCoinSettings END at:", new Date().toLocaleTimeString());
        }
    }, [isResetting]); // FIX #2: Depend on isResetting, not coinSettings
    useEffect(() => {
        if (flatListRef?.current && cardIndex !== -1 ) {
            setCurrentStep(1);
            setTransactionProtocol('all')
            flatListRef.current && flatListRef.current.scrollToIndex({ index: 0, animated: true });
             dispatch(setCardIndex(-1))
        }
      }, [cardIndex]);

    const addCoinSettings = async (newCryptoArray) => {

        let newCoinsForSettings = await updateCoinSettingList(newCryptoArray);
        const finalSettingsList = newCoinsForSettings.filter(newCoin =>
            !coinSettings.some(existingCoin => existingCoin.name === newCoin.name)
        );
        dispatch(setAddCoinSettings(finalSettingsList));

    };

    // REMOVED: This useEffect was causing duplicate API calls!
    // React Query useBalanceData hook handles fetching automatically
    // The useEffect [balanceData] below handles processing when data arrives

    useEffect(() => {
        console.log('⏱️ [TIMING] useEffect [data] triggered at:', new Date().toLocaleTimeString());
        // Just set loading state - React Query is fetching in parallel
        if (data) {
            console.log('⏱️ [TIMING] STX data ready, React Query will fetch balance...');
            setIsLoading(true);
        }
    }, [data])

    // Auto-update when React Query balance data changes
    // FIX: Use useRef to prevent multiple calls with same data
    const balanceDataProcessed = useRef(false);

    useEffect(() => {
        console.log('⏱️ [TIMING] useEffect [balanceData] triggered at:', new Date().toLocaleTimeString());

        if (!balanceData || !data) {
            console.log('⏱️ [TIMING] Waiting for balance data or STX data...');
            return;
        }

        // CRITICAL FIX: Prevent processing same data multiple times
        if (balanceDataProcessed.current) {
            console.log('⏱️ [TIMING] SKIPPING - Already processed this balance data');
            return;
        }

        console.log('[useEffect] Balance data from React Query updated, processing tokens...');
        console.log('⏱️ [TIMING] Calling updateTokenArray() at:', new Date().toLocaleTimeString());

        balanceDataProcessed.current = true;

        updateTokenArray(
            balanceData.btcBalance,
            data,
            balanceData.brc20Tokens,
            balanceData.runesTokens,
            balanceData.stacksTokens,
            cryptoArray
        ).then(() => {
            console.log('⏱️ [TIMING] updateTokenArray complete, setting isLoading false');
            setIsLoading(false);
        });
    }, [balanceData, data])

    const categories = ["All", "BRC20", "Runes", "Stacks"];

    const handleScroll = async (event) => {
        if (!isFocused) return;
        setIsLoading(true);
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentStep(currentIndex + 1);
        setSelectedCategory(currentIndex === 0 ? 'All' : '');
        setSelectedItem(getCardItems(visibleItems)[currentIndex]);
        setTransactionProtocol(getCardItems(visibleItems)[currentIndex].name);

        const token = await getCardItems(visibleItems)[currentIndex];
        setPageNumber(0);
        const updatedWalletContext = { ...walletContext, pageNumber: 0 };
        setTransaction([]);
        setSelectedToken(token);
        setIsMoreAvailable(true);
        const newTransactions = await fetchTransactions(token, updatedWalletContext);
        setTransaction(prev => [...prev, ...newTransactions]);
        setPageNumber(prev => prev + 10);
        setIsLoading(false);

        const address = await setHeaderAddressByProtocol(token.protocol);
        if (address) {
          dispatch(setHeaderAddress(address));
        }
    };
    const setHeaderAddressByProtocol = async (protocol: string): string | undefined => {
        console.log('setHeaderAddressByProtocol',  `protocol ${protocol}`)
        if (protocol === 'runes' || protocol === 'brc-20') {
          return account?.ordinalsAddress;
        } else if (protocol === 'stacks') {
          return account?.stxAddress;
        } else if (protocol === 'btc'  || protocol === 'all') {
          return account?.btcAddress;
        }
        return account?.btcAddress;
      };
    const filteredCryptoArray = selectedCategory === "All"
        ? cryptoArray
        : cryptoArray.filter((item) => item.category === selectedCategory);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        const itemIndex = getCardItems(visibleItems).findIndex((crypto) => crypto.id === item.id);
        setCurrentStep(itemIndex + 1);
        dispatch(setHeaderAddress(item.category === 'Stacks' ? account?.stxAddress : account?.btcAddress));
        setPageNumber(0);
        if (flatListRef.current && itemIndex !== -1) {
            flatListRef.current.scrollToIndex({ index: itemIndex, animated: true });
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
        <RenderCardItem item={item} selectedItem={memoizedSelectedItem} loader={isLoading} />
    ), [memoizedSelectedItem, isLoading]);

    const totalSteps = getCardItems(visibleItems).length;
    const progressPercentage =
        totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

    const getTransactions = async () => {
        if (isLoading || !isMoreAvailable) return;
        setIsLoading(true);
        const newTransactions = await fetchTransactions(selectedToken, walletContext);

        if (newTransactions.length > 0) {
            setTransaction(prev => [...prev, ...newTransactions]);
            setPageNumber(prev => prev + 10);
        }
        setIsMoreAvailable(newTransactions.length === limit);
        setIsLoading(false);
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {transactionProtocol !== 'all' && (
                <View style={[styles.categoryContainer, { paddingHorizontal: Responsive.size20 }]}>
                    {categories.map((category) => categoryItem(category, selectedCategory, handlecategoryChange))}
                </View>
            )}
            <View style={styles.walletContainer}>
                <WalletSlider
                    cryptoArray={cryptoArray}
                    flatListRef={flatListRef}
                    handleScroll={handleScroll}
                    renderItem={renderItem} />
                <ProgressBar progressPercentage={progressPercentage} />
            </View>
            {!isLoading ? (
                transactionProtocol === 'all' ? (
                    <View style={styles.contentArea}>
                        <View style={styles.categoryContainer}>
                            {categories.map((category) =>
                                categoryItem(category, selectedCategory, handlecategoryChange)
                            )}
                        </View>
                        <View
                            style={[
                                styles.headerTitleContainer,
                                { backgroundColor: Color.black ,
                                  borderRadius: Responsive.size8
                                },]}>
                            <Text style={styles.assetsTitle}>{strings.assets}</Text>
                            <Text style={styles.assetsTitle}>{strings.quantity}</Text>
                        </View>
                        <TokenList
                            filteredCryptoArray={filteredCryptoArray}
                            selectedItem={selectedItem}
                            handleItemClick={handleItemClick}
                        />
                    </View>
                ) : (
                    <View style={[styles.transactionContainer, { height: 400 }]}>
                        <View style={styles.headerTitleContainer}>
                            <Text style={styles.transactionTitle}>
                                {`${transactionProtocol} ${strings.transactions}`}
                            </Text>
                        </View>
                        <TransactionList
                            transaction={transaction}
                            isLoading={isLoading || refreshing}
                            selectedToken={selectedToken}
                            limit={limit}
                            fetchTransactions={getTransactions}
                            walletContext={walletContext}
                            handleTransactionClick={handleTransactionClick}
                        />
                    </View>
                )
            ) : null}
        </ScrollView>
    );
};
export default Wallet;