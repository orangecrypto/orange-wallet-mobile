import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { styles } from './styels';

const NftItem = ({ item }) => {

    const handlePress = () => {
        if (item.collection_id) {
            console.log("Item has a collection_id:", item);
        } else {
            push(RouteType.INCRIPTIONDETAILS, { item :item?.thumbnail_inscriptions[0]});
        }
    };


    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={handlePress}>


            {item.thumbnail_inscriptions[0].content_type?.startsWith('image/') ?
                <Image
                    source={{
                        uri: `https://api.hiro.so/ordinals/v1/inscriptions/${item.thumbnail_inscriptions[0].id}/content`,
                    }}
                    style={styles.image}
                    resizeMode="contain" />
                :
                <View style={styles.nonImageView}>
                    <Text style={styles.nonImageViewText}>{`#${item.thumbnail_inscriptions[0].number}`}</Text>
                </View>

            }
            <Text style={styles.nftItemTitle}>{!item?.collection_id ? `#${item.thumbnail_inscriptions[0].number}` : `${item.collection_name} #${item.thumbnail_inscriptions[0].number}`}</Text>
            {/* <Text style={styles.subtype}>{item.subtype}</Text> */}
        </TouchableOpacity>
    );
};

export default NftItem;
