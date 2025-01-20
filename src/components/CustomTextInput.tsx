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
  dropdownOptions = [], // Dropdown options for the left dropdown
  onDropdownSelect, // Callback for dropdown selection
  selectedDropdownValue, // Current selected value for dropdown
  style,
  dropdownIcon, // Icon for dropdown
  rightText, // Optional right clickable text
  rightTextStyle, // Optional custom style for right text
  onRightTextPress, // Callback for right text click
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [focused, setFocused] = useState(false); // State to track focus
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  // Function to toggle secure text entry
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  // Function to handle dropdown selection
  const handleDropdownSelect = (item) => {
    onDropdownSelect(item);
    setShowDropdown(false);
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          { borderColor: focused ? orangeButton : gray }, // Dynamic border color
          style,
        ]}
      >
        {/* Left Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={nftcategoryText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          onFocus={() => setFocused(true)} // Set focus state
          onBlur={() => setFocused(false)} // Reset focus state
        />

        {/* Optional Password Toggle */}
        {showPasswordToggle && (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Image
              source={isSecure ? passwordIconHidden : passwordIconVisible}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        {/* Right Dropdown (Optional) */}
        {dropdownIcon && (
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownText}>{selectedDropdownValue}</Text>
            <Image
              source={dropdownIcon} // The icon passed as a prop for the dropdown
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        )}

        {/* Optional Right Clickable Text */}
        {rightText && (
          <TouchableOpacity onPress={onRightTextPress} style={styles.rightTextContainer}>
            <Text style={[styles.rightText, rightTextStyle]}>{rightText}</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: black, // Dark background
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
    marginLeft: Responsive.size5, // Space between text and icon
  },
  dropdownList: {
    position: 'absolute',
    top: Responsive.size50 + 5,
    right: 0, // Position dropdown at the right
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
  rightTextContainer: {
    paddingLeft: Responsive.size10,
  },
  rightText: {
    color: orangeButton, // Default color for the clickable text
    fontSize: Responsive.size16,
  },
});

export default CustomTextInput;
