import { Responsive } from '@utils/Responsive';
import { disableSwitch, gray, orangeButton, orangeOpacityBg, white } from '@values/color';
import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const Switch = ({ isEnable, height, width, onToggle }) => {
  const handleSize = height * 0.8; // Circle size
  const handlePosition = isEnable ? width - height : 0;

  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View
        style={[
          styles.container,
          {
            width: width,
            height: height,
            backgroundColor:  orangeOpacityBg,

          },
        ]} >
        <View
          style={[
            styles.handle,
            {

             backgroundColor: isEnable ?orangeButton :disableSwitch,
             marginLeft:isEnable ? 0 :Responsive.size2,
              width: handleSize,
              height: handleSize,
              borderRadius: handleSize / 2,
              transform: [{ translateX: handlePosition }],
             
              
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Responsive.size50,
    justifyContent: 'center',
    padding: Responsive.size2,
    borderColor:orangeButton,
    borderWidth:1
  },
  handle: {
    position: 'absolute',
    backgroundColor:  orangeOpacityBg, 
  },
});

export default Switch;
