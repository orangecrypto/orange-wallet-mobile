import TokenImage from "@components/TokenImage";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

const TokenItem = ({ item, selectedItem, handleItemClick }) => {
    return (
        <TouchableOpacity onPress={() => handleItemClick(item)} style={[
            styles.listItem,
            selectedItem?.name === item.name && { backgroundColor: Color.transactionListBackground },
        ]}>
            <View style={styles.assetContainer}>
                {item?.icon ? <Image source={item.icon} style={styles.letIcon} /> :
                    <TokenImage
                        fungibleToken={item}
                        size={40}
                        round
                        variant="dark" />
                }

                <View style={styles.assetDetails}>
                    <Text numberOfLines={1} style={[styles.assetName, { width: Responsive.size100 }]}>{item.name}</Text>
                    <Text style={styles.assetCategory}>{item.ticker}</Text>
                </View>
            </View>
            <View style={styles.assetValues}>
                <Text numberOfLines={1} style={[styles.assetQuantity, { width: Responsive.size100, textAlign: 'right' }]}>{item.balance !== undefined ? parseFloat(item.balance).toFixed(5) : '0.00000'}</Text>
                <Text numberOfLines={1} style={styles.assetValue}>{item.tokenFiatRate !== undefined ? `$${item.tokenFiatRate}` : '$ 0.00'}</Text>
            </View>
        </TouchableOpacity>
    );
};
export default TokenItem;
