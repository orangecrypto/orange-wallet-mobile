import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../sendings/styles";
import { localAssets } from "@assets/assets";
import { Responsive } from "@utils/Responsive";

const Transfer = () => {

    const [transferArray, setTransferArray] = useState([
        { id: 1, name: "Orange", value: "10", category: 'ORNJ', image: localAssets.transactioncrypto1 },
        { id: 2, name: "Ordi", value: "45", category: 'ORDI', image: localAssets.transactioncrypto2 },
        { id: 3, name: "Orange", value: "67", category: 'ORNJ', image: localAssets.transactioncrypto1 },
        { id: 4, name: "Ordi", value: "123", category: 'ORDI', image: localAssets.transactioncrypto2 },
    ])

    const renderItem = ({ item }) => (
        <View
            style={styles.transactionItem}>
                <View style={styles.transactionTitleContainer}>
                <Image source={item.image} style={styles.transactionIcon}/>
                <Text style={[styles.text,{marginLeft: Responsive.size10}]}>{item.name}</Text>
                </View>
                <View style={styles.transactionValueContainer}>
                <Text style={styles.value}>{item.value}</Text>
                <Text style={styles.subValue}>{item.category}</Text>
                </View>
           
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.transfer}</Text>
                <Text style={styles.description}>{strings.transferMessage}</Text>
                <FlatList
                    data={transferArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem} />

            </View>
        </View>
    );
};

export default Transfer;
