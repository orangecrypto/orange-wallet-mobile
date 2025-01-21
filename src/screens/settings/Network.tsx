import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { styles } from "./styles";
import { orangeButton, white } from "@values/color";

const Network = () => {
    const [networkArray, setNetworkArray] = useState([
        { id: 1, name: "MainNet", isSelected: false },
        { id: 2, name: "TestNet", isSelected: false },
    ]);

    const handleSelection = (id) => {
        const updatedArray = networkArray.map((network) =>
            network.id === id
                ? { ...network, isSelected: true }
                : { ...network, isSelected: false }
        );
        setNetworkArray(updatedArray);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelection(item.id)}
        >
            <Text
                style={[
                    styles.text,
                    { color: item.isSelected ? orangeButton: white }, 
                ]}>
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
                <Text style={styles.title}>{strings.network}</Text>
                <Text style={styles.description}>{strings.networkMessage}</Text>
                <FlatList
                    data={networkArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

export default Network;
