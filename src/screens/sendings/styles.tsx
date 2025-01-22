import { Platform, StyleSheet } from "react-native";
import { Responsive } from "@utils/Responsive";
import { backbackgroundbg, black, borderLineSeedphrase, erroryellow, grayText, listBordercolor, nftcategoryText, orangeButton, orangeOpacityBg, red, selectedCategory, unselectedcategory, viewbutton, white, yellowopacity } from "@values/color";
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

    topContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        marginTop: Responsive.size20
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
    subTitle: {
        color: orangeButton,
        fontSize: Responsive.size18,
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
    item: {
        flexDirection: "row",
        padding: Responsive.size16,
        backgroundColor: listBordercolor,
        borderRadius: Responsive.size10,
        marginTop: Responsive.size18,
        justifyContent: "space-between",
        alignContent:'center',
        borderWidth: Responsive.size2,
        borderColor: borderLineSeedphrase,
    },
    assetItem: {
        flexDirection: "row",
        padding: Responsive.size10,
        marginTop: Responsive.size14,
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
         alignSelf:'center'
    },
    loader: {

        justifyContent: "center",
        alignItems: "center",
    },
    value: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: white,
       
    },
    subValue: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: nftcategoryText,
        marginLeft: Responsive.size4,
         marginTop: Platform.OS ==='ios' ? Responsive.size4:0
    },
    valueContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center'
    },

    input: {
        marginTop: Responsive.size10,
        marginBottom: Responsive.size10,
    },
    inputContainer:{
        marginTop:Responsive.size10
    },

    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
        padding: Responsive.size18
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
    horizontalButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: Responsive.size20,
        marginHorizontal: Responsive.size18
    },

    sendIconBakcground:{
        height: Responsive.size40,
        width: Responsive.size40,
        borderRadius: Responsive.size20,
        backgroundColor:orangeOpacityBg,
        justifyContent:'center',
        alignItems:'center'
    },
    sendIcon:{
        height: Responsive.size24,
        width: Responsive.size24,
    },
    warningText:{
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size12,
        color: orangeButton,
        margin:Responsive.size18,
        lineHeight: Responsive.size14
    },
    warningMessage:{
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: nftcategoryText
    },
    sendingHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:orangeButton,     
        padding: Responsive.size16,
        alignContent:'center',
        borderTopLeftRadius:Responsive.size16,
        borderTopRightRadius: Responsive.size16
    },
   
      pasteText:{
        fontSize: Responsive.size14,
        color:orangeButton,
        fontFamily: Fonts.regular,
        backgroundColor: orangeOpacityBg,
        borderRadius: Responsive.size15,
        padding: Responsive.size8
      },

      errorContainer:{
        justifyContent:'space-between',
        flexDirection:'row',

      },
      errorMessage:{
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: erroryellow
      },
      balanceText:{
        borderRadius: Responsive.size5,
        borderWidth: Responsive.size1,
        borderColor:borderLineSeedphrase,
        backgroundColor: listBordercolor,
        fontSize: Responsive.size12,
        color: white,
        padding: Responsive.size4
      },
      rightFeestext1:{
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: white
      },

      rightFeestext2:{
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: nftcategoryText
      },
      categoryButton: {
        paddingHorizontal: Responsive.size12,
        paddingVertical: Responsive.size8,
        backgroundColor: unselectedcategory,
        borderRadius: Responsive.size16,
        marginRight: Responsive.size8,
      },
      selectedCategory: {
        backgroundColor: orangeOpacityBg,
      },
      categoryText: {
        color: nftcategoryText,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
      },
      selectedCategoryText: {
        color: orangeButton,
        fontFamily: Fonts.semibold,
      },

      categoryContainer: {
        flexDirection: "row",
        marginVertical: Responsive.size16,
        width: "100%",
      },

      incriptionImage:{
        height: Responsive.size200,
        width:Responsive.size200,
        marginTop: Responsive.size10,
        borderRadius: Responsive.size18,
        alignSelf:'center'
      },
    ordinalsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: yellowopacity,
        borderRadius:Responsive.size15,
        borderWidth: Responsive.size1,
        borderColor: erroryellow,
        padding: Responsive.size6
    },
    ordinalsText: {
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size12,
        color: erroryellow
    },
    ownerContainer: {

        flexDirection:'row',
        justifyContent: 'center',
        alignContent:'center',
       
    },
   addressText: {
        fontFamily: Fonts.regular,
        color:orangeButton,
        fontSize: Responsive.size12,
        alignSelf:'center',
        textDecorationLine: 'underline',
    },
    copyIcon:{
        height:Responsive.size11,
        width: Responsive.size11,
        marginLeft: Responsive.size5,
         alignSelf:'center'
    },
    importantText:{
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size12,
        color: orangeButton,
        margin:Responsive.size18,
        lineHeight: Responsive.size14
    },
    importantMessage:{
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: orangeButton
    },
    transactionIcon :{
        height: Responsive.size40,
        width: Responsive.size40,
    },
    transactionItem: {
        flexDirection: "row",
        padding: Responsive.size16,
        backgroundColor: listBordercolor,
        borderRadius: Responsive.size10,
        marginTop: Responsive.size18,
        alignContent:'center',
        justifyContent:'space-between',
        borderWidth: Responsive.size2,
        borderColor: borderLineSeedphrase,
    },
    transactionTitleContainer: {
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    transactionValueContainer: {
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    transactionProgressContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    transactionVectorBackground:{
        height: Responsive.size100,
        width:Responsive.size100,
       justifyContent:'center',
        alignItems:'center',
    },
    transactionVectorIcon:{
        height: Responsive.size48,
        width:Responsive.size48,
       
    },
    transactionVectorIconDone:{
        height: Responsive.size40,
        width:Responsive.size56,
      
       
    },
    transactionTitle: {
        color: orangeButton,
        fontSize: Responsive.size24,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    transactionDescription: {
        color: white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size24,
        marginTop: Responsive.size10,
        textAlign:'center'
    },
    stepContainer: {
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: backbackgroundbg,
        width: "90%",
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size12,
        borderRadius: Responsive.size8,
        justifyContent: "space-between",
        marginVertical: Responsive.size18,
        alignSelf:'center'
    },
    stepText: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size14,
        color: white,
    },
    progressBarContainer: {
        height: Responsive.size5,
        width: "40%",
        backgroundColor: black,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
    },
    progressBar: {
        height: "100%",
        backgroundColor: orangeButton,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: Responsive.size20,
    },
    feesTextRight:{
        fontSize: Responsive.size12,
        color:white,
        fontFamily: Fonts.regular,
      },

    feesTextRight1:{
        fontSize: Responsive.size12,
        color:nftcategoryText,
        fontFamily: Fonts.regular,
      },
});