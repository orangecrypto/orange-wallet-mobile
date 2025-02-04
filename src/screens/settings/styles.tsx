import { StyleSheet } from "react-native";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center', // Center vertically
        alignItems: 'center',      // Center horizontally
        backgroundColor: 'transparent', // Ensure background is transparent
        zIndex: 9999, // Make sure the loader is on top of other content
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
        fontSize: Responsive.size24,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    subTitle: {
        color: Color.orangeButton,
        fontSize: Responsive.size20,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    description: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size20,
        marginTop:Responsive.size10
    },
    item: {
        flexDirection: "row",
        padding: Responsive.size16,
        backgroundColor: Color.listBordercolor,
        borderRadius: Responsive.size10,
        marginVertical: Responsive.size10,
        justifyContent: "space-between",
        borderWidth: Responsive.size2,
        borderColor: Color.borderLineSeedphrase,
    },
    assetItem: {
        flexDirection: "row",
        padding:Responsive.size10,
        marginTop:Responsive.size14,
        backgroundColor: Color.listBordercolor,
        borderRadius: Responsive.size10,
        justifyContent: "space-between",
        borderWidth: Responsive.size2,
        borderColor: Color.borderLineSeedphrase,
    },
    text: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        color: Color.white,
    },
    loader: {

        justifyContent: "center",
        alignItems: "center",
    },
    value: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.white,
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
        color: Color.red,
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
        backgroundColor: Color.black,
        borderRadius: Responsive.size12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.borderLineSeedphrase,
        borderWidth: Responsive.size1,

    },
    itemText: {
        color: Color.white,
        fontSize: Responsive.size14,
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        width: '100%',
    },
    flatListContainer: {
        marginTop: Responsive.size20,
        backgroundColor: Color.black,
        borderRadius: Responsive.size10,
        borderWidth: Responsive.size2,
        borderColor: Color.listBordercolor,
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
            color: Color.white,
            fontSize: Responsive.size18,
            fontFamily: Fonts.semibold
        },
        assetCategory: {
            color: Color.grayText,
            fontSize: Responsive.size14,
            fontFamily: Fonts.regular
        },
        assetValues: {
            flexDirection: "column",
            alignItems: "flex-end",
        },
        assetQuantity: {
            color: Color.white,
            fontSize: Responsive.size16,
            fontFamily: Fonts.regular
        },
        assetValue: {
            color: Color.nftcategoryText,
            fontSize: Responsive.size14,
            fontFamily: Fonts.regular
        },
    
        letIcon:{
            height: Responsive.size32,
            width: Responsive.size32
        }
});