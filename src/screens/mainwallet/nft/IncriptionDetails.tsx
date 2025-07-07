import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from '../../sendings/styles'
import useAddressInscription from "@hooks/useAddressInscription";
import Loader from "@components/Loader";
import { truncateAddress } from "@utils/cryptoUtils";
import useOrdinalData from "@hooks/useOrdinalData";


const IncriptionDetails = ({ route }) => {

    //const { data, isPending , isError} = useAddressInscription(route?.params?.item?.id)
    const { data, error, isPending } = useOrdinalData('619e1911ebc96b2ebffdfe3c0a90bbc4cbebf92fae39f0910a41aef2bbf4ead1i0');

    console.log('IncriptionDetails', data)

    return (
        <View style={styles.container}>
            {isPending && <Loader loading={isPending} />}
            <View style={styles.contentContainer}>
                <TouchableOpacity style={[styles.button,{marginTop: Responsive.size50}]} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.incriptionDetails}</Text>

                {route?.params?.item?.content_type?.startsWith('image/') ?
                    <Image style={styles.incriptionImage}

                        source={{
                            uri: `https://api.hiro.so/ordinals/v1/inscriptions/${data?.id}/content`
                        }}
                        resizeMode='contain' /> :
                    <View style={styles.nonImageView}>
                        <Text style={styles.nonImageViewText}>{`#${route?.params?.item?.number}`}</Text>
                    </View>
                }
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
