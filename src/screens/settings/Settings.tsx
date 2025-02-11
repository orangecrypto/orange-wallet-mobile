import useSeedVault from '@hooks/useSeedVault';
import { useFocusEffect } from "@react-navigation/native";
import { store } from "@redux/store";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import SettingsItem from "./SettingsItem";
import { styles } from "./styles";

const Settings = () => {
    const [settingsArray, setSettingsArray] = useState([]);

    const loadSettings = () => {
        setSettingsArray([
            { id: 1, name: "Version", value: "1.1.7" },
            { id: 2, name: "Network", value: store.getState().appReducer.network?.type },
            { id: 3, name: "Currency", value: store.getState().appReducer.currency.type},
            { id: 5, name: "Update Password", value: "" },
            { id: 6, name: "Backup Wallet", value: "" },
            { id: 7, name: "Restore Assets", value: "" },
            { id: 8, name: "Lock Wallet", value: "" },
            { id: 9, name: "Reset Wallet", value: "" },
            { id: 10, name: "Terms of Service", value: "", url: "https://docs.orangecrypto.com/legal/terms-of-service" },
            { id: 11, name: "Privacy Policy", value: "", url: "https://docs.orangecrypto.com/legal/privacy-policy" },
            { id: 12, name: "Support", value: "", url: "https://docs.orangecrypto.com/orange-wallet" },
        ]);
    };

    

    useFocusEffect(
        useCallback(() => {
            loadSettings();
        }, [])
    );

 return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.settings}</Text>
                <Text style={styles.description}>{strings.settingsMessage}</Text>
                <FlatList
                    data={settingsArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <SettingsItem item={item} />}
                    />
            </View>
        </View>
    );
};
export default Settings;