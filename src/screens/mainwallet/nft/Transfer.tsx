import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../sendings/styles";
import { localAssets } from "@assets/assets";

const Transfer = ({route}) => {

    const [transferArray, setTransferArray] = useState(route?.params?.transafers)

    console.log('Transfer',transferArray )
    const renderItem = ({ item }) => (
        <View
            style={styles.transactionItem}>
                <View style={styles.transactionTitleContainer}>
                <Image source={localAssets.Orange} style={styles.transactionIcon}/>
                {/* <TokenImage
                    fungibleToken={item}
                    size={40}
                    round
                    variant="dark" /> */}
                <Text style={[styles.text,{marginLeft: Responsive.size10}]}>{item.tick.toUpperCase()}</Text>
                </View>
                <View style={styles.transactionValueContainer}>
                <Text style={styles.text}>{item.amt}</Text>
                <Text style={[styles.subValue,{fontSize: Responsive.size18}]}>{' '+item.tick.toUpperCase()}</Text>
                </View>
           
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.transfer+' '+strings.incription}</Text>
                <Text style={styles.description}>{strings.transferMessage}</Text>
                <FlatList
                    data={transferArray}
                  
                    renderItem={renderItem} />

            </View>
        </View>
    );
};

export default Transfer;
