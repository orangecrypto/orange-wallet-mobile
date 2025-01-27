import { Responsive } from '@utils/Responsive';
import {Color} from '@values/color';
import { Fonts } from '@values/fonts';
import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface CommonButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  style,
  backgroundColor = Color.orangeButton,
  textColor = Color.white,
  borderColor = 'transparent',
  width = '100%',
  height = Responsive.size50,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth: Color.borderColor !== 'transparent' ? 1 : 0,
          width,
          height,
        },
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: Responsive.size16,
    fontFamily:Fonts.semibold
  },
  disabledButton: {
    opacity:0.5
  },
});

export default CommonButton;