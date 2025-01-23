import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { styles } from "./styles";
import { RouteType } from "@routes/RouteType";

const Settings = () => {
    const [settingsArray, setSettingsArray] = useState([
        { id: 1, name: "Version", value: "1.1.7" },
        { id: 2, name: "Network", value: "Mainnet" },
        { id: 3, name: "Currency", value: "CAD" },
        { id: 5, name: "Update Password", value: "" },
        { id: 6, name: "Backup Wallet", value: "" },
        { id: 7, name: "Restore Assets", value: "" },
        { id: 8, name: "Lock Wallet", value: "" },
        { id: 9, name: "Reset Wallet", value: "" },
        { id: 10, name: "Terms of Service", value: "", url: "https://docs.orangecrypto.com/legal/terms-of-service" },
        { id: 11, name: "Privacy Policy", value: "", url: "https://docs.orangecrypto.com/legal/privacy-policy" },
        { id: 12, name: "Support", value: "", url: "https://docs.orangecrypto.com/orange-wallet" },
    ]);

    const availableRoutes = [
        "Network",
        "Currency",
        "Update Password",
        "Backup Wallet",
        "Restore Assets",
        "Reset Wallet",
    ];

    const cmsRoutes = ["Terms of Service", "Privacy Policy", "Support"];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                if (availableRoutes.includes(item.name)) {
                    push(item.name); 
                } else if (cmsRoutes.includes(item.name)) {
                    push("Cms", { title: item.name, url: item.url }); 
                }
                else if (item.name === "Lock Wallet") {
                    resetNavigation(RouteType.LOGIN)
                }
                else {
                    console.warn(`Route "${item.name}" is not available.`);
                }
            }}
        >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.value}>{item.value}</Text>
        </TouchableOpacity>
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
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

export default Settings;
