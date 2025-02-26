import { localAssets } from "@assets/assets";
import { Color } from "@values/color";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Responsive } from "@utils/Responsive";

const TokenItem = ({ item, selectedItem, handleItemClick }) => {
    return (
        <TouchableOpacity onPress={() => handleItemClick(item)} style={[
            styles.listItem,
            selectedItem?.id === item.id && { backgroundColor: Color.transactionListBackground },
        ]}>
            <View style={styles.assetContainer}>
           <Image source={localAssets.bitcoinicon} style={styles.letIcon}/>
            <View style={styles.assetDetails}>
                <Text numberOfLines={1} style={[styles.assetName,{width:Responsive.size100}]}>{item.name}</Text>
                <Text style={styles.assetCategory}>{item.protocol}</Text>
            </View>
            </View>
            <View style={styles.assetValues}>
                <Text numberOfLines={1} style={[styles.assetQuantity,{width : Responsive.size100, textAlign:'right'}]}>{item.balance!== undefined ? parseFloat(item.balance).toFixed(5): '0.00000'}</Text>
                <Text numberOfLines={1} style={styles.assetValue}>{item.tokenFiatRate!== undefined ? `$${item.tokenFiatRate}`:'$ 0.00'}</Text>
            </View>
        </TouchableOpacity>
    );
};
export default TokenItem;
