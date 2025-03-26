import { localAssets } from '@assets/assets';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { strings } from '@strings/i18n';
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from '../styles';
import { Responsive } from '@utils/Responsive';
import TokenImage from '@components/TokenImage';

const RenderCardItem = ({ item, selectedItem }) => {
    return (
        <View style={styles.walletBackground}>
            <ImageBackground
                source={localAssets.walletbg}
                style={styles.walletCardBackground}>
                <View style={styles.balanceView}>
                    {item?.image ? <Image source={item.image} style={styles.balanceIcon} /> :
                        <TokenImage
                            fungibleToken={item}
                            size={Responsive.size56}
                            round
                            variant="light" />
                    }
                    <View>
                        <Text numberOfLines={1} style={[styles.walletText, { width: Responsive.size150 }]}>{`${item.balance}`}</Text>
                        <View style={styles.walletTextView}>
                            {item?.name !== 'Bitcoin' && <Text style={styles.walletTextCurrencyView}> {item.name === 'all' ? item.category : item.ticker} </Text>}
                            <Text style={styles.walletTextCurrencyView}>{item.name === 'all' ? ` ${item.assetCount} Assets` : item.protocol === 'stacks' ? 'SIP-10' : `${item.protocol}`.toLocaleUpperCase()}</Text>
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
                    </View>
                    :
                    <TouchableOpacity style={styles.addCoinView} onPress={() => push(RouteType.ADDCOIN)}>
                        <Image style={styles.addCoinIcon} source={localAssets.addcoin} />
                        <Text style={styles.addCoinText}>{strings.addCoin}</Text>
                    </TouchableOpacity>
                }
            </ImageBackground>
        </View>
    );
};

export default RenderCardItem;