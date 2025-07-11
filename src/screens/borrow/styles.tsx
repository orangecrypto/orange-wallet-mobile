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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: Responsive.size20,
    },
    sendingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.orangeButton,
        padding: Responsive.size16,
        alignContent: 'center',
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
        marginTop: Responsive.size50

    },
    buttonText: {
        color: Color.white,
        fontSize: Responsive.size14,
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
    horizontalButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: Responsive.size20,
        marginHorizontal: Responsive.size18
    },

    warningText: {
      fontFamily: Fonts.semibold,
      fontSize: Responsive.size14,
      color: Color.orangeButton,
      margin: Responsive.size18,
     
  },
  warningMessage: {
      fontFamily: Fonts.semibold,
      fontSize: Responsive.size14,
      color: Color.nftcategoryText,
      lineHeight:Responsive.size20,
      textAlign:'justify',
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
    inputContainer: {
        marginTop: Responsive.size10
    },
    description: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size22,
        marginTop: Responsive.size15
    },
    input: {
        marginTop: Responsive.size10,
        marginBottom: Responsive.size10,
    },

    errorContainer: {
        marginTop: Responsive.size25,
        flexDirection: 'row',

    },
    errorIcon: {
        height: Responsive.size16,
        width: Responsive.size16
    },
    errorMessage: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size14,
        marginLeft: Responsive.size10,
        color: Color.erroryellow,
        lineHeight: Responsive.size20
    },

    balanceContainer:{
        flexDirection:'row',
        justifyContent: 'space-between', 
        alignItems: 'center',    
    },

    balanceText:{
        fontFamily: Fonts.semibold,
        color: Color.copytint,
        fontSize: Responsive.size14
    },

    swapContainer: {
        flexDirection:'row',
        height: Responsive.size25, 
        justifyContent: 'center', 
        alignItems: 'center',    
        borderRadius: Responsive.size6,
        borderWidth: Responsive.size1,
        borderColor: Color.borderLineSeedphrase,
        backgroundColor: Color.listBordercolor,
        paddingVertical: Responsive.size4,
        paddingHorizontal: Responsive.size8
      },
      
      swapText: {
        fontSize: Responsive.size14,
        fontFamily: Fonts.semibold,
        color: Color.white,
        textAlign: 'center', 
      },

      swapIcon: {
        height: Responsive.size22,
        width: Responsive.size22,
        marginLeft: Responsive.size4
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
   
      
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
        padding: Responsive.size18
    },
    transactionDescription: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size24,
        marginTop: Responsive.size10,
        textAlign: 'center'
    },
    card: {
        backgroundColor: Color.backgroundbg,
        padding: Responsive.size16,
        marginVertical: Responsive.size8,
        borderRadius: Responsive.size12,
        borderWidth: Responsive.size1,
        borderColor: Color.borderLineSeedphrase
      },
      selectedCard: {
        borderColor: Color.orangeButton,
        borderWidth: Responsive.size2
      },
      itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent:'center'
      },
      btcIcon: {
       height: Responsive.size24,
       width: Responsive.size24
      },
      btcIconBorrow: {
        height: Responsive.size16,
        width: Responsive.size16
       },
       btcIconLiquidium: {
        height: Responsive.size20,
        width: Responsive.size20
       },
      value: {
        fontSize: Responsive.size16,
        color: Color.white,
        fontFamily: Fonts.semibold,
        marginLeft: Responsive.size6,
      },
      fiateValue: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.semibold,
        color: Color.copytint,  
        marginTop: Responsive.size8,
        textAlign:'right'

      },
      fiat: {
        fontSize: Responsive.size14,
        fontFamily: Fonts.semibold,
        color: Color.copytint,
      },
      borrowDetails:{

        backgroundColor: Color.backgroundbg,
        paddingVertical: Responsive.size12,
        paddingHorizontal: Responsive.size16,
        borderWidth: Responsive.size1,
        borderColor: Color.backgrounddetailborder,
        borderRadius: Responsive.size12,
        marginTop:Responsive.size15,
      },
      itemDetailRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: Responsive.size12,
        alignContent:'center',
        alignItems:'center'
      },
      itemMedium:{
        marginTop: Responsive.size12,
        
      },
      
      loadAmountContainer:{
        borderColor: Color.loandetailline,
        borderLeftWidth: Responsive.size2,
        paddingLeft: Responsive.size10
      },
      lineSaperator:{
        backgroundColor: Color.loandetailline,
        height: Responsive.size2,
        marginVertical: Responsive.size10
      },
      detailsLabel: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.semibold,
        color: Color.copytint,
      },
      editContainer: {
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: Responsive.size10
      },
      editIcon:{
        height: Responsive.size16,
        width: Responsive.size16,

      },
      editText:{
        fontSize: Responsive.size12,
        fontFamily: Fonts.semibold,
        color: Color.editblue,
        marginLeft: Responsive.size5

      },

      detailsValue: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.semibold,
        color: Color.white,
      },
     
      ltv: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.semibold,
        color: Color.copytint,
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
});