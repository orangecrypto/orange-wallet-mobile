import { localAssets } from '@assets/assets';
import Clipboard from "@react-native-clipboard/clipboard";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setCardIndex, setHeaderAddress, walletReducerType } from '@redux/slice/WalletReducer';
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from '@reduxjs/toolkit';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { strings } from '@strings/i18n';
import { truncateAddress } from '@utils/cryptoUtils';
import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import React, { useEffect } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import Loan from './loan/Loan';
import Market from './market/Market';
import Nft from './nft/Nft';
import { styles } from './styles';
import Wallet from './wallet/Wallet';

const MainWallet = () => {
    const account = store.getState().appReducer.selectedAccount
    const { headerAddress } = useSelector((state: { walletReducer: walletReducerType }) => state.walletReducer);
    const dispatch: Dispatch = useAppDispatch();
    const Tab = createBottomTabNavigator();

    useEffect(() => {
        dispatch(setHeaderAddress(account?.btcAddress))
    }, [])

    const handleCopyPress = () => {
        Clipboard.setString(headerAddress)
        Platform.OS === 'ios' &&
            Toast.show({
                type: 'success',
                text1: strings.copiedMessage,
            });
    };

    const handleAddAddress = () => {
        console.log('Add Address');
        push(RouteType.ADDADDRESS)
    };

    const handleQrPress = () => {
        push(RouteType.RECEIVE)
    };

    const handleSettingsPress = () => {
        push(RouteType.SETTINGS)
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleAddAddress} style={styles.headerClickableText}>
                    <Text style={styles.headerText} numberOfLines={1}>{truncateAddress(headerAddress)}</Text>
                </TouchableOpacity>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={handleCopyPress} style={styles.headerClickableIcon}>
                        <Image source={localAssets.copy} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleQrPress} style={styles.headerClickableIcon}>
                        <Image source={localAssets.qr} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSettingsPress} style={styles.headerClickableIcon}>
                        <Image source={localAssets.settings} style={styles.headerIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <Tab.Navigator
                screenOptions={({ route }) => ({                    
                    tabBarStyle: {
                        backgroundColor: Color.black,
                        borderRadius: Responsive.size10,
                        borderWidth: Responsive.size1,
                        borderColor: Color.gray,
                        height: Responsive.size56   ,
                        justifyContent: 'center',
                        marginHorizontal: Responsive.size16,
                        marginBottom:Responsive.size6,
                        paddingTop: Platform.OS === 'android'? Responsive.size14:0,
                        alignItems: 'center',
                        alignContent:'center',
                        position: 'absolute',
                        bottom: 0,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconSource;
                        switch (route.name) {
                            case 'Wallet':
                                iconSource = localAssets.bottomwallet;
                                break;
                            case 'Market':
                                iconSource = localAssets.marketbottom;
                                break;
                            case 'Loan':
                                iconSource = localAssets.bottomloan;
                                break;
                            case 'NFT':
                                iconSource = localAssets.bottomnft;
                                break;
                            case 'Assistant':
                                iconSource = localAssets.bottomassitant;
                                break;
                            default:
                                iconSource = localAssets.bottomwallet;
                        }

                        return (
                            <Image
                                source={iconSource}
                                style={[
                                    styles.icon,
                                    focused && styles.iconFocused,
                                    { tintColor: focused ? Color.orangeButton : '#2D3242' },
                                ]}/>
                        );
                    },
                    tabBarActiveTintColor: Color.orangeButton,
                    tabBarInactiveTintColor: 'gray',
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIconStyle: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                    },
        
                })}>
                <Tab.Screen name="Wallet" component={Wallet}
                    listeners={({ navigation, route }) => ({
                        tabPress: (e) => {
                            dispatch(setHeaderAddress(account?.btcAddress))
                            dispatch(setCardIndex(0))
                        },
                    })}/>

                <Tab.Screen name="NFT" component={Nft}
                    listeners={({ navigation, route }) => ({
                        tabPress: (e) => {
                            dispatch(setHeaderAddress(account?.ordinalsAddress))

                        },
                    })} />

                <Tab.Screen name="Market" component={Market}
                    listeners={({ navigation, route }) => ({
                        tabPress: (e) => {
                            dispatch(setHeaderAddress(account?.btcAddress))
                        },
                    })} />

                {/* <Tab.Screen name="Loan" component={Loan}
                    listeners={({ navigation, route }) => ({
                        tabPress: (e) => {
                            dispatch(setHeaderAddress(account?.btcAddress))
                        },
                    })} /> */}
                {/* <Tab.Screen name="Assistant" component={Assistant} /> */}
            </Tab.Navigator>
        </View>
    );
};
export default MainWallet;