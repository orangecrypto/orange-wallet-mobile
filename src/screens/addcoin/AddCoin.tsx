import Switch from "@components/Switch";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { updateCoinStatus } from "./CoinSettings";

const AddCoin = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "BRC20", "Runes", "Stacks"];

  const coinSettings = useSelector((state) => state.coinSettingsSlice.coinSettings);
  const dispatch: Dispatch = useAppDispatch();
 
  const toggleSwitch = (id, isEnable) => {
    dispatch(updateCoinStatus({ id, isEnable }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Switch
        isEnable={item.isEnable}
        height={30}
        width={60}
        onToggle={() => toggleSwitch(item.id, !item.isEnable)} 
      />
    </View>
  );

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      onPress={() => setSelectedCategory(category)} 
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategory,
      ]}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.selectedCategoryText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  // Filter the coins based on the selected category
  const filteredCoinSettings = coinSettings.filter((coin) => 
    selectedCategory === "All" || coin.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.button} onPress={() => goBack()}>
          <Text style={styles.buttonText}>{strings.back}</Text>
        </TouchableOpacity>
        <Text style={styles.addAddress}>{strings.addCoin}</Text>
        <Text style={styles.addAddressMessage}>{strings.addCoinMessage}</Text>

        <View style={styles.categoryContainer}>
          {categories.map((category) => renderCategory(category))}
        </View>

        <FlatList
          data={filteredCoinSettings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default AddCoin;
