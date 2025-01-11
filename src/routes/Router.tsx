import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { navigationRef } from '@routes/Navigator';  
import { BACKUPWALLET, HOME_SCREEN, LEGAL, LOGIN, SEEDPHRASE, SPLASH, SUCCESS } from '@routes/RouteType';
import SplashScreen from '@screens/splashScreen/SplashScreen';
import HomeScreen from '@screens/homeScreen/HomeScreen';
import Legal from '@screens/legal/Legal';
import BackupWallet from '@screens/backupwallet/BackupWallet';
import SeedPhrase from '@screens/seedphrase/SeedPhrase';
import Success from '@screens/success/Success';
import Login from '@screens/login/Login';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }} initialRouteName={SPLASH}>
                <Stack.Screen component={SplashScreen} name={SPLASH} />
                <Stack.Screen component={HomeScreen} name={HOME_SCREEN} />
                <Stack.Screen component={Legal} name={LEGAL} />
                <Stack.Screen component={BackupWallet} name={BACKUPWALLET} />
                <Stack.Screen component={SeedPhrase} name={SEEDPHRASE} />
                <Stack.Screen component={Success} name={SUCCESS} />
                <Stack.Screen component={Login} name={LOGIN} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
