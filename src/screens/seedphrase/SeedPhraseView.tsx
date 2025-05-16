import Clipboard from '@react-native-clipboard/clipboard';
import { Dispatch } from "@reduxjs/toolkit";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import useSeedVault from '@hooks/useSeedVault';
import { useAppDispatch } from "@redux/store";
import { setDisabled } from "@redux/slice/SeedPhraseReducer";
import { styles } from "./styles";
const SeedPhraseView = () => {

    const dispatch: Dispatch = useAppDispatch()
    const { getSeed } = useSeedVault()
    const [seedPhrase, setSeedPhrase] = useState([]);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const fetchSeed = async () => {
            try {
                const strings = await getSeed();
                const words = strings.split(" ").map((word, index) => ({ id: index + 1, word }));
                setSeedPhrase(words)
            } catch (error) {
                console.error("Error fetching seed:", error);
            }
        };
        fetchSeed();
    }, []);

    const handleOverlayClose = () => {
        setShowOverlay(false); 
    };
    
    const handleCopy = () => {
        const phrase = seedPhrase.map(item => item.word).join(' ');
        Clipboard.setString(phrase);
        setIsCopied(true)
        dispatch(setDisabled(false))
    };

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, { borderColor: Color.black }]}>
            <Text style={styles.itemText}>{item.word}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.speedPhrase}</Text>
                <Text style={styles.reviewText}>{strings.speedPhraseDescription} </Text>
                <View style={{ flex: 1 , marginTop: Responsive.size10}}>
                    <FlatList
                        data={seedPhrase}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        contentContainerStyle={[styles.flatListContainer, { borderWidth: Responsive.size1, borderColor: Color.seedPhraseItemBorder, opacity: showOverlay ? 0.2 : 1 }]} />
                </View>

                {showOverlay && (
                    <View style={styles.overlay}>
                        <TouchableOpacity onPress={handleOverlayClose} style={styles.copyButton}>
                            <Text style={styles.copyText}>{strings.showSeedphrase}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!showOverlay && <TouchableOpacity style={[styles.copyButton, { marginBottom: Responsive.size60 }]} onPress={handleCopy} disabled={isCopied}>
                    <Text style={styles.copyText}>{isCopied ? strings.copied : strings.copy}</Text>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

export default SeedPhraseView;