import { localAssets } from '@assets/assets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Assistant from './assistant/Assistant';
import Market from './market/Market';
import Nft from './nft/Nft';
import Wallet from './wallet/Wallet';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { useSelector } from 'react-redux';
import { setHeaderAddress, walletReducerType } from '@redux/slice/WalletReducer';
import { Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from "@redux/store";
import { store } from '@redux/store';
import Clipboard from "@react-native-clipboard/clipboard";
import { truncateAddress } from '@utils/Convert';

const MainWallet = () => {
    const account = store.getState().appReducer.account
    const { headerAddress } = useSelector((state: { walletReducer: walletReducerType }) => state.walletReducer);
    const dispatch: Dispatch = useAppDispatch();
    const Tab = createBottomTabNavigator();

    useEffect(()=>{
        dispatch(setHeaderAddress(account?.btcAddress))
        console.log('account ', store.getState().appReducer.account)
    },[])

    const handleCopyPress = () => {
        Clipboard.setString(headerAddress)
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

                    <TouchableOpacity onPress={handleCopyPress}>
                        <Image source={localAssets.copy} style={styles.headerIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleQrPress}>
                        <Image source={localAssets.qr} style={styles.headerIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSettingsPress}>
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
                        height: Responsive.size62,
                        justifyContent: 'center',
                        alignItems: 'center',
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
                                ]}
                            />
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
                        },
                    })}
                />
                <Tab.Screen name="Market" component={Market}
                    listeners={({ navigation, route }) => ({
                        tabPress: (e) => {
                            dispatch(setHeaderAddress(account?.btcAddress))
                        },
                    })} />
                <Tab.Screen name="NFT" component={Nft}
                    listeners={({ navigation, route }) => ({
                        tabPress: (e) => {
                            dispatch(setHeaderAddress(account?.ordinalsAddress))
                        },
                    })} />
                <Tab.Screen name="Assistant" component={Assistant} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    icon: {
        width: Responsive.size24,
        height: Responsive.size24,
    },
    iconFocused: {
        borderRadius: Responsive.size15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Responsive.size16,
        marginBottom: Responsive.size24,
        borderWidth: Responsive.size1,
        borderColor: Color.grey,
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size16,
        borderRadius: Responsive.size10,
        marginHorizontal: Responsive.size16,
    },
    headerText: {
        fontSize: Responsive.size20,
        color: Color.white,
        width: Responsive.size170
    },
    headerClickableText: {
        padding: Responsive.size2
    },
    headerIcon: {
        width: Responsive.size20,
        height: Responsive.size20,

    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '30%',
    },
});

export default MainWallet;
