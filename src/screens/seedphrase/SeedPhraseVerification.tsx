import { str2buf } from "@orangecryptohq/orangeseed";
import Clipboard from "@react-native-clipboard/clipboard";
import { Dispatch } from "@reduxjs/toolkit";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import bip39 from 'react-native-bip39';
import { useSelector } from "react-redux";
import useSeedVault from '@hooks/useSeedVault';
import { useAppDispatch } from "@redux/store";
import { seedPhraseReducerType, setDisabled, setIsSeedPhraseVerified } from "@redux/slice/SeedPhraseReducer";
import { styles } from './styles';
const SeedPhraseVerification = () => {

    const dispatch: Dispatch = useAppDispatch();
    const { isRestoreWallet } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer);
    const [data, setData] = useState(
        new Array(12).fill(null).map((_, index) => ({ id: index.toString(), word: '' }))
    );
    const [isPasted, setIsPasted] = useState(false);
    const { getSeed, init: initSeedVault, storeSeed, hasSeed, clearVaultStorage } = useSeedVault()

    const handlePaste = async () => {
        const words = await Clipboard.getString()
        const splitWords = words.split(' ');
        const newData = data.map((item, index) => ({
            ...item,
            word: splitWords[index] || ''
        }));
        setData(newData);
        setIsPasted(true);
    };

    const validateMnemonic = useCallback(
        (seed: string[]) => {
            const seedStr = seed.map((e) => e.trim()).join(' ');
            if (bip39.validateMnemonic(seedStr)) {
                return true;
            }
            return false;
        }, []);

    useEffect(() => {
        dispatch(setDisabled(true));
        const allFilled = data.every(item => item.word.trim() !== '');
        dispatch(setDisabled(!allFilled));
        isRestoreWallet ? handleRestoreWallet() : verifySeed();
    }, [data]);

    const handleRestoreWallet = async () => {
        const wordsArray = data.map(item => item.word);
        const validationResult = validateMnemonic(wordsArray);

        if (validationResult) {
            (await hasSeed()) && (await clearVaultStorage());
            await initSeedVault(str2buf(''));
            await storeSeed(wordsArray.join(" "));
            dispatch(setIsSeedPhraseVerified(true));
        } else {
            dispatch(setIsSeedPhraseVerified(false));
        }
    };

    const verifySeed = async () => {
        const words = await getSeed();
        const myWords = words.split(' ');
        const isMatched = data.length === myWords.length &&
            data.every(item => myWords.includes(item.word)) &&
            myWords.every(word => data.some(item => item.word === word));
        dispatch(setIsSeedPhraseVerified(isMatched));
    };

    const handleTextChange = (text, id) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, word: text } : item
        );
        setData(newData);
    };

    const clear = () => {
        setData(new Array(12).fill(null).map((_, index) => ({ id: index.toString(), word: '' })))
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