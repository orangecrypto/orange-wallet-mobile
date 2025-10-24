import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black
    },
    contentContainerRepay: {
        flex: 1,
        paddingHorizontal: Responsive.size18,
    
      },
    contentContainer: {
        flex: 1,
        backgroundColor: Color.transactionListBackground,
        paddingTop: Responsive.size10,
        borderTopLeftRadius: Responsive.size12,
        borderTopRightRadius: Responsive.size12,
        paddingHorizontal: Responsive.size18,
    
      },
      title: {
        color: Color.orangeButton,
        fontSize: Responsive.size32,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
      },
      itemcontainer: {
        borderRadius: Responsive.size12,
        paddingVertical: Responsive.size8,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerTitel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
      },

      itemTitle: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        marginLeft: Responsive.size8
      },
      
      statusBadge: {
        paddingVertical: Responsive.size4,
        borderRadius: Responsive.size8,
        height: Responsive.size32,
        width: Responsive.size80,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
      },
      statusText: {
        color: Color.white,
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size16
      },
      subtext: {
        color: Color.nftcategoryText,
        marginTop: Responsive.size4,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular
      },
      timerConatiner: {
       backgroundColor: Color.timerStatusBackground,
        marginTop: Responsive.size12,
        paddingVertical: Responsive.size12,
        paddingHorizontal: Responsive.size8,
        borderRadius: Responsive.size6,
      },
      itemSaperator: {
        height: Responsive.size1,
        backgroundColor: Color.borderLineSeedphrase,
        marginTop: Responsive.size12
       },
      timerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
       
      },
      timeLabel: {
        color: Color.nftcategoryText,
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular
      },
      timeValue: {
        color: Color.white,
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular
      },
    
      progressBarContainer: {
        height: Responsive.size6,
        width: '100%',
        backgroundColor: Color.stepIndigatorBackground,
        borderRadius: Responsive.size6,
        overflow: 'hidden',
        marginTop: Responsive.size8,
      },
      progressBar: {
        height: '100%',
        borderRadius: Responsive.size6,
      },
      buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
        padding: Responsive.size18
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: Responsive.size20
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
      borrowDetails:{

        backgroundColor: Color.backgroundbg,
        paddingVertical: Responsive.size12,
        paddingHorizontal: Responsive.size16,
        borderWidth: Responsive.size1,
        borderColor: Color.backgrounddetailborder,
        borderRadius: Responsive.size12,
        marginTop: Responsive.size10
      },
      itemDetailRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: Responsive.size12,
        alignContent:'center',
        alignItems:'center'
      },
      itemHeaderView:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
      },
      itemMedium:{
       
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
      btcIconLiquidium: {
        height: Responsive.size32,
        width: Responsive.size32
       },
       btcIconLiquidiumValue: {
        fontSize: Responsive.size16,
        color: Color.white,
        fontFamily: Fonts.semibold,
        marginTop: Responsive.size10,
       },
      value: {
        fontSize: Responsive.size16,
        color: Color.white,
        fontFamily: Fonts.semibold,
        marginLeft: Responsive.size6,
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
       fiateValue: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.semibold,
        color: Color.copytint,  
        marginTop: Responsive.size8

      },
      loanEmptyContainer:{
        flex:1,
        backgroundColor:Color.transparent,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center'
      },
      loanEmptyText:{
          fontFamily: Fonts.regular,
          fontSize: Responsive.size18,
          color: Color.grayText,
          textAlign: 'center',
      }

});