import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { orangeButton } from '../resources/values/color';

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

  // Function to toggle secure text entry
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
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
    borderWidth: 2,
    borderColor: orangeButton, // Orange border
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#1A1A1A', // Dark background
  },
  textInput: {
    flex: 1,
    color: '#fff', // White text color
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default CustomTextInput;
