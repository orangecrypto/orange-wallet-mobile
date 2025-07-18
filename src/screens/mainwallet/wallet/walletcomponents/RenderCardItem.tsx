import { localAssets } from '@assets/assets';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { strings } from '@strings/i18n';
import { Image, ImageBackground, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from '../styles';
import { Responsive } from '@utils/Responsive';
import TokenImage from '@components/TokenImage';
import useBtcClient from '@hooks/useBtcClient';
import { ApiEndpoints } from '@services/network/ApiEndpoints';
import { useSelector } from 'react-redux';
import { appReducerType } from '@redux/slice/appReducer';
import AppConfig from 'react-native-config';
import { store } from '@redux/store';

import {
    SkaletonView,
    ANIMATION_TYPE,
    ANIMATION_DIRECTION,
} from 'react-native-skaleton-kit';
import { Color } from '@values/color';
const RenderCardItem = ({ item, selectedItem, loader }) => {
    const account = store.getState().appReducer.selectedAccount
    const { bitcoinAddress } = useBtcClient();
    const { network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
    function formatBalance(balance) {
        let num = parseFloat(balance);
        return num % 1 === 0 ? num.toFixed(0) : num.toString().replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
    
    }
    function formatTotalBalance(balance: number): string {
        if (balance === 0) return '0';
        const fixed = balance.toFixed(2); 
        const num = parseFloat(fixed); 
        return num % 1 === 0 ? num.toFixed(0) : num.toString();
      }
    const getTanStackUrl = async () => {
        try {
            const transakUrl = new URL(ApiEndpoints.TRANSAK_URL);
            transakUrl.searchParams.append('apiKey', `${AppConfig.TRANSAK_API_KEY}`);
            transakUrl.searchParams.append('cryptoCurrencyList', 'USD');
            transakUrl.searchParams.append('defaultCryptoCurrency', 'USD');
            transakUrl.searchParams.append('walletAddress', bitcoinAddress);
            transakUrl.searchParams.append('disableWalletAddressForm', 'true');
            transakUrl.searchParams.append(
                'exchangeScreenTitle',
                `${'SELL'} ${'USD'}`,
            );
            transakUrl.searchParams.append('productsAvailed', 'SELL');
            return transakUrl.toString();
        } catch (error) {
            console.log('getMoonPayUrl', error)
        }
    };
    

    const openSale = async () => {

        console.log('openSale ', item)
        const getWebURL = await getTanStackUrl()
        console.log("Opening Tanstack Gateway", getWebURL);
        try {
            Linking.openURL(getWebURL.toString());
        } catch (error) {
            console.log('getWebURL ', error)
        }
    }


    const handleReceive = async (item) => {
        console.log('handleReceive', item);
    
        let receiveItem = {
            address: '',
            name: '',
        };
    
        switch (item.protocol) {
            case 'brc-20':
            case 'runes':
                receiveItem = {
                    address: account?.ordinalsAddress,
                    name: 'Ordinals, RUNES and BRC20',
                };
                break;
    
            case 'btc':
                receiveItem = {
                    address: account?.btcAddress,
                    name: 'Bitcoin',
                };
                break;
    
            case 'stacks':
                receiveItem = {
                    address: account?.stxAddress,
                    name: 'Stacks and SIP-10',
                };
                break;
    
            default:
                console.warn('Unknown protocol:', item.protocol);
                break;
        }
    
        push(RouteType.VIEWQR, { item: receiveItem });
    };
    
    return (
        <View style={styles.walletBackground}>
            <ImageBackground
                source={localAssets.walletbg}
                style={styles.walletCardBackground}>

                {loader ? (
                    <SkaletonView
                        viewHeight={100}
                        animationType={ANIMATION_TYPE.shiver}
                        direction={ANIMATION_DIRECTION.leftToRight}
                        viewWidth={'100%'}
                        backgroundColor={Color.transparent}
                        style={styles.skeletonItem}
                    />
                ) : (
                    <View style={styles.balanceView}>
                        {item?.image ? (
                            <Image source={item.image} style={styles.balanceIcon} />
                        ) : (
                            <TokenImage
                                fungibleToken={item}
                                size={Responsive.size56}
                                round
                                variant="light"
                            />
                        )}
                        <View>
                            <Text numberOfLines={1} style={[styles.walletText, { width: Responsive.size180 }]}>
                                {item.name === 'all' ? `$${formatTotalBalance(item.balance)}` : `${formatBalance(item.balance)}`}
                            </Text>
                            <View style={styles.walletTextView}>
                                {item?.name !== 'Bitcoin' && (
                                    <Text style={styles.walletTextCurrencyView}>
                                        {item.name === 'all' ? item.category : item.ticker}
                                    </Text>
                                )}
                                <Text style={styles.walletTextCurrencyView}>
                                    {item.name === 'all'
                                        ? ` ${item.assetCount} Assets`
                                        : item.protocol === 'stacks'
                                            ? 'SIP-10'
                                            : `${item.protocol}`.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {item ? item.id === 1 ?
                    <TouchableOpacity style={styles.addCoinView} onPress={() => push(RouteType.ADDCOIN)}>
                        <Image style={styles.addCoinIcon} source={localAssets.addcoin} />
                        <Text style={styles.addCoinText}>{strings.addCoin}</Text>
                    </TouchableOpacity>
                    :
                    <ScrollView 
                        showsHorizontalScrollIndicator={false} 
                        horizontal 
                        style={styles.horizontalActionsScrol} 
                        contentContainerStyle={styles.scrollContentContainer}
                        nestedScrollEnabled>
                    <View style={styles.horizontalActions}>
                        <TouchableOpacity style={styles.actionButtonBg} onPress={() => push(RouteType.SEND, { tokenDetails: selectedItem })}>
                            <Image source={localAssets.send} style={styles.actionButtonIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButtonBg} onPress={() => handleReceive(item)}>
                            <Image source={localAssets.receive} style={styles.actionButtonIcon} />
                        </TouchableOpacity>
                        {item.name === 'Bitcoin' && network.type === 'Mainnet' &&
                            <TouchableOpacity style={styles.actionButtonBg} onPress={() => { push(RouteType.BUY, { isFor: 'Bitcoin' }) }}>
                                <Image source={localAssets.buy} style={styles.actionButtonIcon} />
                            </TouchableOpacity>}

                        {item.name === 'Stacks' && network.type === 'Mainnet' &&
                            <TouchableOpacity style={styles.actionButtonBg} onPress={() => { push(RouteType.BUY, { isFor: 'Stacks' }) }}>
                                <Image source={localAssets.buy} style={styles.actionButtonIcon} />
                            </TouchableOpacity>}


                        {item.name === 'Bitcoin' && network.type === 'Mainnet' && item.balance !== '0' && (
                            <TouchableOpacity style={styles.actionButtonBg} onPress={openSale}>
                                <Image source={localAssets.sell} style={styles.actionButtonIcon} />
                            </TouchableOpacity>
                        )}
                        {item.name === 'Bitcoin' && network.type === 'Mainnet' &&
                            <TouchableOpacity style={styles.actionButtonBg} onPress={() => push(RouteType.SWAP, { tokenDetails: selectedItem })}>
                                <Image source={localAssets.swapcard} style={styles.actionButtonIcon} />
                            </TouchableOpacity>}

                            
                            {/* {item.name === 'Bitcoin' &&  network.type === 'Mainnet' &&
                            <TouchableOpacity style={styles.actionButtonBg} onPress={() => push(RouteType.BORROW, { tokenDetails: selectedItem })}>
                                <Image source={localAssets.borrow} style={styles.actionButtonIcon} />
                            </TouchableOpacity>} */}
                    </View>
                    </ScrollView>
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