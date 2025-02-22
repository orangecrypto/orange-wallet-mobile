import { localAssets } from "@assets/assets";
import { Color } from "@values/color";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const RenderTransactions = ({ item, selectedItem, handleItemClick }) => {
    return (
        <TouchableOpacity onPress={() => handleItemClick(item)} style={[
            styles.listItem,
            selectedItem?.id === item.id && { backgroundColor: Color.transactionListBackground },
        ]}>
            <View style={styles.assetContainer}>
           <Image source={localAssets.bitcoinicon} style={styles.letIcon}/>
            <View style={styles.assetDetails}>
                <Text style={styles.assetName}>{item.name}</Text>
                <Text style={styles.assetCategory}>{item.category}</Text>
            </View>
            </View>
            <View style={styles.assetValues}>
                <Text style={styles.assetQuantity}>{parseFloat(item.balance).toFixed(0)}</Text>
                <Text style={styles.assetValue}>{item.tokenFiatRate!== undefined ? `$${item.tokenFiatRate}`:'$ 0.00'}</Text>
            </View>
        </TouchableOpacity>
    );
};
export default RenderTransactions;
