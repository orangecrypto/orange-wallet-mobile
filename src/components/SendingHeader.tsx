import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { Fonts } from '@values/fonts';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import TokenImage from './TokenImage';

const SendingHeader = ({
    title,
    subtitle,
    ticker,
    type,
    iconSource,
    containerStyle = {}
}) => {
    return (
        <View style={[styles.sendingHeader, containerStyle]}>
            <View>
                <View style={styles.headerTopTextView}>
                    <Text numberOfLines={1} style={styles.headerTitle}>{title}</Text>
                    <View style={styles.tokenContainer}>
                        {ticker && (
                            <Text style={styles.categoryTextBackground}>
                                {ticker}
                            </Text>
                        )}
                        {type && (
                            <Text style={styles.categoryTextBackground}>
                                {type}
                            </Text>
                        )}
                    </View>
                </View>
                {subtitle && (
                    <Text style={[styles.headerTitle, { fontSize: Responsive.size14 }]}>
                        {subtitle}
                    </Text>
                )}
            </View>
            {/* <Image source={iconSource} style={styles.headerIcon} /> */}

            {iconSource?.image ? <Image source={iconSource.image} style={styles.headerIcon} /> :
                <TokenImage
                    fungibleToken={iconSource}
                    size={Responsive.size40}
                    round
                    variant="send" />
            }

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
        minWidth: 0,
        maxWidth: Responsive.size150,
        flexShrink: 1,
    },
    tokenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
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
