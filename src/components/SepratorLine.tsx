import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import * as Color from '../resources/values/color';

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        flex: 0,
        height: 1,
        backgroundColor: Color.line,
      },
})

interface SepratorLineProps {
  sepratorStyle?: StyleProp<ViewStyle>;
}
export const SeparatorLine = (props: SepratorLineProps) => {
  const { sepratorStyle } = props;
  return <View style={[styles.container, sepratorStyle]} />;
};
