import { localAssets } from '@assets/assets';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { strings } from '@strings/i18n';
import { Image, ImageBackground, Linking, Text, TouchableOpacity, View } from "react-native";
import { styles } from '../styles';
import { Responsive } from '@utils/Responsive';
import TokenImage from '@components/TokenImage';
import useBtcClient from '@hooks/useBtcClient';
import { ApiEndpoints } from '@services/network/ApiEndpoints';
import { useSelector } from 'react-redux';
import { appReducerType } from '@redux/slice/appReducer';
import { Config } from '@config/Config';
import { store } from '@redux/store';

const RenderCardItem = ({ item, selectedItem }) => {
     const account =store.getState().appReducer.selectedAccount
    const { bitcoinAddress } = useBtcClient();
    const { network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);

    const getTanStackUrl = async () => {
        try {
            const transakUrl = new URL(ApiEndpoints.TRANSAK_URL);
            transakUrl.searchParams.append('apiKey', Config.TRANSAK_API_KEY);
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
    
        const addressMap = {
            Bitcoin: account?.btcAddress,
            'brc-20': account?.ordinalsAddress,
            runes: account?.ordinalsAddress,
            stacks: account?.stxAddress,
        };
    
        const receiveItem = { address: addressMap[item.name] || addressMap[item.protocol] };
    
        push(RouteType.VIEWQR, { item: receiveItem });
    };
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
                        <TouchableOpacity style={styles.actionButtonBg} onPress={() => handleReceive(item)}>
                            <Image source={localAssets.receive} style={styles.actionButtonIcon} />
                        </TouchableOpacity>


                        {selectedItem.name === 'Bitcoin' && network.type === 'Mainnet' &&
                            <TouchableOpacity style={styles.actionButtonBg} onPress={() => { push(RouteType.BUY, { isFor: 'Bitcoin' }) }}>
                                <Image source={localAssets.buy} style={styles.actionButtonIcon} />
                            </TouchableOpacity>}

                        {selectedItem.name === 'Stacks' && network.type === 'Mainnet' &&
                            <TouchableOpacity style={styles.actionButtonBg} onPress={() => { push(RouteType.BUY, { isFor: 'Stacks' }) }}>
                                <Image source={localAssets.buy} style={styles.actionButtonIcon} />
                            </TouchableOpacity>}


                        {selectedItem.name === 'Bitcoin' && network.type === 'Mainnet' &&
                            <TouchableOpacity style={styles.actionButtonBg} onPress={() => openSale()}>
                                <Image source={localAssets.sell} style={styles.actionButtonIcon} />
                            </TouchableOpacity>}
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