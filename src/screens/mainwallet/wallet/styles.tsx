import { Dimensions, Platform, StyleSheet } from "react-native";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.black,
        alignItems: 'center',
        paddingBottom: Responsive.size62,
        flex:1
    },
    flatList: {
        marginTop: Responsive.size10,
        alignContent:'center'
    },
    contentContainer: {
        justifyContent: 'center',
        paddingHorizontal: 0,
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
   
    stepImage: {
        width: Responsive.size100,
        height: Responsive.size100,
        marginTop: Responsive.size10,
    },
    categoryContainer: {
        flexDirection: "row",
        marginBottom: Responsive.size16,
        width: '100%',
        justifyContent: 'space-between'
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
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Responsive.size10,
        paddingHorizontal: Responsive.size8,
        width: '100%',
        marginTop:Responsive.size8,
        
    },
    headerText: {
        color: Color.grayText,
        fontSize: Responsive.size14,
        fontFamily: Fonts.bold,
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
    },
    walletBackground: {
        width: Dimensions.get('window').width - 40,
        marginHorizontal: Responsive.size16,
        padding: Responsive.size24,
    },
    
    walletText: {
        fontSize: Responsive.size22,
        color: Color.white,
        fontFamily: Fonts.semibold,
        textAlign:'right'
    },

    walletTextView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: Responsive.size5,
    },

    walletTextCurrencyView: {
        backgroundColor: Color.viewbutton,
        borderRadius: Responsive.size20,
        fontFamily: Fonts.regular,
        fontSize: Responsive.size9,
        color: Color.white,
        padding: Responsive.size4,
        marginLeft: Responsive.size10,
    },

    balanceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    balanceIcon: {
        height: Responsive.size56,
        width: Responsive.size56,
    },

    addCoinView: {
        backgroundColor: Color.viewbutton,
        borderRadius: Responsive.size20,
        alignContent: 'center',
        alignItems:'center',
        justifyContent: 'center',
        paddingVertical: Responsive.size10,
        width: Responsive.size147,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: Responsive.size28,
    },

    addCoinIcon: {
        height: Responsive.size18,
        width: Responsive.size18,
    },

    addCoinText: {
        fontFamily: Fonts.light,
        fontSize: Responsive.size14,
        color: Color.white,
        marginLeft: Responsive.size5,
    },

    horizontalActions :{
        flexDirection:'row',
        marginTop:Responsive.size22,
        alignContent:'center',
        paddingHorizontal: Responsive.size10,
        justifyContent:'center',
        
    },
    
    actionButtonBg:{
        height: Responsive.size48,
        width: Responsive.size48,
        borderRadius: Responsive.size24,
        backgroundColor: Color.viewbutton,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: Responsive.size8
    },

    actionButtonIcon:{
        height: Responsive.size24,
        width: Responsive.size24,      
    },
    emptyListContainer:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        marginTop: Responsive.size50
    },
    emptyListText:{
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.white,
        textAlign:'center'
    }
});