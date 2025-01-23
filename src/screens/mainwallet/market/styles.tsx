import { Platform, StyleSheet } from "react-native";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
        justifyContent: 'flex-start',
      },
      Graphcontainer: {
        flex: 1,
        backgroundColor: Color.black,
        paddingHorizontal: Responsive.size10
      },
      infoSection: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        color: Color.orangeButton,
        fontSize: Responsive.size16,
        fontFamily: Fonts.bold,
      },
      infoBadge: {
        backgroundColor: Color.orangeOpacityBg,
        paddingHorizontal: Responsive.size8,
        paddingVertical: Responsive.size2,
        borderRadius: Responsive.size8,
      },
      infoText: {
        color: Color.white,
        fontSize: Responsive.size10,
      },
      chartWrapper: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      },
      xAxisLabelsWrapper: {
        position: 'absolute',
        bottom: Responsive.size25, // Position the X-axis labels at the bottom of the chart
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
      },
      xAxisLabel: {
        color: Color.white,
        fontSize: Responsive.size9,
        textAlign: 'center',
      },
      overlayBalanceSection: {
        position: 'absolute',
        top: Responsive.size20,
        left: Responsive.size16,
        zIndex: 1,
      },
      balanceText: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.semibold,
      },
      changeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Responsive.size4,
      },
      icon: {
        width: Responsive.size16,
        height: Responsive.size16,
        marginRight: Responsive.size4,
        resizeMode: 'contain',
      },
      changeText: {
        color: Color.white,
        fontSize: Responsive.size14,
      },
      selectedCategory: {
        backgroundColor: Color.selectedCategory,
    },
    categoryText: {
        color: Color.orangeButton,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular
    },
    selectedCategoryText: {
        color: Color.white,
        fontFamily: Fonts.semibold
    },
    listContainer: {
        paddingBottom: Responsive.size16,
       
    },
    categoryButton: {
        paddingHorizontal: Responsive.size12,
        paddingVertical: Responsive.size8,
        backgroundColor: Color.orangeOpacityBg,
        borderRadius: Responsive.size16,
        marginRight: Responsive.size8,
        alignContent:'center',
        justifyContent:'center'
    },
    contentArea: {
        marginTop: Responsive.size15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: Responsive.size20,
        height: '60%',
        width: '100%',
        paddingTop: Responsive.size16,
        backgroundColor: Color.transactionListBackground,
        borderTopLeftRadius:Responsive.size20,
        borderTopRightRadius: Responsive.size20
    },
    contentText: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.semibold,
        color: Color.white,
    },
    categoryContainer: {
        flexDirection: "row",
        marginBottom: Responsive.size16,
        width: '100%',
        justifyContent: 'space-between'
    },
    headerTitleContainer :{
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: Responsive.size1,
        borderColor: Color.transactionListBackground
    },
    headerTitle:{
        color: Color.nftcategoryText,
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size14
    },
    headerPriceContainer:{
        flexDirection: "row",
        alignSelf:'flex-end',
        width: '35%',
        justifyContent:'space-between'
    },
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
        fontFamily: Fonts.regular
    },
    flatList: {
        marginTop: Responsive.size10,
        alignContent:'center'
    },
    assetCategory: {
        color: Color.grayText,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
        marginTop: Platform.OS ==='ios' ? Responsive.size4:0
    },
    assetValues: {
        flexDirection: 'row',
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
        fontFamily: Fonts.regular,
        marginLeft: Responsive.size10
    },

    letIcon:{
        height: Responsive.size32,
        width: Responsive.size32
    },
    price: {
        color: Color.white,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular
    },
    progressBarContainer: {
        height: Responsive.size5,
        width: "30%",
        backgroundColor: Color.grey,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
        marginTop: Responsive.size20,
    },
    progressBar: {
        height: "100%",
        backgroundColor: Color.orangeButton,
    },
});