import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const { width } = Dimensions.get('window');
const numColumns = 2;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    contentContainer: {
        justifyContent: 'flex-start',
    },
    password: {
        fontSize: Responsive.size22,
        fontFamily: Fonts.bold,
        color: Color.orangeButton,
        marginTop: Responsive.size22,
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

    horizontalButtons: {
        flexDirection: 'row',
        alignContent:'center',
        justifyContent: 'space-between',
        marginHorizontal: Responsive.size4,
        marginTop: Responsive.size28,
    },
    addCoinView: {
        backgroundColor: Color.viewbutton,
        borderRadius: Responsive.size20,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Responsive.size12,
        width:Responsive.size123,
        flexDirection: 'row',
        alignSelf: 'center',

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
    columnWrapper: {
        justifyContent: 'space-between',
        marginHorizontal: Responsive.size5,
        marginTop: Responsive.size25

    },
    itemContainer: {
        width: (width - 30) / numColumns,
        marginBottom: Responsive.size10,
        marginRight: Responsive.size10,
        padding: Responsive.size15,
        borderRadius: Responsive.size8,
        borderWidth: Responsive.size1,
        borderColor: Color.grey,
    },
    image: {
        width: '100%',
        height: Responsive.size140,
        borderRadius: Responsive.size8,
    },
    buttonText: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
    },
    incriptionImage:{
        height: Responsive.size200,
        width:Responsive.size200,
        marginTop: Responsive.size10,
        borderRadius: Responsive.size18,
        alignSelf:'center'
      },

      ownerContainer: {

        flexDirection:'row',
        justifyContent: 'center',
        alignContent:'center',
       
    },
   addressText: {
        fontFamily: Fonts.regular,
        color:Color.orangeButton,
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
    item: {
        flexDirection: "row",
        padding: Responsive.size16,
        backgroundColor: Color.listBordercolor,
        borderRadius: Responsive.size10,
        marginTop: Responsive.size18,
        justifyContent: "space-between",
        alignContent:'center',
        borderWidth: Responsive.size2,
        borderColor: Color.borderLineSeedphrase,
    },
    ordinalsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.yellowopacity,
        borderRadius:Responsive.size15,
        borderWidth: Responsive.size1,
        borderColor: Color.erroryellow,
        padding: Responsive.size6
    },
    ordinalsText: {
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size12,
        color: Color.erroryellow
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
        padding: Responsive.size18
    },
    text: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        color: Color.white,
         alignSelf:'center'
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
    nonImageView: {
        width: '100%',
        height: Responsive.size140,
        borderRadius: Responsive.size8,
        borderWidth: Responsive.size1,
        borderColor: Color.borderLineSeedphrase,
        backgroundColor:Color.black,
        alignContent:'center',
        justifyContent:'center'
    },

    nonImageViewText:{
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        textAlign:'center',
        color: Color.white
    },
    title: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        marginTop: Responsive.size10,
        color: Color.white
    },

    nftItemTitle: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        marginTop: Responsive.size10,
        color: Color.white
    },
    subtype: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        marginTop: Responsive.size4,
        color: Color.nftcategoryText
    },

    listConatiner: {
        paddingTop: Responsive.size6,
        backgroundColor: Color.transactionListBackground,
        borderTopLeftRadius: Responsive.size20,
        borderTopRightRadius: Responsive.size20,
        marginTop: Responsive.size15,
        marginBottom: Responsive.size70,
       
    },
    emprtyViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Responsive.size100
    },
    emprtyViewText: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size14,
        color: Color.grayText,
        textAlign: 'center',
    },
});