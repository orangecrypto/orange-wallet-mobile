import { localAssets } from '@assets/assets';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { white, viewbutton } from '@values/color';
import { Fonts } from '@values/fonts';
import { ImageBackground, Image, Text, TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";

const RenderCardItem = ({ item, selectedItem }) => {
    return (
        <ImageBackground
            source={localAssets.walletbg}
            style={styles.walletBackground}
            borderRadius={12}>
            <View style={styles.balanceView}>
                <Image source={localAssets.walletbalance} style={styles.balanceIcon} />
                <View>
                    <Text style={styles.walletText}>{selectedItem ? selectedItem.value : item.value}</Text>
                    <View style={styles.walletTextView}>
                        <Text style={styles.walletTextCurrencyView}>{selectedItem ? selectedItem.quantity : item.quantity} {selectedItem ? selectedItem.category : item.category}</Text>
                        <Text style={styles.walletTextCurrencyView}>USD</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.addCoinView} onPress={() => { console.log('Open') }}>
                <Image style={styles.addCoinIcon} source={localAssets.addcoin} />
                <Text style={styles.addCoinText}>{strings.addCoin}</Text>
            </TouchableOpacity>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    walletBackground: {
        width: Dimensions.get('window').width - 40,
        marginHorizontal: Responsive.size16,
        padding: Responsive.size24,
    },
    walletText: {
        fontSize: Responsive.size22,
        color: white,
        fontFamily: Fonts.semibold,
    },
    walletTextView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: Responsive.size5,
    },
    walletTextCurrencyView: {
        backgroundColor: viewbutton,
        borderRadius: Responsive.size20,
        fontFamily: Fonts.regular,
        fontSize: Responsive.size9,
        color: white,
        padding: Responsive.size4,
        marginLeft: Responsive.size10,
    },
    balanceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    balanceIcon: {
        height: Responsive.size56,
        width: Responsive.size56,
    },
    addCoinView: {
        backgroundColor: viewbutton,
        borderRadius: Responsive.size20,
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: Responsive.size10,
        width: Responsive.size147,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: Responsive.size28,
    },
    addCoinIcon: {
        height: Responsive.size18,
        width: Responsive.size18,
    },
    addCoinText: {
        fontFamily: Fonts.light,
        fontSize: Responsive.size14,
        color: white,
        marginLeft: Responsive.size5,
    },
});

export default RenderCardItem;
