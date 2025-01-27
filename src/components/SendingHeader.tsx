import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { Fonts } from '@values/fonts';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SendingHeader = ({ 
    title, 
    subtitle, 
    tokens = [], 
    iconSource, 
    containerStyle = {} 
}) => {
    return (
        <View style={[styles.sendingHeader, containerStyle]}>
            <View>
                <View style={styles.headerTopTextView}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <View style={styles.tokenContainer}>
                        {tokens.map((token, index) => (
                            <Text 
                                key={index} 
                                style={styles.categoryTextBackground}
                            >
                                {token}
                            </Text>
                        ))}
                    </View>
                </View>
                {subtitle && (
                    <Text style={[styles.headerTitle, { fontSize: Responsive.size14 }]}> {subtitle} </Text>
                )}
            </View>
            <Image source={iconSource} style={styles.headerIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    sendingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Responsive.size16,
        backgroundColor: 'transparent',
    },
    headerTopTextView: {
        flexDirection: 'row',
    },
    headerTitle: {
        fontFamily: Fonts.regular,
        color: 'white',
        fontSize: Responsive.size24,
    },
    tokenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    categoryTextBackground: {
        fontFamily: Fonts.regular,
        fontSize: Responsive.size12,
        color: 'white',
        borderRadius: Responsive.size8,
        backgroundColor: Color.viewbutton,
        paddingHorizontal: Responsive.size4,
        marginLeft: Responsive.size8,
    },
    headerIcon: {
        height: Responsive.size36,
        width: Responsive.size36,
    },
});

export default SendingHeader;
