import { strings } from "@strings/i18n";
import { Color } from "@values/color";
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useSelector } from "react-redux";
import { seedPhraseReducerType, setDisabled, setIsSeedPhraseVerified } from "./SeedPhraseReducer";
import { useAppDispatch } from "../../redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { Responsive } from "@utils/Responsive";

const SeedPhraseVerification = () => {

    const { words } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer);
    const dispatch: Dispatch = useAppDispatch();

    const [data, setData] = useState(
        new Array(12).fill(null).map((_, index) => ({ id: index.toString(), word: '' }))
    );
    const [isPasted, setIsPasted] = useState(false);

    const handlePaste = () => {
        const splitWords = words.split(' ');
        const newData = data.map((item, index) => ({
            ...item,
            word: splitWords[index] || ''
        }));
        setData(newData);
        setIsPasted(true);
    };

    useEffect (()=>{
        dispatch(setDisabled(true))
        const allFilled = data.every(item => item.word.trim() !== '');
        dispatch(setDisabled(!allFilled))
        const myWords = words.split(" ");
        const isMatched = data.length === myWords.length &&
        data.every(item => myWords.includes(item.word)) &&
        myWords.every(word => data.some(item => item.word === word));
        
        dispatch(setIsSeedPhraseVerified(isMatched))
       
    },[data])

    const handleTextChange = (text, id) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, word: text } : item
        );
        setData(newData);
    };

    const clear = () => {
            setData( new Array(12).fill(null).map((_, index) => ({ id: index.toString(), word: '' })))
            setIsPasted(false)
            dispatch(setIsSeedPhraseVerified(false));
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TextInput
                style={styles.itemInput}
                value={item.word}
                onChangeText={(text) => handleTextChange(text, item.id)}
                placeholderTextColor={Color.seedPhrasePlaceholder} />
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
                    contentContainerStyle={styles.flatListContainer} />


                <View style={[styles.buttonContainer, {
                    alignSelf: 'center',
                    justifyContent: isPasted ? 'space-between' : 'center'
                }]}>
                    {isPasted && <TouchableOpacity style={[styles.copyButton, { marginBottom: Responsive.size60 }]} onPress={clear}>
                        <Text style={styles.copyText}>{strings.clear}</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity
                        disabled={isPasted}
                        style={[
                            styles.copyButton,
                            {
                                marginBottom: Responsive.size60,
                                borderWidth: Responsive.size0,
                                backgroundColor: isPasted ? Color.pastegreen : Color.orangeOpacityBg
                            },

                        ]}
                        onPress={handlePaste}>
                        <Text style={[styles.copyText, { color: isPasted ? Color.successgreen : Color.orangeButton }]}>{isPasted ? strings.pasted : strings.paste}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default SeedPhraseVerification;