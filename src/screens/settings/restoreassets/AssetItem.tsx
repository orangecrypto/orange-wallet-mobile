import { Color } from "@values/color";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { styles } from "../styles";
import { localAssets } from "@assets/assets";
import { Responsive } from "@utils/Responsive";

const AssetItem = ({ item, onSelect, isSelected }) => {

    return (
        <TouchableOpacity
            style={[
                styles.assetItem,
                isSelected && { borderColor: Color.orangeButton, borderWidth: Responsive.size2 },
            ]}
            onPress={() => onSelect(item)}>
            <View style={styles.assetContainer}>

                {item.content_type?.startsWith('image/') ?
                    <Image
                        source={{
                            uri: `https://api.hiro.so/ordinals/v1/inscriptions/${item.id}/content`,
                        }}
                        style={styles.letIcon}
                        resizeMode="contain" />
                    :
                    <View style={styles.nonImageView}>
                        <Text style={styles.nonImageViewText}>{`#${item.number}`}</Text>
                    </View>

                }
                <View style={styles.assetDetails}>
                    <Text style={styles.assetName}>{item.number}</Text>
                </View>
            </View>
            <View style={styles.assetValues}>
                {/* <Text style={styles.assetQuantity}>{item.quantity}</Text> */}
                <Text style={styles.assetValue}>{item.value + ' sats'}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default AssetItem