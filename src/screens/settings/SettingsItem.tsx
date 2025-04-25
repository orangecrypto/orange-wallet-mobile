import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { push, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import useSeedVault from "@hooks/useSeedVault";
import { styles } from "./styles";


const availableRoutes = [
    "Network",
    "Currency",
    "Update Password",
    "Backup Wallet",
    "Restore Assets",
    "Reset Wallet",
];

const cmsRoutes = ["Terms of Service", "Privacy Policy", "Support"];

const SettingsItem = ({ item }) => {
    const { lockVault } = useSeedVault();

    const handlePress = async () => {
        if (availableRoutes.includes(item.name)) return push(item.name);
        if (cmsRoutes.includes(item.name)) return push("Cms", { title: item.name, url: item.url });
        if (item.name === "Lock Wallet") {
            try {
                await lockVault();
                resetNavigation(RouteType.LOGIN);
            } catch (error) {
                console.log("Lock Wallet", error);
            }
        }
    };

    return (
        <TouchableOpacity style={styles.item} onPress={handlePress}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.value}>{item.value}</Text>
        </TouchableOpacity>
    );
};

export default SettingsItem;
