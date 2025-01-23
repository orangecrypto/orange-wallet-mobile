import { Color } from "@values/color";
import { Fonts } from '@values/fonts';
import { Responsive } from '@utils/Responsive';
import { Text, TouchableOpacity, View, StyleSheet, Image, Platform } from "react-native";
import { localAssets } from "@assets/assets";

const RenderTransactions = ({ item, selectedItem, handleItemClick }) => {
    return (
        <TouchableOpacity onPress={() => handleItemClick(item)} style={[
            styles.listItem,
            selectedItem?.id === item.id && { backgroundColor: Color.transactionListBackground },
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
        backgroundColor: Color.transactionListBackground,
        borderBottomColor: Color.gray,
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
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.semibold
    },
    assetCategory: {
        color: Color.grayText,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
        marginTop: Platform.OS ==='ios' ? Responsive.size4:0
    },
    assetValues: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    assetQuantity: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.bold
    },
    assetValue: {
        color: Color.white,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular
    },

    letIcon:{
        height: Responsive.size32,
        width: Responsive.size32
    }
});

export default RenderTransactions;
