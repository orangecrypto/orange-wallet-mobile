import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { styles } from "./styles";
import { Color } from "@values/color";
import { initialNetworksList } from "@orangecryptohq/orangeseed";
import { Dispatch } from "@reduxjs/toolkit";
import { store, useAppDispatch } from "@redux/store";
import { setNetwork } from "@redux/slice/appReducer";

const Network = () => {

    const networkType = store.getState().appReducer.network?.type;

    const [networkArray, setNetworkArray] = useState(
        initialNetworksList.map((network, index) => ({
            id: index + 1,
            isSelected: network.type === networkType,
            ...network,
        }))
    );

    const dispatch: Dispatch = useAppDispatch();
    
    const changeNetwork = (item) => {
        const updatedArray = networkArray.map((network) =>
            network.id === item?.id
                ? { ...network, isSelected: true }
                : { ...network, isSelected: false }
        );
        setNetworkArray(updatedArray);
        dispatch(setNetwork({
            type: item?.type,
            address: item?.address
        }))    
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => changeNetwork(item)}>
            <Text
                style={[
                    styles.text,
                    { color: item.isSelected ? Color.orangeButton: Color.white }, 
                ]}>
                {item.type}
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
