import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import Clipboard from "@react-native-clipboard/clipboard";
import useSeedVault from "@hooks/useSeedVault";
import { Color } from "@values/color";
import { Responsive } from "@utils/Responsive";

const CopySeedPhrase = () => {

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
    };

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, { borderColor: Color.black }]}>
            <Text style={[styles.itemText, { textAlign: 'left' }]}>{item.word}</Text>
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
                <Text style={[styles.description, { lineHeight: Responsive.size22 }]}>{strings.seedPhraseMessage}</Text>
                <View style={{ flex: 1 }}>
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
export default CopySeedPhrase;