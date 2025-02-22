
import useBtcClient from '@hooks/useBtcClient';
import useRunesApi from '@hooks/useRunesApi';
import useStxData from '@hooks/useStxData';
import { satsToBtc } from '@orangecryptohq/orangeseed';
import { setHeaderAddress } from '@redux/slice/WalletReducer';
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from '@reduxjs/toolkit';
import { strings } from '@strings/i18n';
import { convertBtcToUsd, convertStxToUsd, fetchBtcPrice, fetchStxPrice, microStxToStx } from '@utils/cryptoUtils';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import RenderCardItem from './RenderCardItem';
import RenderTransactions from './RenderTransactions';
import { styles } from './styles';
const Wallet = () => {
    const flatListRef = useRef(null);
    const account = store.getState().appReducer.selectedAccount
    const dispatch: Dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [totalBalance, setTotalBalance] = useState(0.00);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cryptoArray, setCryptoArray] = useState([
        { id: 2, category: "BTC", name: "Bitcoin" },
        { id: 3, category: "Stacks", name: "Stacks" },
    ])

    const { btcClient, bitcoinAddress } = useBtcClient();
    const { runesApi, ordinalsAddress } = useRunesApi();
    const { data, loading } = useStxData();

    const getBalance = async () => {

        const btcBalance = await btcClient.getBalance(bitcoinAddress)
        //  console.log('btcClient getBalance : ',)
        //  console.log('brc20 getBalance : ',await getOrdinalsFtBalance('Testnet',ordinalsAddress))
        //  console.log('runesApi getBalance  : ',await runesApi.getRuneBalance(ordinalsAddress))
        //  console.log('useStxData baln: ', JSON.stringify(data))

        await createTokenArray(btcBalance, data)
    }


    const createTokenArray = async (btcBalance, stxBalance) => {

        const btcPrice = await fetchBtcPrice()
        const stxPrice = await fetchStxPrice()
        const stx = await microStxToStx(stxBalance.balance)
        const btcTokenFiateRate = convertBtcToUsd(
            satsToBtc(new BigNumber(btcBalance?.finalBalance)).toNumber(),
            btcPrice
        )
        const stxTokenFiateRate = convertStxToUsd(stx, stxPrice)
        setTotalBalance(((parseFloat(btcTokenFiateRate) || 0) + (parseFloat(stxTokenFiateRate) || 0)).toFixed(2));


        setCryptoArray(prevArray =>
            prevArray.map(item =>
                item.category === 'BTC'
                    ? {
                        ...item,
                        balance: satsToBtc(new BigNumber(btcBalance?.finalBalance)).toString(), // Convert to string
                        total_sent: btcBalance?.totalSent?.toString(), // Ensure values are strings/numbers
                        total_received: btcBalance?.totalReceived?.toString(),
                        tokenFiatRate: convertBtcToUsd(
                            satsToBtc(new BigNumber(btcBalance?.finalBalance)).toNumber(),
                            btcPrice
                        ),
                        protocol: 'btc'
                    }
                    : item.category === 'Stacks'
                        ? {
                            ...item,
                            balance: stx,
                            total_sent: stxBalance?.availableBalance?.toString(),
                            total_received: stxBalance?.availableBalance?.toString(),
                            tokenFiatRate: convertStxToUsd(stx, stxPrice),
                            protocol: 'btc'
                        }
                        : item
            )
        );

    }

    useEffect(() => {
        if (data) {
            getBalance()
        }
    }, [data])

    useMemo(() => {

        
    }, [cryptoArray])
    const categories = ["All", "BRC20", "Runes", "Stacks"];



    const handleScroll = (event) => {
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentStep(currentIndex + 1);
        setSelectedItem(getCardItems(cryptoArray)[currentIndex]); // Synchronize selection


        console.log('handleScroll', getCardItems(cryptoArray)[currentIndex])
    };


    const filteredCryptoArray = selectedCategory === "All"
        ? cryptoArray
        : cryptoArray.filter((item) => item.category === selectedCategory);

    const renderCategory = (category) => (
        <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)} // Update the selected category
            style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
            ]}>
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                ]}>
                {category}
            </Text>
        </TouchableOpacity>
    );

    const handleItemClick = (item) => {
        setSelectedItem(item);

        const itemIndex = getCardItems(cryptoArray).findIndex((crypto) => crypto.id === item.id);
        setCurrentStep(itemIndex + 1);

        console.log('handleItemClick', item.category);
        dispatch(setHeaderAddress(item.category === 'Stacks' ? account?.stxAddress : account?.btcAddress));

        if (flatListRef.current && itemIndex !== -1) {
            flatListRef.current.scrollToIndex({ index: itemIndex, animated: true });
        }
    };

    const getCardItems = (cryptoArray) => {


        const totalFiatRate = cryptoArray.reduce((acc, item) => {
        return acc + (parseFloat(item.tokenFiatRate) || 0);
        }, 0);


    console.log('totalFiatRate', totalFiatRate)
        const newItem = {
            id: 1, // Unique ID
            name: "Default",
            category: "USD",
            assetCount: cryptoArray.length,
            balance: totalFiatRate,
            total_sent: "0.00",
            total_received: "0.00",
            tokenFiatRate: totalFiatRate,
            protocol: "custom"
        };

        return [newItem, ...cryptoArray];
    };

    const totalSteps = getCardItems(cryptoArray).length;
    const progressPercentage = (currentStep / totalSteps) * 100;
    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef} // Attach the reference to FlatList
                data={getCardItems(cryptoArray)}
                horizontal
                style={styles.flatList}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.id.toString()}
                getItemLayout={(data, index) => ({
                    length: Dimensions.get("window").width,
                    offset: Dimensions.get("window").width * index,
                    index,
                })}
                renderItem={({ item }) => <RenderCardItem item={item} selectedItem={selectedItem} />} />
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>

            <View style={styles.contentArea}>
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
                    renderItem={({ item }) => <RenderTransactions item={item} selectedItem={selectedItem} handleItemClick={handleItemClick} />}
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.emptyListText}>{strings.noAssets}</Text>
                        </View>
                    }
                    contentContainerStyle={styles.listContainer} />
            </View>
        </View>
    );
};
export default Wallet;