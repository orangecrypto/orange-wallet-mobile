import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp, Dimensions } from 'react-native';
import { Responsive } from '../utils/Responsive';

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
  backgroundColor = '#D74320',
  textColor = '#FFFFFF',
  borderColor = 'transparent',
  width = '100%',
  height = 50,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth: borderColor !== 'transparent' ? 1 : 0,
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
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#999999',
  },
});

export default CommonButton;