import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { Fonts } from '@values/fonts';
import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text, FlatList, Image, Platform } from 'react-native';

const CustomTextInput = ({
  placeholder,
  editable,
  isDropDownClicable,
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
          { borderColor: focused ? Color.orangeButton : Color.gray },
          style,
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={Color.nftcategoryText}
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor={Color.orangeButton}
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
            disabled={isDropDownClicable}
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
            keyExtractor={(index) => index}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownSelect(item)}
              >
                <Text numberOfLines ={1} style={styles.dropdownItemText}>
                  {item.name} {item.ticker}
                </Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
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
    backgroundColor: Color.black,
  },
  textInput: {
    flex: 1,
    color: Color.white,
    fontSize: Responsive.size18,
    fontFamily: Fonts.semibold,
    paddingHorizontal: Responsive.size10,
    paddingVertical: 0,
    textAlignVertical: 'center',
    lineHeight: Responsive.size18, 
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
    color: Color.white,
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
    backgroundColor: Color.black,
    borderRadius: Responsive.size10,
    borderColor: Color.gray,
    borderWidth: 1,
    zIndex: 10,
    width: Responsive.size188,
    maxHeight: Responsive.size180, 
    overflow: 'hidden', 
  },
  dropdownItem: {
    padding: Responsive.size12,
    borderBottomWidth: Responsive.size2,
    borderBottomColor: Color.backbackgroundbg
  },
  dropdownItemText: {
    color: Color.white,
    fontSize: Responsive.size14,
    fontFamily: Fonts.regular
  },
  rightTextsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end', // Align texts to the right
    justifyContent: 'center', // Center them vertically within the parent container
  },
  rightText: {
    color: Color.orangeButton,
    fontSize: Responsive.size16,
    marginVertical: Responsive.size2, // Add spacing between texts
  },
});

export default CustomTextInput;

