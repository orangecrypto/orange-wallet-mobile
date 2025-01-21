import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { black, blackBorder, orangeButton, white } from "@values/color";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { EDITCONFIRMATION } from "@routes/RouteType";

const Buy = () => {
    const [gatewayArray, setGatewayArray] = useState([
        { id: 1, name: "Coinbase", },
        { id: 2, name: "Moonpay", },
        { id: 3, name: "Transak", }

    ]);


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={()=>console.log('Open gateway')}>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.buy}</Text>
                <Text style={styles.description}>{strings.buyMessage}</Text>
                <FlatList
                    data={gatewayArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem} />
            </View>
        </View>
    );
};

export default Buy;
