import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { Fonts } from "@values/fonts";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const Warning = () => {

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
            <ImageBackground style={styles.transactionVectorBackground} source={localAssets.transactionvector}>
                    <Image source={ localAssets.whitecross} style={styles.transactionVectorIcon}/>
                </ImageBackground>
                <Text style={styles.title}>{strings.trasnsactionFailed}</Text>
                <Text style={styles.description}>{strings.trasnsactionFailedMessage}</Text>

            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.close}
                    onPress={() => goBack()}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Responsive.size18,
    },
    title: {
        color: Color.orangeButton,
        fontSize: Responsive.size24,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size15,
    },
    description: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size20,
        marginTop: Responsive.size10,
        textAlign:'center'
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: Responsive.size20,
        padding: Responsive.size18
    },
    transactionVectorBackground:{
        height: Responsive.size100,
        width:Responsive.size100,
       justifyContent:'center',
        alignItems:'center',
    },
    transactionVectorIcon:{
        height: Responsive.size36,
        width:Responsive.size36,
       
    },
});
export default Warning;
