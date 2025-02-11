import type { SupportedCurrency } from '@orangecryptohq/orangeseed';
import { setCurrency } from "@redux/slice/appReducer";
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Color } from "@values/color";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const supportedCurrencies: SupportedCurrency[] = [
    "USD", "EUR", "CAD", "CNY", "ARS", "KRW", "HKD", "JPY",
    "SGD", "GBP", "BRL", "RUB", "CHF"
];

const Currency = () => {
    const currencyType = store.getState().appReducer.currency?.type;
    const dispatch: Dispatch = useAppDispatch();
    const [selectedCurrency, setSelectedCurrency] = useState(currencyType);

    type CurrencyItem = {
        id: number;
        currency: SupportedCurrency;
    };

    const currencyArray: CurrencyItem[] = supportedCurrencies.map((currency, index) => ({
        id: index + 1,
        currency,
    }));

    const changeCurrency = useCallback((item: CurrencyItem) => {
        if (item.currency !== selectedCurrency) {
            setSelectedCurrency(item.currency);
            dispatch(setCurrency({ type: item.currency }));
        }
    }, [selectedCurrency, dispatch]);

    const renderItem = ({ item }: { item: CurrencyItem }) => {
        const isSelected = item.currency === selectedCurrency;

        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => changeCurrency(item)}>
                <Text
                    style={[
                        styles.text,
                        { color: isSelected ? Color.orangeButton : Color.white }]}>
                    {item.currency}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={goBack}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.currency}</Text>
                <Text style={styles.description}>{strings.currencyMessage}</Text>
                <FlatList
                    data={currencyArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    extraData={selectedCurrency}/>
            </View>
        </View>
    );
};

export default Currency;