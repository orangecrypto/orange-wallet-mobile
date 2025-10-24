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
    nftIcons,
    containerStyle = {}
}) => {
    return (
        <View style={[styles.sendingHeader, containerStyle]}>
            <View>
                <View style={styles.headerTopTextView}>
                    <Text numberOfLines={1} style={styles.headerTitle}>{title}</Text>
                    <View style={styles.tokenContainer}>
                        {ticker && (
                           <View style={styles.categoryTextBackground}>
                           <Text style={styles.categoryText}>{ticker}</Text>
                         </View>
                        )}
                        {type && (
                           <View style={styles.categoryTextBackground}>
                           <Text style={styles.categoryText}>{type}</Text>
                         </View>
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

            {ticker === 'Ordinals' ? (
                <View style={styles.nftBackground}>
                <Image source={nftIcons} style={styles.nftIcon}/>
                </View>
            ) : (
                iconSource?.image ? (
                    <Image source={iconSource.image} style={styles.headerIcon} />
                ) : (
                    <TokenImage
                        fungibleToken={iconSource}
                        size={Responsive.size40}
                        round
                        variant="send"
                    />
                )
            )}


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
        height: Responsive.size18,
        borderRadius: Responsive.size10,
        backgroundColor: Color.viewbutton,
        marginLeft: Responsive.size8,
        paddingHorizontal: Responsive.size6,
        justifyContent: 'center', 
        alignItems: 'center',    
        flexDirection: 'row',
      },
      
      categoryText: {
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size12,
        color: Color.white,
        textAlign: 'center', 
       
      },
      
    headerIcon: {
        height: Responsive.size36,
        width: Responsive.size36,
    },

    nftIcon:{
        height: Responsive.size20,
        width: Responsive.size20,   
    },
    nftBackground :{
        height: Responsive.size36,
        width: Responsive.size36,
        borderRadius: Responsive.size18,
        backgroundColor: Color.white,
        justifyContent:'center',
        alignItems:'center'
    }
    
});

export default SendingHeader;
