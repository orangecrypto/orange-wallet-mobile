import CommonButton from "@components/CommonButton";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { HOME_SCREEN, VIEWQR } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { orangeButton, white } from "@values/color";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { localAssets } from "@assets/assets";

const Receive = () => {

    const [addressArray, setAddressArray] = useState([
        { id: 1, name: "Bitcoin", },
        { id: 2, name: "Ordinals and BRC20", },
        { id: 3, name: "Stacks and SIP10", }

    ]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.rightItemContainer}>
                <TouchableOpacity  style={styles.rightItemIconContaner} onPress={()=>{console.log('Copy click')}}>
                <Image style={styles.rightItemIcon} source={localAssets.copy} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightItemIconContaner} onPress={()=>{push(VIEWQR)}}>
                <Image style={styles.rightItemIcon} source={localAssets.qr} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.receive}</Text>
                <Text style={styles.description}>{strings.receiveMessage}</Text>
                <FlatList
                    data={addressArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem} />
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.close}
                    onPress={() => resetNavigation(HOME_SCREEN)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default Receive;
