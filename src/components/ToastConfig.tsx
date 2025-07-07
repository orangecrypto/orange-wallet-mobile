import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { Fonts } from '@values/fonts';
import React from 'react';
import { View, Text, StyleSheet, Image, Modal, Dimensions, Platform } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import { localAssets } from '@assets/assets';
import { styles } from '@screens/sendings/styles';

interface CustomToastProps extends BaseToastProps {
    text1?: string;
    text2?: string;
}

const toastStyles = StyleSheet.create({

    blurBackground: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'rgba(0, 0, 0, 0.6 )',
        position: 'absolute',
        bottom: -60
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent:'center',
        width: '90%',
        height: Platform.OS === 'ios'?  Responsive.size80 : Responsive.size45,
        padding: Responsive.size12,
        borderRadius: Responsive.size8,
        position: 'absolute',
        bottom: Responsive.size50,
        alignSelf: 'center',
        borderWidth: Responsive.size1,
        borderColor: Color.gray,
       
    },
    errorContainer: {
        borderColor: '#D92D20',
        backgroundColor: '#FEF3F2',
    },
    successContainer: {
        borderColor: '#ABEFC6',
        backgroundColor: '#ECFDF3',
    },
    deleteContainer: {
        borderColor: '#D92D20',
        backgroundColor: '#FEF3F2',
    },
    text1Error: {
        color: Color.red,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
    },
    text1Success: {
        color: Color.successgreen,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
        marginBottom: Platform.OS === 'ios' ? Responsive.size25: Responsive.size0
    },
    text2: {
        color: Color.black,
        marginLeft: Responsive.size8,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular,
    },

    imageBackground: {
        height: Responsive.size28,
        width: Responsive.size28,
        borderRadius: Responsive.size14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Responsive.size10,
        marginBottom: Platform.OS === 'ios' ? Responsive.size25: Responsive.size0
    },
    imageIcon: {
        height: Responsive.size10,
        width: Responsive.size10
    }
});


const toastConfig = {
    error: ({ text1, text2 }: CustomToastProps) => (
        <LinearGradient
            colors={['#D2340333', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={toastStyles.container} >
            <View style={[toastStyles.imageBackground, { backgroundColor: '#D2340333' }]}>
                <Image style={toastStyles.imageIcon} source={localAssets.whitecross} tintColor={Color.red} />
            </View>
            {text1 && <Text style={[toastStyles.text1Success, { color: Color.red }]}>{text1}</Text>}
            {text2 && <Text style={toastStyles.text2}>{text2}</Text>}
        </LinearGradient>
    ),
    success: ({ text1, text2 }: CustomToastProps) => (
        <View style={toastStyles.blurBackground}>
            <LinearGradient
                colors={['#42BF2333', '#000000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={toastStyles.container} >
                <View style={[toastStyles.imageBackground, { backgroundColor: '#42BF2333' }]}>
                    <Image style={toastStyles.imageIcon} source={localAssets.toastright} />
                </View>
                {text1 && <Text style={toastStyles.text1Success}>{text1}</Text>}
                {text2 && <Text style={toastStyles.text2}>{text2}</Text>}
            </LinearGradient>
        </View>

    ),
    warning: ({ text1, text2 }: CustomToastProps) => (
        <LinearGradient
            colors={['#FFC70033', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={toastStyles.container} >
            <View style={[toastStyles.imageBackground, { backgroundColor: '#FFC70033' }]}>
                <Image style={toastStyles.imageIcon} source={localAssets.yellowcross} />
            </View>
            {text1 && <Text style={[toastStyles.text1Success, { color: Color.erroryellow }]}>{text1}</Text>}
            {text2 && <Text style={toastStyles.text2}>{text2}</Text>}
        </LinearGradient>
    ),
};

export default toastConfig;
