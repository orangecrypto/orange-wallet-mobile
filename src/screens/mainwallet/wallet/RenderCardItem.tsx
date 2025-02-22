import { localAssets } from '@assets/assets';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { strings } from '@strings/i18n';
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from './styles';

const RenderCardItem = ({ item, selectedItem }) => {

    console.log('RenderCardItem', selectedItem)
    return (
        <ImageBackground
            source={localAssets.walletbg}
            style={styles.walletBackground}
            borderRadius={12}>
            <View style={styles.balanceView}>
                <Image source={selectedItem ? selectedItem.name === 'Bitcoin' ? localAssets.bitcoincard : selectedItem.name === 'Stacks' ? localAssets.stackscard : localAssets.walletbalance : localAssets.walletbalance} style={styles.balanceIcon} />
                <View>
                    <Text style={styles.walletText}>{selectedItem ? `$${selectedItem.balance}` : `$${item.balance}`}</Text>
                    <View style={styles.walletTextView}>
                        <Text style={styles.walletTextCurrencyView}> {selectedItem ? selectedItem.category : item.category} </Text>
                        {selectedItem ? selectedItem.name === 'Bitcoin' ?
                            null
                            :
                            selectedItem.name === 'Stacks' ?
                                <Text style={styles.walletTextCurrencyView}>SIP 10</Text>
                                :
                                <Text style={styles.walletTextCurrencyView}>{` ${item.assetCount} Assets`}</Text>
                            :
                            <Text style={styles.walletTextCurrencyView}>{` ${item.assetCount} Assets`}</Text>

                        }
                    </View>
                </View>
            </View>
            {selectedItem ? selectedItem.id === 1 ?
                <TouchableOpacity style={styles.addCoinView} onPress={() => push(RouteType.ADDCOIN)}>
                    <Image style={styles.addCoinIcon} source={localAssets.addcoin} />
                    <Text style={styles.addCoinText}>{strings.addCoin}</Text>
                </TouchableOpacity>
                :
                <View style={styles.horizontalActions}>
                    <TouchableOpacity style={styles.actionButtonBg} onPress={() => push(RouteType.SEND)}>
                        <Image source={localAssets.send} style={styles.actionButtonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButtonBg} onPress={() => push(RouteType.VIEWQR)}>
                        <Image source={localAssets.receive} style={styles.actionButtonIcon} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.actionButtonBg} onPress={() => push(RouteType.BUY)}>
                    <Image source={localAssets.buy} style={styles.actionButtonIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonBg} onPress={() => push(RouteType.WARNING)}>
                    <Image source={localAssets.sell} style={styles.actionButtonIcon} />
                </TouchableOpacity> */}

                </View> :
                <TouchableOpacity style={styles.addCoinView} onPress={() => push(RouteType.ADDCOIN)}>
                    <Image style={styles.addCoinIcon} source={localAssets.addcoin} />
                    <Text style={styles.addCoinText}>{strings.addCoin}</Text>
                </TouchableOpacity>
            }
        </ImageBackground>

    );
};
export default RenderCardItem;