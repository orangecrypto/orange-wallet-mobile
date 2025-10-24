import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Image, Text, View, ActivityIndicator } from 'react-native';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { styles } from './styels';
import { Color } from '@values/color';

const NftItem = ({ item }) => {
    const [imageLoading, setImageLoading] = useState(false);
    const loadingTimeoutRef = useRef(null);

    const handlePress = () => {
        if (item.collection_id) {
            console.log("Item has a collection_id:", item);
        } else {
            push(RouteType.INCRIPTIONDETAILS, { item :item?.thumbnail_inscriptions[0]});
        }
    };

    useEffect(() => {
        // Cleanup timeout on unmount
        return () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, []);

    const handleLoadStart = () => {
        setImageLoading(true);
        // Set timeout to force hide loader after 10 seconds
        loadingTimeoutRef.current = setTimeout(() => {
            console.log('Image loading timeout - forcing loader to hide');
            setImageLoading(false);
        }, 10000);
    };

    const handleLoadEnd = () => {
        setImageLoading(false);
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }
    };

    const handleLoadError = () => {
        setImageLoading(false);
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }
    };

    const renderOrdinalContent = () => {
        const contentType = item.thumbnail_inscriptions[0].content_type;
        const ordinalId = item.thumbnail_inscriptions[0].id;

        // Use same /content URL for both images and text/html
        const imageUri = `https://api.hiro.so/ordinals/v1/inscriptions/${ordinalId}/content`;

        // Render both images and text/html as images
        if (contentType?.startsWith('image/') || contentType?.startsWith('text/html')) {
            return (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                        resizeMode="contain"
                        onLoadStart={handleLoadStart}
                        onLoadEnd={handleLoadEnd}
                        onError={handleLoadError} />
                    {imageLoading && (
                        <View style={styles.imageLoadingContainer}>
                            <ActivityIndicator size="small" color={Color.orangeButton} />
                        </View>
                    )}
                </View>
            );
        } else {
            return (
                <View style={styles.nonImageView}>
                    <Text style={styles.nonImageViewText}>{`#${item.thumbnail_inscriptions[0].number}`}</Text>
                </View>
            );
        }
    };

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={handlePress}>

            {renderOrdinalContent()}

            <Text style={styles.nftItemTitle}>{!item?.collection_id ? `#${item.thumbnail_inscriptions[0].number}` : `${item.collection_name} #${item.thumbnail_inscriptions[0].number}`}</Text>
            {/* <Text style={styles.subtype}>{item.subtype}</Text> */}
        </TouchableOpacity>
    );
};

export default NftItem;