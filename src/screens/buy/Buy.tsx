import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import React, { useState } from "react";
import { FlatList, Linking, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../sendings/styles";
import useAddress from "@hooks/useAddress";
import { getCoinBaseUrl, getMoonPayUrl, getTanStackUrl } from "./GenerateUrl";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import { Responsive } from "@utils/Responsive";

const Buy = ({ route }) => {
    const [gatewayArray, setGatewayArray] = useState([
        { id: 1, name: "Coinbase", onPress: () => openCoinbase() },
        { id: 2, name: "Moonpay", onPress: () => openMoonpay() },
        { id: 3, name: "Transak", onPress: () => openTransak() }
    ]);

    const { network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);

    const address = useAddress(route?.params?.isFor)

    const openCoinbase = async () => {
        console.log("Opening Coinbase Gateway");
        console.log('Get URL For', route?.params?.isFor + " : " + address)

        const getWebURL = await getCoinBaseUrl(address)
        try {
            Linking.openURL(getWebURL.toString());
        } catch (error) {
            console.log('getWebURL ', error)
        }
    };

    const openMoonpay = async () => {
        const getWebURL = await getMoonPayUrl(address, network)
        console.log("Opening Moonpay Gateway", getWebURL);
        try {
            Linking.openURL(getWebURL.toString());
        } catch (error) {
            console.log('getWebURL ', error)
        }
    };

    const openTransak = async () => {
        const getWebURL = await getTanStackUrl(address)
        console.log("Opening Tanstack Gateway", getWebURL);
        try {
            Linking.openURL(getWebURL.toString());
        } catch (error) {
            console.log('getWebURL ', error)
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={item.onPress}>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={[styles.button, { marginTop: Responsive.size50 }]} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.buy}</Text>
                <Text style={styles.description}>{strings.buyMessage}</Text>
                <FlatList
                    style={{marginTop: Responsive.size25}}
                    data={gatewayArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem} />
            </View>
            <Text style={[styles.warningText,{marginBottom: Responsive.size50}]}>
                {strings.warning}: <Text style={styles.warningMessage}>{strings.buyMessageWarning}</Text>
            </Text>
        </View>
    );
};

export default Buy;