import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '@values/color';
import { Responsive } from '@utils/Responsive';

interface NftPlaceholderProps {
    width?: number | string;
    height?: number | string;
    style?: any;
}

const NftPlaceholder: React.FC<NftPlaceholderProps> = ({
    width = '100%',
    height = '100%',
    style
}) => {
    return (
        <View style={[styles.container, { width, height }, style]}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>🖼️</Text>
            </View>
            <Text style={styles.text}>Image not available</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1a1a',
        borderRadius: Responsive.size8,
        borderWidth: 1,
        borderColor: Color.gray,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Responsive.size16,
    },
    iconContainer: {
        marginBottom: Responsive.size8,
    },
    icon: {
        fontSize: Responsive.size40,
        opacity: 0.5,
    },
    text: {
        color: Color.gray,
        fontSize: Responsive.size12,
        textAlign: 'center',
    },
});

export default NftPlaceholder;
