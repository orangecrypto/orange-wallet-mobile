import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    icon: {
        width: Responsive.size24,
        height: Responsive.size24,
    },
    iconFocused: {
        borderRadius: Responsive.size15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Responsive.size16,
        marginBottom: Responsive.size24,
        borderWidth: Responsive.size1,
        borderColor: Color.grey,
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size16,
        borderRadius: Responsive.size10,
        marginHorizontal: Responsive.size16,
    },
    headerText: {
        fontSize: Responsive.size20,
        color: Color.white,
        width: Responsive.size170,
        fontFamily: Fonts.regular
    },
    headerClickableText: {
        padding: Responsive.size2
    },
    headerIcon: {
        width: Responsive.size20,
        height: Responsive.size20,

    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '30%',
    },
});