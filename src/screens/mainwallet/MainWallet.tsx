import { localAssets } from '@assets/assets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Responsive } from '@utils/Responsive';
import { black, gray, grey, orangeButton, white } from '@values/color';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Assistant from './assistant/Assistant';
import Market from './market/Market';
import Nft from './nft/Nft';
import Wallet from './wallet/Wallet';

const MainWallet = () => {
    const Tab = createBottomTabNavigator();

    return (
        <View style={styles.container}>
          <View style={styles.header}>
                <Text style={styles.headerText}>3Lq8...JVK4</Text>
                <View style={styles.iconsContainer}>
                    <Image
                        source={localAssets.copy}  
                        style={styles.headerIcon}
                    />
                    <Image
                        source={localAssets.qr}  
                        style={styles.headerIcon}
                    />
                    <Image
                        source={localAssets.settings}  
                        style={styles.headerIcon}
                    />
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

                        // Choose the appropriate icon based on the route
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
        padding: Responsive.size16,
    },
    password: {
        fontSize: Responsive.size22,
        color: orangeButton,
    },
    icon: {
        width: Responsive.size24,
        height: Responsive.size24,
    },
    iconFocused: {
        borderRadius: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Responsive.size16,
        marginBottom: Responsive.size24,
        borderWidth: Responsive.size1,
        borderColor: grey,
        padding: Responsive.size16,
        borderRadius: Responsive.size10
    },
    headerText: {
        fontSize: Responsive.size20,
        color: white,
        flex: 1,
    },
    headerIcon: {
        width: Responsive.size20,
        height: Responsive.size20,
        marginLeft: Responsive.size12, 
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '30%', 
    },
});

export default MainWallet;
