import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { styles } from "../styles";
import React, { useState, useEffect, useRef } from 'react';
import NftPlaceholder from "@components/NftPlaceholder";

const AssetItem = ({ item, onSelect, isSelected }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const loadingTimeoutRef = useRef(null);

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
        setImageError(false);
        // Set timeout to force hide loader after 10 seconds
        loadingTimeoutRef.current = setTimeout(() => {
            console.log('Image loading timeout for asset:', item.id);
            setImageLoading(false);
            setImageError(true);
        }, 10000);
    };

    const handleLoadEnd = () => {
        setImageLoading(false);
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }
    };

    const handleLoadError = (error) => {
        console.log('Image loading error for asset:', item.id, error);
        setImageLoading(false);
        setImageError(true);
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.assetItem,
                isSelected && { borderColor: Color.orangeButton, borderWidth: Responsive.size2 },
            ]}
            onPress={() => onSelect(item)}>
            <View style={styles.assetContainer}>

                {item.content_type?.startsWith('image/') ? (
                    <View style={{ position: 'relative' }}>
                        {imageError ? (
                            <NftPlaceholder
                                width={styles.letIcon.width || 60}
                                height={styles.letIcon.height || 60}
                                style={styles.letIcon}
                            />
                        ) : (
                            <Image
                                source={{
                                    uri: `https://api.hiro.so/ordinals/v1/inscriptions/${item.id}/content`,
                                }}
                                style={styles.letIcon}
                                resizeMode="contain"
                                onLoadStart={handleLoadStart}
                                onLoadEnd={handleLoadEnd}
                                onError={handleLoadError}
                            />
                        )}
                        {imageLoading && !imageError && (
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <ActivityIndicator size="small" color={Color.orangeButton} />
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={styles.nonImageView}>
                        <Text style={styles.nonImageViewText}>{`#${item.number}`}</Text>
                    </View>
                )}
                <View style={styles.assetDetails}>
                    <Text style={styles.assetName}>{item.number}</Text>
                </View>
            </View>
            <View style={styles.assetValues}>
                <Text style={styles.assetValue}>{item.value + ' sats'}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default AssetItem