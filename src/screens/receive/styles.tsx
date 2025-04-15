import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: Responsive.size18,
    },

    button: {
        backgroundColor: Color.backbackgroundbg,
        width: Responsive.size70,
        justifyContent: "center",
        alignItems: "center",
        padding: Responsive.size10,
        borderRadius: Responsive.size8,
        marginTop: Responsive.size50,
    },
    buttonText: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
    },
    title: {
        color: Color.orangeButton,
        fontSize: Responsive.size32,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },

    description: {
        color: Color.white,
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
        backgroundColor: Color.listBordercolor,
        borderRadius: Responsive.size10,
        marginTop: Responsive.size18,
        justifyContent: "space-between",
        alignContent: 'center',
        borderWidth: Responsive.size2,
        borderColor: Color.borderLineSeedphrase,
    },
    text: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        color: Color.white,
        alignSelf: 'center',
        width:'70%'
    },

    rightItemContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
         width:'30%'
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
        color: Color.orangeButton,
        margin: Responsive.size18,
        lineHeight: Responsive.size14
    },
    warningMessage: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size14,
        color: Color.nftcategoryText
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
        color:Color.white,
        marginTop: Responsive.size18,
        lineHeight: Responsive.size32
    },
    qrView:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.white,
        padding:Responsive.size10,
        marginTop:Responsive.size10,
        borderRadius:Responsive.size10,
        alignSelf:'center'
    },

    horizontalButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: Responsive.size20,
        marginHorizontal: Responsive.size18
    },

});