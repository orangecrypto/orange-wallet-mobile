import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { styles } from "./styles";
import { orangeButton, white } from "@values/color";

const Currency = () => {
    const [currencyArray, setCurrencyArray] = useState([
        { id: 1, name: "USD", isSelected: false },
        { id: 2, name: "EUR", isSelected: false },
        { id: 3, name: "CNY", isSelected: false },
        { id: 4, name: "GBP", isSelected: false },
        { id: 5, name: "CAD", isSelected: false },
    ]);

    const handleSelection = (id) => {
        const updatedArray = currencyArray.map((currency) =>
            currency.id === id
                ? { ...currency, isSelected: true }
                : { ...currency, isSelected: false }
        );
        setCurrencyArray(updatedArray);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelection(item.id)}
        >
            <Text
                style={[
                    styles.text,
                    { color: item.isSelected ? orangeButton : white }, 
                ]}
            >
                {item.name}
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
