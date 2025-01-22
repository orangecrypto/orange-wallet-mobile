import { Responsive } from "@utils/Responsive";
import { backbackgroundbg, black, borderLineSeedphrase, listBordercolor, nftcategoryText, orangeButton, white } from "@values/color";
import { Fonts } from "@values/fonts";
import { StyleSheet } from "react-native";

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
        fontSize: Responsive.size32,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },

    description: {
        color: white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size20,
        marginTop: Responsive.size10
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
        padding: Responsive.size18
    },
    item: {
        flexDirection: "row",
        padding: Responsive.size16,
        backgroundColor: listBordercolor,
        borderRadius: Responsive.size10,
        marginTop: Responsive.size18,
        justifyContent: "space-between",
        alignContent: 'center',
        borderWidth: Responsive.size2,
        borderColor: borderLineSeedphrase,
    },
    text: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        color: white,
        alignSelf: 'center'
    },

    rightItemContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
    },
    rightItemIconContaner: {
        height: Responsive.size24,
        width: Responsive.size24,
        marginHorizontal: Responsive.size5
    },
    rightItemIcon: {
        height: Responsive.size18,
        width: Responsive.size18,
    },
    warningText: {
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size14,
        color: orangeButton,
        margin: Responsive.size18,
        lineHeight: Responsive.size14
    },
    warningMessage: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size14,
        color: nftcategoryText
    },
    qrcodeContainer:{
        height: Responsive.size130,
        width: Responsive.size130,
        alignSelf:'center',
        marginTop: Responsive.size18
    },
    qrcodeAddressText :{
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size24,
        textAlign:'center',
        color:white,
        marginTop: Responsive.size18,
        lineHeight: Responsive.size32
    }

});