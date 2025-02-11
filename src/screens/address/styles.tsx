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
        justifyContent: 'flex-start',
        marginHorizontal: Responsive.size18
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: Responsive.size20,
        marginBottom: Responsive.size20,
    },
    button: {
        backgroundColor: Color.backbackgroundbg,
        width: Responsive.size70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Responsive.size10,
        borderRadius: Responsive.size8,
        marginTop: Responsive.size50
    },
    buttonText: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular
    },
    addAddress: {
        color: Color.orangeButton,
        fontSize: Responsive.size24,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size20
    },
    addAddressMessage: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size24
    },
    addAddressButtonText: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: Color.orangeButton,
    },

    addAddressButton: {
        backgroundColor: Color.orangeOpacityBg,
        borderColor: Color.orangeButton,
        borderWidth: Responsive.size1,
        borderRadius: Responsive.size20,
        alignSelf: 'center',
        marginVertical: Responsive.size50,
        paddingHorizontal: Responsive.size10,
        paddingVertical: Responsive.size6,

    },

    item: {
        padding: Responsive.size16,
        backgroundColor: Color.backgroundbg,
        borderRadius: Responsive.size10,
        marginTop: Responsive.size18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Responsive.size1,
        borderColor: Color.grey
    },

    primaryText: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.white
    },
    secondaryText: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.nftcategoryText
    },
    text: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.white

    },
});