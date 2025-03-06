import Loader from '@components/Loader';
import useBtcClient from '@hooks/useBtcClient';
import useRunesApi from '@hooks/useRunesApi';
import useSelectedNetwork from '@hooks/useSelectedNetwork';
import useStxData from '@hooks/useStxData';
import { getFtData, getOrdinalsFtBalance, HIRO_MAINNET_DEFAULT, StacksMainnet } from '@orangecryptohq/orangeseed';
import { setHeaderAddress } from '@redux/slice/WalletReducer';
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from '@reduxjs/toolkit';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Text, View } from "react-native";
import categoryItem from './walletcomponents/CategoryItem';
import ProgressBar from './walletcomponents/ProgressBar';
import RenderCardItem from './walletcomponents/RenderCardItem';
import { styles } from './styles';
import TokenList from './walletcomponents/TokenList';
import { createTokenArray, getCardItems } from './walletutils/TokenUtils';
import TransactionList from './walletcomponents/TransactionList';
import { fetchTransactions } from './walletutils/Transactions';
import WalletSlider from './walletcomponents/WalletSlider';

const Wallet = () => {

    const limit = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedToken, setSelectedToken] = useState('');
    const flatListRef = useRef(null);
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

        const { newCryptoArray, btcPrice, stxPrice } = await createTokenArray(btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens, cryptoArray);
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
        setIsLoading(true);
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentStep(currentIndex + 1);
        setSelectedCategory(currentIndex === 0 ? 'All' : '');
        setSelectedItem(getCardItems(cryptoArray)[currentIndex]);
        setTransactionProtocol(getCardItems(cryptoArray)[currentIndex].name);

        const token = await getCardItems(cryptoArray)[currentIndex];
        setPageNumber(0);
        setTransaction([]);
        setSelectedToken(token);

        const newTransactions = await fetchTransactions(token, walletContext);
        setTransaction(prev => [...prev, ...newTransactions]);
        setPageNumber(prev => prev + 1);
        setIsLoading(false);
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
            <WalletSlider
                cryptoArray={cryptoArray}
                flatListRef={flatListRef}
                handleScroll={handleScroll}
                renderItem={renderItem} />
            <ProgressBar progressPercentage={progressPercentage} />
            {transactionProtocol === 'all' ?
                <View style={styles.contentArea}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>{strings.assets}</Text>
                        <Text style={styles.headerTitle}>{strings.quantity}</Text>
                    </View>
                    <TokenList
                        filteredCryptoArray={filteredCryptoArray}
                        selectedItem={selectedItem}
                        handleItemClick={handleItemClick} />
                </View>:
                <View style={styles.transactionContainer}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.transactionTitle}>{`${transactionProtocol + ' ' + strings.transactions} `}</Text>
                    </View>
                    <TransactionList
                        transaction={transaction}
                        isLoading={isLoading}
                        selectedToken={selectedToken}
                        limit={limit}
                        fetchTransactions={fetchTransactions}
                        walletContext={walletContext}
                        handleTransactionClick={handleTransactionClick} />
                </View>}
        </View>
    );
};
export default Wallet;