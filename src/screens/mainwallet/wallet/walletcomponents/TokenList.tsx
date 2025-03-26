import { FlatList, View, Text } from "react-native";
import { styles } from "../styles";
import { strings } from "@strings/i18n";
import TokenItem from "./TokenItem";

const TokenList = ({ filteredCryptoArray, selectedItem, handleItemClick }) => {
    return (
        <FlatList
            data={filteredCryptoArray}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TokenItem item={item} selectedItem={selectedItem} handleItemClick={handleItemClick} />}
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