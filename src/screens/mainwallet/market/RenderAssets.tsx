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
                        style={[
                            styles.assetName, 
                            isSelected && { color: Color.orangeButton }]}>{item.name} </Text>
                    <Text style={styles.assetCategory}>{item.category}</Text>
                </View>
            </View>
            <View style={styles.assetValues}>
                <Text 
                    style={[
                        styles.price, 
                        isSelected && { color: Color.orangeButton }]}>{'$26,378.67'}</Text>
                <Text 
                    style={[
                        styles.price, 
                        isSelected && { color: Color.orangeButton },
                        { marginLeft: Responsive.size10 }]}>{'0.00%'}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default RenderAssets;
