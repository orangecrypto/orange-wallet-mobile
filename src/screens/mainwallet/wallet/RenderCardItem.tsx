import { localAssets } from '@assets/assets';
import { push } from '@routes/Navigator';
import { ADDCOIN, BUY, SEND, VIEWQR } from '@routes/RouteType';
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
                <Image source={selectedItem ? selectedItem.name === 'Bitcoin'? localAssets.bitcoincard :localAssets.walletbalance:localAssets.walletbalance} style={styles.balanceIcon} />
                <View>
                    <Text style={styles.walletText}>{selectedItem ? selectedItem.value : item.value}</Text>
                    <View style={styles.walletTextView}>
                        <Text style={styles.walletTextCurrencyView}>{selectedItem ? selectedItem.quantity : item.quantity} {selectedItem ? selectedItem.category : item.category}</Text>
                        <Text style={styles.walletTextCurrencyView}>USD</Text>
                    </View>
                </View>
            </View>


            {selectedItem ? selectedItem.name === 'Bitcoin' ? 
            <View style={styles.horizontalActions}>
                <TouchableOpacity style={styles.actionButtonBg} onPress={ () => push(SEND)}>
                        <Image source={localAssets.send} style={styles.actionButtonIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonBg} onPress={()=>push(VIEWQR)}>
                        <Image source={localAssets.receive} style={styles.actionButtonIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonBg} onPress={ () => push(BUY)}>
                        <Image source={localAssets.buy} style={styles.actionButtonIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonBg}>
                        <Image source={localAssets.sell} style={styles.actionButtonIcon}/>
                </TouchableOpacity>

            </View>
            : 
            <TouchableOpacity style={styles.addCoinView} onPress={() => { push(ADDCOIN)}}>
                <Image style={styles.addCoinIcon} source={localAssets.addcoin} />
                <Text style={styles.addCoinText}>{strings.addCoin}</Text>
            </TouchableOpacity>
            :
             <TouchableOpacity style={styles.addCoinView} onPress={() => { push(ADDCOIN)}}>
             <Image style={styles.addCoinIcon} source={localAssets.addcoin} />
             <Text style={styles.addCoinText}>{strings.addCoin}</Text>
         </TouchableOpacity>}
           
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

    horizontalActions :{
        flexDirection:'row',
        marginTop:Responsive.size22,
        alignContent:'center',
        paddingHorizontal: Responsive.size10,
        justifyContent:'space-between'
    },
    
    actionButtonBg:{
        height: Responsive.size48,
        width: Responsive.size48,
        borderRadius: Responsive.size24,
        backgroundColor: viewbutton,
        alignItems:'center',
        justifyContent:'center'
    },

    actionButtonIcon:{
        height: Responsive.size24,
        width: Responsive.size24,      
    }
});

export default RenderCardItem;
