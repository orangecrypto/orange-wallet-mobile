import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import { Color } from "@values/color";
import { Responsive } from '@utils/Responsive';
import { strings } from "@strings/i18n";
import { Fonts } from '@values/fonts';

const SeedPhraseVerification = () => {
    // Initialize the data state
    const [data, setData] = useState([
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
    ]);

    // Function to handle text change
    const handleTextChange = (text, id) => {
        const newData = data.map(item => 
            item.id === id ? { ...item, word: text } : item
        );
        setData(newData);
    };

    // Render each item
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TextInput
                style={styles.itemInput}
                value={item.word}
                onChangeText={(text) => handleTextChange(text, item.id)}
                placeholderTextColor={Color.seedPhrasePlaceholder}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.speedPhraseVerification}</Text>
                <Text style={styles.reviewText}>{strings.speedPhraseVerificationDes}</Text>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    title: {
        fontSize: Responsive.size22,
        color: Color.orangeButton,
        fontFamily:Fonts.semibold,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: Color.white,
        fontFamily:Fonts.regular,
        lineHeight: Responsive.size24,
    },
    flatListContainer: {
       
        marginTop: Responsive.size20,
        backgroundColor: Color.black,
        borderRadius: Responsive.size10,
        borderWidth: Responsive.size2,
        borderColor: Color.listBordercolor,
    },
    itemContainer: {
        flex: 1,
        margin: Responsive.size12,
        width: '30%', 
        height: Responsive.size45, 
        backgroundColor: Color.black,
        borderRadius: Responsive.size12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.borderLineSeedphrase,
        borderWidth: Responsive.size1,
        
    },
    itemInput: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily:Fonts.semibold,
        textAlign: 'center',
        width: '100%',
    },
});

export default SeedPhraseVerification;
