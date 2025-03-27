import { localAssets } from "@assets/assets";
import { Responsive } from '@utils/Responsive';
import { Color } from "@values/color";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from './styles';

const RenderAssets = ({ item, selectedItem, handleItemClick }) => {
    const isSelected = selectedItem?.id === item.id;

    return (
        <TouchableOpacity 
            onPress={() => handleItemClick(item)} 
            style={[
                styles.listItem,
                isSelected && { backgroundColor: Color.transactionListBackground }]}>
            <View style={styles.assetContainer}>
                <Image source={localAssets.bitcoinicon} style={styles.letIcon} />
                <View style={styles.assetDetails}>
                    <Text 
                        numberOfLines={1}
                        style={[
                            styles.assetName, 
                            isSelected && { color: Color.orangeButton }]}>{item.name} </Text>
                    <Text  numberOfLines={1} style={styles.assetCategory}>{item.symbol}</Text>
                </View>
            </View>
            <View style={styles.assetValues}>
                <Text 
                    style={[
                        styles.price, 
                        isSelected && { color: Color.orangeButton }]}>{'$ '+item?.price?.toFixed(2)}</Text>
                <Text 
                    style={[
                        styles.price, 
                        isSelected && { color: Color.orangeButton },
                        { marginLeft: Responsive.size10 }]}>{item?.percent_change_1h?.toFixed(2)+'%'}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default RenderAssets;
