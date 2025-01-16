import { gray, grayText, transactionListBackground, white } from "@values/color";
import { Fonts } from '@values/fonts';
import { Responsive } from '@utils/Responsive';
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { localAssets } from "@assets/assets";

const RenderTransactions = ({ item, selectedItem, handleItemClick }) => {
    return (
        <TouchableOpacity onPress={() => handleItemClick(item)} style={[
            styles.listItem,
            selectedItem?.id === item.id && { backgroundColor: transactionListBackground },
        ]}>
            <View style={styles.assetContainer}>
           <Image source={localAssets.bitcoinicon} style={styles.letIcon}/>
            <View style={styles.assetDetails}>
                <Text style={styles.assetName}>{item.name}</Text>
                <Text style={styles.assetCategory}>{item.category}</Text>
            </View>
            </View>
            <View style={styles.assetValues}>
                <Text style={styles.assetQuantity}>{item.quantity}</Text>
                <Text style={styles.assetValue}>{item.value}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: transactionListBackground,
        borderBottomColor: gray,
        borderBottomWidth: Responsive.size1,
        paddingVertical: Responsive.size10
    },

    assetContainer:{
        flexDirection:'row',
        alignContent:'center'
    },
    assetDetails: {
        flexDirection: "column",

        marginLeft: Responsive.size10
    },
    assetName: {
        color: white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.semibold
    },
    assetCategory: {
        color: grayText,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular
    },
    assetValues: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    assetQuantity: {
        color: white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.bold
    },
    assetValue: {
        color: white,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular
    },

    letIcon:{
        height: Responsive.size32,
        width: Responsive.size32
    }
});

export default RenderTransactions;
