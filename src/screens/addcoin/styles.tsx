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
      justifyContent: "flex-start",
      paddingHorizontal: Responsive.size18,
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
    buttonText: {
      color: Color.white,
      fontSize: Responsive.size16,
      fontFamily: Fonts.regular,
    },
    addAddress: {
      color: Color.orangeButton,
      fontSize: Responsive.size24,
      fontFamily: Fonts.bold,
      marginTop: Responsive.size20,
    },
    addAddressMessage: {
      color: Color.white,
      fontSize: Responsive.size18,
      fontFamily: Fonts.regular,
      lineHeight: Responsive.size24,
    },
    categoryContainer: {
      flexDirection: "row",
      marginVertical: Responsive.size16,
      width: "100%",
      justifyContent: "space-between",
    },
    categoryButton: {
      paddingHorizontal: Responsive.size12,
      paddingVertical: Responsive.size8,
      backgroundColor: Color.orangeOpacityBg,
      borderRadius: Responsive.size16,
      marginRight: Responsive.size8,
    },
    selectedCategory: {
      backgroundColor: Color.selectedCategory,
    },
    categoryText: {
      color: Color.orangeButton,
      fontSize: Responsive.size14,
      fontFamily: Fonts.regular,
    },
    selectedCategoryText: {
      color: Color.white,
      fontFamily: Fonts.semibold,
    },
    item: {
      flexDirection: "row",
      padding: Responsive.size16,
      backgroundColor: Color.backgroundbg,
      borderRadius: Responsive.size10,
      marginTop: Responsive.size18,
      justifyContent: "space-between",
      borderWidth: Responsive.size1,
      borderColor: Color.borderLineSeedphrase,
    },
    text: {
      fontSize: Responsive.size16,
      fontFamily: Fonts.regular,
      color: Color.white,
      width: Responsive.size200
    },
  });