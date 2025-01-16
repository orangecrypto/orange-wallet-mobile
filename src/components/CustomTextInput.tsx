import { Responsive } from '@utils/Responsive';
import { gray, orangeButton, white } from '@values/color';
import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  passwordIconVisible,
  passwordIconHidden,
  style,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [focused, setFocused] = useState(false); // State to track focus

  // Function to toggle secure text entry
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        { borderColor: focused ? orangeButton : gray }, // Dynamic border color
        style,
      ]}
    >
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        onFocus={() => setFocused(true)} // Set focus state
        onBlur={() => setFocused(false)} // Reset focus state
      />
      {showPasswordToggle && (
        <TouchableOpacity onPress={toggleSecureEntry}>
          <Image
            source={isSecure ? passwordIconHidden : passwordIconVisible}
            style={styles.icon}
          />
        </TouchableOpacity>
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
    backgroundColor: '#1A1A1A', // Dark background
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
});

export default CustomTextInput;
