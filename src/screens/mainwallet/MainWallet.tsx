import { localAssets } from '@assets/assets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Responsive } from '@utils/Responsive';
import { black, gray, grey, orangeButton, white } from '@values/color';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Assistant from './assistant/Assistant';
import Market from './market/Market';
import Nft from './nft/Nft';
import Wallet from './wallet/Wallet';
import { push } from '@routes/Navigator';
import { ADDADDRESS, QR, SETTINGS } from '@routes/RouteType';

const MainWallet = () => {
    const Tab = createBottomTabNavigator();

    const handleCopyPress = () => {
        console.log('Copy pressed');
    };

    const handleAddAddress = () => {
        console.log('Add Address');
        push(ADDADDRESS)
    };

    const handleQrPress = () => {
        push(QR)
    };

    const handleSettingsPress = () => {
        push(SETTINGS)
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleAddAddress} style={styles.headerClickableText}>
                <Text style={styles.headerText}>3Lq8...JVK4</Text>
                </TouchableOpacity>
                <View style={styles.iconsContainer}>
                    {/* Copy Icon */}
                    <TouchableOpacity onPress={handleCopyPress}>
                        <Image source={localAssets.copy} style={styles.headerIcon} />
                    </TouchableOpacity>

                    {/* QR Icon */}
                    <TouchableOpacity onPress={handleQrPress}>
                        <Image source={localAssets.qr} style={styles.headerIcon} />
                    </TouchableOpacity>

                    {/* Settings Icon */}
                    <TouchableOpacity onPress={handleSettingsPress}>
                        <Image source={localAssets.settings} style={styles.headerIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        backgroundColor: black,
                        borderRadius: Responsive.size10,
                        borderWidth: Responsive.size1,
                        borderColor: gray,
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
                                    { tintColor: focused ? orangeButton : '#2D3242' },
                                ]}
                            />
                        );
                    },
                    tabBarActiveTintColor: orangeButton,
                    tabBarInactiveTintColor: 'gray',
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIconStyle: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                    },
                })}
            >
                <Tab.Screen name="Wallet" component={Wallet} />
                <Tab.Screen name="Market" component={Market} />
                <Tab.Screen name="NFT" component={Nft} />
                <Tab.Screen name="Assistant" component={Assistant} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
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
        borderColor: grey,
        paddingHorizontal: Responsive.size16,
        paddingVertical: Responsive.size16,
        borderRadius: Responsive.size10,
        marginHorizontal: Responsive.size16,
    },
    headerText: {
        fontSize: Responsive.size20,
        color: white
    },
    headerClickableText: {  
        padding:Responsive.size2
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
