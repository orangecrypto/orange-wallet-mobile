import { FlatList, View, Text } from "react-native";
import { styles } from "../styles";
import { strings } from "@strings/i18n";
import TokenItem from "./TokenItem";
import { useSelector } from "react-redux";

const TokenList = ({ filteredCryptoArray, selectedItem, handleItemClick }) => {
    
    const coinSettings = useSelector((state) => state.coinSettingsSlice.coinSettings);
    const namesToAlwaysShow = ["Bitcoin", "Orange", "Stacks"];
    const visibleItems = [];
    const seenNames = new Set();
    
    filteredCryptoArray.forEach(item => {
        if (seenNames.has(item.name)) {
            return; // Skip duplicates
        }
    
        const coinSetting = coinSettings.find(setting => setting.name === item.name);
        
        if (namesToAlwaysShow.includes(item.name) || (coinSetting ? coinSetting.visible : true)) {
            visibleItems.push(item);
            seenNames.add(item.name); // Track unique names
        }
    });
    
    return (
        <FlatList
            data={visibleItems} 
            nestedScrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TokenItem item={item} selectedItem={selectedItem} handleItemClick={handleItemClick} />
            )}
            ListEmptyComponent={
                <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>{strings.noAssets}</Text>
                </View>
            }
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default TokenList;
