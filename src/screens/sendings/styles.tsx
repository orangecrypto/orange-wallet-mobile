import { Platform, StyleSheet } from "react-native";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";

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

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: Responsive.size20
    },

    topContainerConfirmationScreen: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: Responsive.size50
    },
    button: {
        backgroundColor: Color.backbackgroundbg,
        width: Responsive.size70,
        height: Responsive.size40,
        justifyContent: "center",
        alignItems: "center",
        padding: Responsive.size10,
        borderRadius: Responsive.size8,
    },
    buttonText: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.semibold,
    },
    title: {
        color: Color.orangeButton,
        fontSize: Responsive.size32,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    subTitle: {
        color: Color.orangeButton,
        fontSize: Responsive.size18,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    description: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size22,
        marginTop: Responsive.size10
    },
    item: {
        flexDirection: "row",
        padding: Responsive.size18,
        backgroundColor: Color.listBordercolor,
        borderRadius: Responsive.size12,
        marginVertical: Responsive.size10,
        justifyContent: "space-between",
        alignContent:'center',
        alignItems:'center',
        borderWidth: Responsive.size1,
        borderColor: Color.borderLineSeedphrase,

    },
    itemContiner: {
        marginTop: Responsive.size18,
        borderRadius: Responsive.size10,
        backgroundColor: Color.listBordercolor,
        borderWidth: Responsive.size2,
        borderColor: Color.borderLineSeedphrase,
    },
    assetItem: {
        flexDirection: "row",
        padding: Responsive.size10,
        marginTop: Responsive.size14,
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
        alignSelf: 'center'
    },

    nonImageView: {
        width: '100%',
        height: Responsive.size200,
        borderRadius: Responsive.size8,
        borderWidth: Responsive.size1,
        borderColor: Color.borderLineSeedphrase,
        backgroundColor: Color.black,
        alignContent: 'center',
        justifyContent: 'center'
    },

    nonImageViewText: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        textAlign: 'center',
        color: Color.white
    },
    loader: {

        justifyContent: "center",
        alignItems: "center",
    },
    value: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: Color.white,
        textAlign: 'right',
        alignSelf: 'flex-end'

    },
    subValue: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: Color.nftcategoryText,
        textAlign: 'right',
        alignSelf: 'flex-end'
    },
    valueContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },

    input: {
        marginTop: Responsive.size10,
        marginBottom: Responsive.size10,
    },
    inputContainer: {
        marginTop: Responsive.size10
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
    horizontalButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: Responsive.size20,
        marginHorizontal: Responsive.size18
    },

    sendIconBakcground: {
        height: Responsive.size40,
        width: Responsive.size40,
        borderRadius: Responsive.size20,
        backgroundColor: Color.orangeOpacityBg,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendIcon: {
        height: Responsive.size24,
        width: Responsive.size24,
    },
    warningText: {
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size14,
        color: Color.orangeButton,
        margin: Responsive.size18,
        lineHeight: Responsive.size16
    },
    warningMessage: {
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size14,
        color: Color.nftcategoryText
    },
    sendingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.orangeButton,
        padding: Responsive.size16,
        alignContent: 'center',
        borderTopLeftRadius: Responsive.size16,
        borderTopRightRadius: Responsive.size16
    },

    pasteText: {
        fontSize: Responsive.size14,
        color: Color.orangeButton,
        fontFamily: Fonts.regular,
        backgroundColor: Color.orangeOpacityBg,
        borderRadius: Responsive.size15,
        padding: Responsive.size8
    },

    errorContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    errorMessage: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: Color.erroryellow,
        width: Responsive.size230
    },
    balanceContainer: {
        height: Responsive.size25, 
        justifyContent: 'center', 
        alignItems: 'center',    
        borderRadius: Responsive.size5,
        borderWidth: Responsive.size1,
        borderColor: Color.borderLineSeedphrase,
        backgroundColor: Color.listBordercolor,
        padding: Responsive.size4,
      },
      
      balanceText: {
        fontSize: Responsive.size12,
        color: Color.white,
        textAlign: 'center', 
      },
      
    rightFeestext1: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: Color.white
    },

    rightFeestext2: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: Color.nftcategoryText
    },
    categoryButton: {
        paddingHorizontal: Responsive.size12,
        paddingVertical: Responsive.size8,
        backgroundColor: Color.unselectedcategory,
        borderRadius: Responsive.size16,
        marginRight: Responsive.size8,
    },
    selectedCategory: {
        backgroundColor: Color.orangeOpacityBg,
    },
    categoryText: {
        color: Color.nftcategoryText,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
    },
    selectedCategoryText: {
        color: Color.orangeButton,
        fontFamily: Fonts.semibold,
    },

    categoryContainer: {
        flexDirection: "row",
        marginVertical: Responsive.size16,
        width: "100%",
    },

    incriptionImage: {
        height: Responsive.size200,
        width: Responsive.size200,
        marginTop: Responsive.size10,
        borderRadius: Responsive.size18,
        alignSelf: 'center'
    },
    ordinalsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.yellowopacity,
        borderRadius: Responsive.size15,
        borderWidth: Responsive.size1,
        borderColor: Color.erroryellow,
        padding: Responsive.size6
    },

    runeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.yellowopacity,
        borderRadius: Responsive.size15,
        borderWidth: Responsive.size1,
        borderColor: Color.erroryellow,
        padding: Responsive.size6
    },
    ordinalsText: {
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size12,
        color: Color.erroryellow
    },
    ownerContainer: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',

    },
    addressText: {
        fontFamily: Fonts.regular,
        color: Color.orangeButton,
        fontSize: Responsive.size12,
        alignSelf: 'center',
        textDecorationLine: 'underline',
    },
    copyIcon: {
        height: Responsive.size11,
        width: Responsive.size11,
        marginLeft: Responsive.size5,
        alignSelf: 'center'
    },
    importantText: {
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size12,
        color: Color.orangeButton,
        margin: Responsive.size18,
        lineHeight: Responsive.size14
    },
    importantMessage: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: Color.orangeButton
    },
    transactionIcon: {
        height: Responsive.size40,
        width: Responsive.size40,
    },
    transactionItem: {
        flexDirection: "row",
        padding: Responsive.size8,
        backgroundColor: Color.listBordercolor,
        borderRadius: Responsive.size12,
        marginTop: Responsive.size18,
        alignContent: 'center',
        alignItems:'center',
        justifyContent: 'space-between',
        borderWidth: Responsive.size1,
        borderColor: Color.borderLineSeedphrase,
    },
    transactionTitleContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    transactionValueContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    transactionProgressContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    transactionVectorBackground: {
        height: Responsive.size100,
        width: Responsive.size100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionVectorIcon: {
        height: Responsive.size48,
        width: Responsive.size48,

    },
    transactionVectorIconDone: {
        height: Responsive.size40,
        width: Responsive.size56,


    },
    transactionTitle: {
        color: Color.orangeButton,
        fontSize: Responsive.size24,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    transactionIdContainer: {
        padding: Responsive.size18
    },
    transactionIdLabel: {
        color: Color.orangeButton,
        fontSize: Responsive.size12,
        fontFamily: Fonts.bold,
    },
    transactionIdValue: {
        color: Color.white,
        fontSize: Responsive.size12,
        fontFamily: Fonts.bold,
    },
    transactionDescription: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size24,
        marginTop: Responsive.size10,
        textAlign: 'center'
    },
    stepContainer: {
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: Color.backbackgroundbg,
        width: "90%",
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size12,
        borderRadius: Responsive.size8,
        justifyContent: "space-between",
        marginVertical: Responsive.size18,
        alignSelf: 'center'
    },
    stepText: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size14,
        color: Color.white,
    },
    progressBarContainer: {
        height: Responsive.size5,
        width: "40%",
        backgroundColor: Color.black,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
    },
    progressBar: {
        height: "100%",
        backgroundColor: Color.orangeButton,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: Responsive.size20,
    },
    feesTextRight: {
        fontSize: Responsive.size12,
        color: Color.white,
        fontFamily: Fonts.regular,
    },

    feesTextRight1: {
        fontSize: Responsive.size12,
        color: Color.nftcategoryText,
        fontFamily: Fonts.regular,
    },
    rightText: {
        color: Color.orangeButton,
        fontSize: Responsive.size16,
        marginVertical: Responsive.size2, // Add spacing between texts
    },
    dropdown: {
        flex: 1,
        paddingHorizontal: Responsive.size16
    },
    dropdownText: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        color: Color.white,
        alignSelf: 'center'
    },
    rightContainer: {

    },
    dropDownIcon: {
        height: Responsive.size18,
        width: Responsive.size18
    },
    inputConfirmContainer: {
        marginVertical: Responsive.size10,

    },
    inputTextTitle: {
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
        color: Color.white,

    },
    inputTextDescription: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: Color.grayText,

    },
    inputText: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.white,

    },
    inputRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: 'center',

    },
    inputDownIcon: {
        height: Responsive.size20,
        width: Responsive.size20
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0
    },
    modalContent: {
        backgroundColor: Color.black,
        padding: Responsive.size20,
        borderTopLeftRadius: Responsive.size15,
        borderTopRightRadius: Responsive.size15,
        alignItems: "center"
    },
    dragIndicator: {
        width: Responsive.size40,
        height: Responsive.size5,
        backgroundColor: Color.white,
        borderRadius: Responsive.size3,
        marginBottom: Responsive.size10
    },
    modalTitle: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.semibold,
        marginBottom: Responsive.size10,
        color: Color.white
    },
    scriptText: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        marginBottom: Responsive.size10,
        color: Color.white
    },
    closeButton: {
        marginTop: Responsive.size15,
        paddingVertical: Responsive.size10,
        paddingHorizontal: Responsive.size10,
        backgroundColor: Color.orangeButton,
        borderRadius: 8
    },
    closeButtonText: {
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
        color: Color.white
    },
    feesItem: {
        backgroundColor: Color.unselectedcategory,
        flexDirection: "row",
        padding: Responsive.size16,
        justifyContent: "space-between",
        alignContent: 'center',

    },
    networkFeeText: {
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
        color: Color.white,
        alignSelf: 'center',

    },
    networkFeeDescription: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: Color.grayText,
        alignSelf: 'center'
    },
    tokeIcon: {
        height: Responsive.size32,
        width: Responsive.size32
    },
    emprtyViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Responsive.size100,    
    },
    emprtyViewText: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size14,
        color: Color.grayText,
        textAlign: 'center',
    },
});