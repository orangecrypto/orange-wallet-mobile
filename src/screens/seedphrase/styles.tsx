import { Platform, StyleSheet } from "react-native";
import { Responsive } from "@utils/Responsive";
import { Color} from "@values/color";
import { Fonts } from "@values/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },

    title: {
        fontSize: Responsive.size22,
        color: Color.orangeButton,
        fontFamily: Fonts.semibold,

    },

    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start'

    },
    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: Color.white,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size22,
    },
    topIcon: {
        height: Responsive.size140,
        width: Responsive.size140,
        alignSelf: 'center'
    },
    input: {
        marginTop: Responsive.size20,
        marginBottom: Responsive.size20,
    },
    passwordError:{
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color:Color.red,
        lineHeight: Responsive.size18
    },
    seePhrasecontainer: {
        flex: 1,
        backgroundColor: Color.black,
        padding: Responsive.size18,
    },
 
    stepContainer: {
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: Color.backbackgroundbg,
        width: "100%",
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size12,
        borderRadius: Responsive.size10,
        justifyContent: "space-between",
        marginVertical: Responsive.size18
    },
    stepText: {
        fontSize: Responsive.size16,
        color: Color.white,
    },
    progressBarContainer: {
        height: Responsive.size4,
        width: "35%",
        backgroundColor: Color.black,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
    },
    progressBar: {
        height: "100%",
        backgroundColor: Color.orangeButton,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        marginTop: Responsive.size20,
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
        fontSize: Responsive.size14,
        fontFamily: Fonts.semibold
    },
    backImage:{
        height: Responsive.size18,
        width: Responsive.size18
    },
    disabledButton: {
        backgroundColor: Color.grey,
    },
    buttonContainerConitnue: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: Responsive.size20,
    },
    flatListContainer: {
       
        marginTop: Responsive.size20,
        backgroundColor: Color.black,
        borderRadius: Responsive.size10,
        borderWidth: Responsive.size2,
        borderColor: Color.listBordercolor,
    },
    itemContainer: {
        flex: 1,
        marginHorizontal: Responsive.size4,
        marginVertical:Responsive.size5,
        height: Responsive.size36,
        backgroundColor: Color.black,
        borderRadius: Responsive.size12,
        borderColor: Color.borderLineSeedphrase,
        borderWidth: Responsive.size1,
        
    },
    itemInput: {
        color: Color.white,
        fontSize: Responsive.size12,
        fontFamily:Fonts.regular,
        textAlign: 'center',
        width: '100%',
        height:'100%'
    },
    orangeText: {
        fontSize: Responsive.size18,
        color: Color.orangeButton,
        fontFamily: Fonts.semibold,
    },
   
    itemText: {
        color: Color.white,
        fontSize: Responsive.size14,
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        width: '100%',
    },

    copyText: {
        fontSize: Responsive.size12,
        fontFamily:Fonts.regular,
        color: Color.orangeButton,
    },

    copyButton: {
        backgroundColor: Color.orangeOpacityBg,
        paddingHorizontal: Responsive.size20,
        paddingVertical: Responsive.size8,
        borderRadius: Responsive.size20,
        alignSelf:'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayButton: {
        backgroundColor: Color.primary, // Customize the button style
        padding: 10,
        borderRadius: 5,
    },
    overlayButtonText: {
        color: 'white', // Button text color
        fontSize: 16,
    },

});