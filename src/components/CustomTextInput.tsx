import { Responsive } from '@utils/Responsive';
import { black, gray, nftcategoryText, orangeButton, white } from '@values/color';
import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text, FlatList, Image } from 'react-native';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  passwordIconVisible,
  passwordIconHidden,
  dropdownOptions = [],
  onDropdownSelect,
  selectedDropdownValue,
  keyboardType = 'default',
  style,
  dropdownIcon,
  rightText,
  rightTextStyle,
  onRightTextPress,
  rightText1,
  rightTextStyle1,
  onRightTextPress1,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [focused, setFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  const handleDropdownSelect = (item) => {
    onDropdownSelect(item);
    setShowDropdown(false);
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          { borderColor: focused ? orangeButton : gray },
          style,
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={nftcategoryText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {showPasswordToggle && (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Image
              source={isSecure ? passwordIconHidden : passwordIconVisible}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        {dropdownIcon && (
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownText}>{selectedDropdownValue}</Text>
            <Image
              source={dropdownIcon}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        )}

        {/* Right Texts */}
        <View style={styles.rightTextsContainer}>
          {rightText && (
            <TouchableOpacity onPress={onRightTextPress}>
              <Text style={[styles.rightText, rightTextStyle]}>{rightText}</Text>
            </TouchableOpacity>
          )}
          {rightText1 && (
            <TouchableOpacity onPress={onRightTextPress1}>
              <Text style={[styles.rightText, rightTextStyle1]}>{rightText1}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Dropdown List */}
      {showDropdown && dropdownOptions.length > 0 && (
        <View style={styles.dropdownList}>
          <FlatList
            data={dropdownOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownSelect(item.value)}
              >
                <Text style={styles.dropdownItemText}>
                  {item.label} {item.symbol}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Responsive.size1,
    borderRadius: Responsive.size12,
    paddingHorizontal: Responsive.size10,
    height: Responsive.size50,
    backgroundColor: black,
  },
  textInput: {
    flex: 1,
    color: white,
    fontSize: Responsive.size16,
  },
  icon: {
    width: Responsive.size24,
    height: Responsive.size24,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Responsive.size10,
    marginLeft: Responsive.size10,
  },
  dropdownText: {
    color: white,
    fontSize: Responsive.size16,
  },
  dropdownIcon: {
    width: Responsive.size18,
    height: Responsive.size18,
    marginLeft: Responsive.size5,
  },
  dropdownList: {
    position: 'absolute',
    top: Responsive.size50 + 5,
    right: 0,
    backgroundColor: black,
    borderRadius: Responsive.size10,
    borderColor: gray,
    borderWidth: 1,
    zIndex: 10,
  },
  dropdownItem: {
    padding: Responsive.size10,
  },
  dropdownItemText: {
    color: white,
    fontSize: Responsive.size16,
  },
  rightTextsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end', // Align texts to the right
    justifyContent: 'center', // Center them vertically within the parent container
  },
  rightText: {
    color: orangeButton,
    fontSize: Responsive.size16,
    marginVertical: Responsive.size2, // Add spacing between texts
  },
});

export default CustomTextInput;

