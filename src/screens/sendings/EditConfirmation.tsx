import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { black, blackBorder, orangeButton, white } from "@values/color";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { CONFIRMATION } from "@routes/RouteType";

const EditConfirmation = () => {
    const [confirmationArray, setConfirmationArray] = useState([
        { id: 1, name: "Total", value: "0.000582323 BTC", subvalue: '~ $ 21.84 USD' },
        { id: 2, name: "Edit Fees", value: '', subvalue: '' },
        { id: 3, name: "Edit Nonce", value: '', subvalue: '' },

    ]);
    const availableRoutes = [
        "Edit Fees",
        "Edit Nonce",
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                if (availableRoutes.includes(item.name)) {
                    push(item.name);
                }
                else {
                    console.warn(`Route "${item.name}" is not available.`);
                }
            }}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.valueContainer}>
                <Text style={styles.value}>{item.value}</Text>
                {item.subvalue ? <Text style={styles.subValue}>{item.subvalue}</Text> : null}
            </View>
        </TouchableOpacity>
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
                    onPress={() => push(CONFIRMATION)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    width={'45%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default EditConfirmation;
