import CommonButton from "@components/CommonButton";
import { goBack, push, resetNavigation } from "@routes/Navigator";
import { RouteType} from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { localAssets } from "@assets/assets";
import { store } from "../../redux/store";
import Clipboard from "@react-native-clipboard/clipboard";

const Receive = () => {

    const account =store.getState().appReducer.account
    const [addressArray, setAddressArray] = useState([
        { id: 1, name: "Bitcoin", address : account?.btcAddress },
        { id: 2, name: "Ordinals and BRC20",address : account?.ordinalsAddress },
        { id: 3, name: "Stacks and SIP10",address : account?.stxAddress }

    ]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.rightItemContainer}>
                <TouchableOpacity  style={styles.rightItemIconContaner} onPress={()=>{ Clipboard.setString(item?.address)}}>
                <Image style={styles.rightItemIcon} source={localAssets.copy} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightItemIconContaner} onPress={()=>{push(RouteType.VIEWQR,{ item : item})}}>
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
                    onPress={() => resetNavigation(RouteType.HOME_SCREEN)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default Receive;
