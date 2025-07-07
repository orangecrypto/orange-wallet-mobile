import Switch from "@components/Switch";
import { updateCoinStatus } from "@redux/slice/CoinSettings";
import { useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from './styles';
import { walletReducerType } from "@redux/slice/WalletReducer";

const AddCoin = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "BRC20", "Runes", "Stacks"];

  const { tokenList } = useSelector((state: { walletReducer: walletReducerType }) => state.walletReducer);
  const coinSettings = useSelector((state) => state.coinSettingsSlice.coinSettings);
  
  const dispatch: Dispatch = useAppDispatch();
 
  const toggleSwitch = (name, visible) => {
    dispatch(updateCoinStatus({ name, visible }));

  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
      <Switch
        isEnable={item.visible}
        height={30}
        width={60}
        onToggle={() => toggleSwitch(item.name, !item.visible)} />
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

export default AddCoin;