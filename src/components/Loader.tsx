import React from 'react';
import { ActivityIndicator, Modal, View, StyleSheet } from 'react-native';
import { Color } from '@values/color'; // You can customize this based on your theme

interface CommonLoaderProps {
  loading: boolean; // If true, the loader is visible
  size?: 'small' | 'large'; // Optional size for the ActivityIndicator
  color?: string; // Optional color for the ActivityIndicator
}

const Loader: React.FC<CommonLoaderProps> = ({
  loading,
  size = 'large',
  color = Color.orangeButton, // Default to orangeButton color
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default Loader;
