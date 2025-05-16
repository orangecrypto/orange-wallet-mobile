import { Dimensions, StyleSheet } from "react-native";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    contentPage: {
        width: Dimensions.get("window").width,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Responsive.size20,
    },
    icon: {
        width: Responsive.size185,
        height: Responsive.size185,
        marginBottom: Responsive.size10,
    },
    contentTitle: {
        fontSize: Responsive.size28,
        fontFamily:Fonts.semibold,
        color: Color.orangeButton,
        textAlign: "center",
        marginBottom: Responsive.size10,
    },
    contentDescription: {
        fontSize: Responsive.size18,
        color: Color.white,
        textAlign: "center",
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size22,
    },
    progressBarContainer: {
        height: Responsive.size5,
        width: "40%",
        backgroundColor: Color.grey,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
        marginVertical: Responsive.size40,
    },
    progressBar: {
        height: "100%",
        backgroundColor: Color.orangeButton,
    },
    buttonContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: Responsive.size20,
        marginHorizontal: Responsive.size24
    },
     horizontalButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: Responsive.size20,
        marginHorizontal: Responsive.size18
    },
});