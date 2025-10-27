import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useState, useEffect, useRef } from "react";
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { styles } from '../../sendings/styles'
import useAddressInscription from "@hooks/useAddressInscription";
import Loader from "@components/Loader";
import { truncateAddress } from "@utils/cryptoUtils";
import useOrdinalData from "@hooks/useOrdinalData";
import NftPlaceholder from "@components/NftPlaceholder";


const IncriptionDetails = ({ route }) => {
    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const loadingTimeoutRef = useRef(null);

    const { data, isPending , isError} = useAddressInscription(route?.params?.item?.id)
    //const { data, error, isPending } = useOrdinalData('619e1911ebc96b2ebffdfe3c0a90bbc4cbebf92fae39f0910a41aef2bbf4ead1i0');

    console.log('IncriptionDetails', data)

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
            console.log('Image loading timeout - forcing loader to hide');
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
        console.log('Image loading error:', error);
        setImageLoading(false);
        setImageError(true);
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }
    };

    const renderContent = () => {
        const contentType = route?.params?.item?.content_type;

        // Use same /content URL for both images and text/html
        const imageUri = `https://api.hiro.so/ordinals/v1/inscriptions/${data?.id}/content`;

        // Render both images and text/html as images
        if (contentType?.startsWith('image/') || contentType?.startsWith('text/html')) {
            return (
                <View style={styles.imageContainer}>
                    {imageError ? (
                        <NftPlaceholder style={styles.incriptionImage} />
                    ) : (
                        <Image
                            style={styles.incriptionImage}
                            source={{ uri: imageUri }}
                            resizeMode='contain'
                            onLoadStart={handleLoadStart}
                            onLoadEnd={handleLoadEnd}
                            onError={handleLoadError}
                        />
                    )}
                    {imageLoading && !imageError && (
                        <View style={styles.imageLoadingContainer}>
                            <ActivityIndicator size="large" color={Color.orangeButton} />
                        </View>
                    )}
                </View>
            );
        } else {
            // For other content types (text/plain, application/json, etc.), show inscription number
            return (
                <View style={styles.nonImageView}>
                    <Text style={styles.nonImageViewText}>{`#${route?.params?.item?.number}`}</Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            {isPending && <Loader loading={isPending} />}
            <View style={styles.contentContainer}>
                <TouchableOpacity style={[styles.button,{marginTop: Responsive.size50}]} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.incriptionDetails}</Text>

                {renderContent()}
                <View style={styles.item}>
                    <Text style={styles.text}>{`Inscription ${data?.number}`}</Text>
                    <View style={styles.ordinalsContainer}>
                        <Text style={styles.ordinalsText}>{strings.ordinals}</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <Text style={styles.text}>{strings.owner}</Text>
                    <TouchableOpacity style={styles.ownerContainer} onPress={() => console.log('copy')}>
                        <Text style={styles.addressText}>{data?.address != undefined && truncateAddress(data?.address)}</Text>
                        <Image style={styles.copyIcon} source={localAssets.copy} tintColor={Color.copytint} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.send}
                    onPress={() => push(RouteType.SENDORDINALS,{ordinalsData : data})}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default IncriptionDetails;
