import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { SENDORDINALS } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { copytint, orangeButton, white } from "@values/color";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../sendings/styles";

const IncriptionDetails = () => {

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.incriptionDetails}</Text>
                <Image style={styles.incriptionImage} source={localAssets.incriptionsample} />

                <View style={styles.item}>
                    <Text style={styles.text}>{'Inscription 8325428'}</Text>
                    <View style={styles.ordinalsContainer}>
                        <Text style={styles.ordinalsText}>{strings.ordinals}</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <Text style={styles.text}>{strings.owner}</Text>
                    <TouchableOpacity style={styles.ownerContainer} onPress={()=>console.log('copy')}>
                        <Text style={styles.addressText}>{'1Lbcfr7s...LK4ZnX71'}</Text>
                        <Image style={styles.copyIcon} source={localAssets.copy} tintColor={copytint}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.send}
                    onPress={() => push(SENDORDINALS)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    width={'100%'}
                    height={Responsive.size45} />
            </View>
        </View>
    );
};

export default IncriptionDetails;
