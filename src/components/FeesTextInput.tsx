import { Responsive } from '@utils/Responsive';
import { black, gray, nftcategoryText, orangeButton, white } from '@values/color';
import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text, FlatList, Image } from 'react-native';

const FeesTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  passwordIconVisible,
  passwordIconHidden,
  style,
  rightText1, 
  rightText2, 
  rightTextStyle1, 
  rightTextStyle2,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [focused, setFocused] = useState(false);

  // Function to toggle secure text entry
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
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
        {/* Left Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={nftcategoryText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          onFocus={() => setFocused(true)} 
          onBlur={() => setFocused(false)} 
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

        {/* Right Text Labels (Optional) */}
        {(rightText1 || rightText2) && (
          <View style={styles.rightTextContainer}>
            {rightText1 && (
              <Text style={[styles.rightText, rightTextStyle1]}>
                {rightText1}
              </Text>
            )}
            {rightText2 && (
              <Text style={[styles.rightText, rightTextStyle2]}>
                {rightText2}
              </Text>
            )}
          </View>
        )}
      </View>
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
  rightTextContainer: {
    flexDirection: 'column', // Stack text vertically
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: Responsive.size10,
  },
  rightText: {
    color: orangeButton, // Default color for the clickable text
    fontSize: Responsive.size16,
  },
});

export default FeesTextInput;
