import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { localAssets } from "@assets/assets";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { styles } from './styles';
import TokenImage from "@components/TokenImage";
import { formatCurrencyWithCommas, getImageSource } from "@utils/cryptoUtils";

const RenderAssets = ({ item, selectedItem, handleItemClick, clickDisable }) => {
    const [imageSource, setImageSource] = useState(null);
    const isSelected = selectedItem?.id === item.id;

    useEffect(() => {
        const loadImage = async () => {
            if (typeof item?.name === 'string') {
                const source = await getImageSource(item.name);

                console.log(item.name ,source )
                setImageSource(source);
            }
        };
        loadImage();
    }, [item?.name]);

    const price = typeof item?.price === 'number' ? item.price.toFixed(2) : '0.00';
    const percentChange = typeof item?.percent_change_1h === 'number' ? item.percent_change_1h.toFixed(2) + '%' : '0.00%';

    return (
        <TouchableOpacity
            disabled={clickDisable}
            onPress={() => handleItemClick(item)}
            style={[
                styles.listItem,
                isSelected && { backgroundColor: Color.transactionListBackground }
            ]}
        >
            <View style={styles.assetContainer}>
                {imageSource
                    ? <Image source={imageSource} style={styles.letIcon} />
                    : <TokenImage fungibleToken={item} size={36} round variant="dark" />
                }

                <View style={styles.assetDetails}>
                    <Text
                        numberOfLines={1}
                        style={[styles.assetName, isSelected && { color: Color.orangeButton }]}>
                        {item?.name || 'Unnamed Token'}
                    </Text>
                    <Text numberOfLines={1} style={styles.assetCategory}>
                        {item?.symbol || 'N/A'}
                    </Text>
                </View>
            </View>

            <View style={styles.assetValues}>
                <Text
                    style={[styles.price, isSelected && { color: Color.orangeButton }]}>
                    {formatCurrencyWithCommas(price)}
                </Text>
                <Text
                    style={[
                        styles.price,
                        isSelected && { color: Color.orangeButton }
                    ]}>
                    {percentChange}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default RenderAssets;
