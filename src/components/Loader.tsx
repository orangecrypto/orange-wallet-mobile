import React from 'react';
import { ActivityIndicator, Modal, View, StyleSheet } from 'react-native';
import { Color } from '@values/color';

interface CommonLoaderProps {
  loading: boolean; 
  size?: 'small' | 'large'; 
  color?: string; 
}

const Loader: React.FC<CommonLoaderProps> = ({
  loading,
  size = 'large',
  color = Color.orangeButton, 
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={loading} onRequestClose={() => {}}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={size} color={color} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});

export default Loader;
