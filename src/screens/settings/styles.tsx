import { StyleSheet } from "react-native";
import { Responsive } from "@utils/Responsive";
import { backbackgroundbg, black, borderLineSeedphrase, grayText, listBordercolor, nftcategoryText, orangeButton, red, white } from "@values/color";
import { Fonts } from "@values/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: Responsive.size18,
    },
    button: {
        backgroundColor: backbackgroundbg,
        width: Responsive.size70,
        justifyContent: "center",
        alignItems: "center",
        padding: Responsive.size10,
        borderRadius: Responsive.size8,
        marginTop: Responsive.size50,
    },
    buttonText: {
        color: white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
    },
    title: {
        color: orangeButton,
        fontSize: Responsive.size24,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    subTitle: {
        color: orangeButton,
        fontSize: Responsive.size20,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    description: {
        color: white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size20,
        marginTop:Responsive.size10
    },
    item: {
        flexDirection: "row",
        padding: Responsive.size16,
        backgroundColor: listBordercolor,
        borderRadius: Responsive.size10,
        marginTop: Responsive.size18,
        justifyContent: "space-between",
        borderWidth: Responsive.size2,
        borderColor: borderLineSeedphrase,
    },
    assetItem: {
        flexDirection: "row",
        padding:Responsive.size10,
        marginTop:Responsive.size14,
        backgroundColor: listBordercolor,
        borderRadius: Responsive.size10,
        justifyContent: "space-between",
        borderWidth: Responsive.size2,
        borderColor: borderLineSeedphrase,
    },
    text: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        color: white,
    },
    loader: {

        justifyContent: "center",
        alignItems: "center",
    },
    value: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: white,
    },
    enterPasswordContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    passwordIcon: {
        height: Responsive.size140,
        width: Responsive.size140,
        alignSelf: 'center'
    },
    passwordError: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: red,
        lineHeight: Responsive.size18
    },
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
        padding:Responsive.size18
    },
    switchContainer: {
        justifyContent: 'flex-end',
        padding:Responsive.size18
    },
    itemContainer: {
        flex: 1,
        margin: Responsive.size12,
        width: '30%', 
        height: Responsive.size45, 
        backgroundColor: black,
        borderRadius: Responsive.size12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: borderLineSeedphrase,
        borderWidth: Responsive.size1,

    },
    itemText: {
        color: white,
        fontSize: Responsive.size14,
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        width: '100%',
    },
    flatListContainer: {
        marginTop: Responsive.size20,
        backgroundColor: black,
        borderRadius: Responsive.size10,
        borderWidth: Responsive.size2,
        borderColor: listBordercolor,
    },
    assetContainer:{
            flexDirection:'row',
            alignContent:'center'
        },
        assetDetails: {
            flexDirection: "column",
            alignItems:'center',
            justifyContent:'center',
            marginLeft: Responsive.size10
        },
        assetName: {
            color: white,
            fontSize: Responsive.size18,
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
            fontFamily: Fonts.regular
        },
        assetValue: {
            color: nftcategoryText,
            fontSize: Responsive.size14,
            fontFamily: Fonts.regular
        },
    
        letIcon:{
            height: Responsive.size32,
            width: Responsive.size32
        }
});