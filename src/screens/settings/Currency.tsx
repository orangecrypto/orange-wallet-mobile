import type { SupportedCurrency } from '@orangecryptohq/orangeseed';
import { setCurrency } from "@redux/slice/appReducer";
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Color } from "@values/color";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const Currency = () => {
    const currencyType = store.getState().appReducer.currency?.type;
    const dispatch: Dispatch = useAppDispatch();
    
    type CurrencyItem = {
        id: number;
        isSelected: boolean;
        currency: SupportedCurrency;
      };
      
    const supportedCurrencies: SupportedCurrency[] = [
        "USD", "EUR", "CAD", "CNY", "ARS", "KRW", "HKD", "JPY",
        "SGD", "GBP", "BRL", "RUB", "CHF"
      ];
      
    const [currencyArray, setCurrencyArray] = useState<CurrencyItem[]>(
        supportedCurrencies.map((currency, index) => ({
          id: index + 1,
          currency,
          isSelected: currency === currencyType,
        }))
      );

    const changeCurrency = (item) => {
        const updatedArray = currencyArray.map((currency) =>
            currency.id === item.id
                ? { ...currency, isSelected: true }
                : { ...currency, isSelected: false }
        );
        setCurrencyArray(updatedArray);
        dispatch(setCurrency({
            type: item.currency
        }))
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => changeCurrency(item)} >
            <Text
                style={[
                    styles.text,
                    { color: item.isSelected ? Color.orangeButton : Color.white }, 
                ]} >
                {item.currency}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.currency}</Text>
                <Text style={styles.description}>{strings.currencyMessage}</Text>
                <FlatList
                    data={currencyArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

export default Currency;
