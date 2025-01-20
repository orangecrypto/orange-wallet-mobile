import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { black, blackBorder, orangeButton, white } from "@values/color";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { EDITCONFIRMATION } from "@routes/RouteType";

const SendConfirmation = () => {
    const [confirmationArray, setConfirmationArray] = useState([
        { id: 1, name: "Amount", value: "0.0005 BTC ", subvalue: '~ $ 18.87 USD' },
        { id: 2, name: "Recipient", value: "mv4r....UtFb ", subvalue: '' },
        { id: 3, name: "Network", value: "MainNet", subvalue: '' },
        { id: 4, name: "Currency", value: "8.323 Sats", subvalue: '~ $3.01 USD' },
    ]);


    const renderItem = ({ item }) => (
        <View
            style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.valueContainer}>
                <Text style={styles.value}>{item.value}</Text>
                {item.subvalue ? <Text style={styles.subValue}>{item.subvalue}</Text> : null}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.sendConfirmation}</Text>
                <Text style={styles.description}>{strings.confirmationMessage}</Text>
                <FlatList
                    data={confirmationArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem} />
            </View>
            <View style={styles.horizontalButtonContainer}>
                <CommonButton
                    title={strings.cancel}
                    onPress={() => goBack()}
                    backgroundColor={black}
                    textColor={white}
                    borderColor={blackBorder}
                    width={'45%'}
                    height={Responsive.size50} />
                <CommonButton
                    title={strings.confirm}
                    onPress={() => push(EDITCONFIRMATION)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    width={'45%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default SendConfirmation;
