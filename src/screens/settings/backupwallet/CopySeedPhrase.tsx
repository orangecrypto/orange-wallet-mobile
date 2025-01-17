import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

const CopySeedPhrase = () => {


    const data = [
        { id: '1', word: 'rocket' },
        { id: '2', word: 'asset' },
        { id: '3', word: 'glimpse' },
        { id: '4', word: 'harvest' },
        { id: '5', word: 'warfare' },
        { id: '6', word: 'swallow' },
        { id: '7', word: 'code' },
        { id: '8', word: 'exclude' },
        { id: '9', word: 'episode' },
        { id: '10', word: 'proof' },
        { id: '11', word: 'emerge' },
        { id: '12', word: 'motion' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.id}. {item.word}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.backupWallet}</Text>
                <Text style={styles.subTitle}>{strings.speedPhrase}</Text>
                <Text style={styles.description}>{strings.seedPhraseMessage}</Text>
                  <FlatList
                                    data={data}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    numColumns={3}
                                    contentContainerStyle={styles.flatListContainer}
                                />
            </View>
        </View>
    );
};

export default CopySeedPhrase;
