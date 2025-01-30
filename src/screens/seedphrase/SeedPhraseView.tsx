import { strings } from "@strings/i18n";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View} from "react-native";
import { generateMnemonic } from '@orangecryptohq/orangeseed';
import { styles } from "./styles";
import { Color } from "@values/color";
import { Responsive } from "@utils/Responsive";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { seedPhraseReducerType, setDisabled, setWords } from "./SeedPhraseReducer";
import Clipboard from '@react-native-clipboard/clipboard';


const SeedPhraseView = () => {
    const { words , disabled} = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer)
    const dispatch: Dispatch = useAppDispatch()
    const [seedPhrase, setSeedPhrase] = useState([]);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const seed = generateMnemonic();
        console.log('Generated Seed Phrase:', seed);
        const wordsArray = seed.split(' ').map((word, index) => ({
            id: (index + 1).toString(),
            word,
        }));
        setSeedPhrase(wordsArray);
    }, []);

    const handleOverlayClose = () => {
        setShowOverlay(false); // hide overlay when button is clicked
    };
    const handleCopy = () => {
        const phrase = seedPhrase.map(item => item.word).join(' '); 
        Clipboard.setString(phrase);
        dispatch(setWords(phrase))
        setIsCopied(true)
        dispatch(setDisabled(false))
    };

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, { borderColor: Color.black }]}>
            <Text style={[styles.itemText, { textAlign: 'left' }]}>{item.word}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.speedPhrase}</Text>
                <Text style={styles.reviewText}>{strings.speedPhraseVerificationDes} </Text>
                <View style={{ flex: 1 }}>
                <FlatList
                    data={seedPhrase}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    contentContainerStyle={[styles.flatListContainer, { borderWidth: Responsive.size1, borderColor: Color.seedPhraseItemBorder, opacity: showOverlay ? 0.2: 1}]} />
                </View>

                {showOverlay && (
                    <View style={styles.overlay}>
                        <TouchableOpacity onPress={handleOverlayClose} style={styles.copyButton}>
                            <Text style={styles.copyText}>{strings.showSeedphrase}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!showOverlay &&<TouchableOpacity style={[styles.copyButton, {marginBottom:Responsive.size60}]} onPress={handleCopy} disabled={isCopied}>
                    <Text style={styles.copyText}>{isCopied ? strings.copied : strings.copy}</Text>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

export default SeedPhraseView;