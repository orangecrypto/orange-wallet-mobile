import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import AddCoin from '@screens/addcoin/AddCoin';
import AddAddress from '@screens/address/AddAddress';
import BackupWallet from '@screens/backupwallet/BackupWallet';
import ForgotPassword from '@screens/forgotpassword/ForgotPassword';
import HomeScreen from '@screens/homeScreen/HomeScreen';
import Legal from '@screens/legal/Legal';
import Login from '@screens/login/Login';
import MainWallet from '@screens/mainwallet/MainWallet';
import IncriptionDetails from '@screens/mainwallet/nft/IncriptionDetails';
import Transfer from '@screens/mainwallet/nft/Transfer';
import Receive from '@screens/receive/Receive';
import ViewQr from '@screens/receive/ViewQr';
import SeedPhrase from '@screens/seedphrase/SeedPhrase';
import Buy from '@screens/sendings/Buy';
import Confirmation from '@screens/sendings/Confirmation';
import EditConfirmation from '@screens/sendings/EditConfirmation';
import EditFees from '@screens/sendings/EditFees';
import EditNonce from '@screens/sendings/EditNonce';
import Send from '@screens/sendings/Send';
import SendConfirmation from '@screens/sendings/SendConfirmation';
import SendOrdinals from '@screens/sendings/SendOrdinals';
import BackupYourWallet from '@screens/settings/backupwallet/BackupYourWallet';
import CopySeedPhrase from '@screens/settings/backupwallet/CopySeedPhrase';
import Cms from '@screens/settings/Cms';
import Currency from '@screens/settings/Currency';
import Network from '@screens/settings/Network';
import ResetWallet from '@screens/settings/ResetWallet';
import RestoreAssets from '@screens/settings/restoreassets/RestoreAssets';
import RestoreDetails from '@screens/settings/restoreassets/RestoreDetails';
import Settings from '@screens/settings/Settings';
import UpdatePassword from '@screens/settings/updatepassword/UpdatePassword';
import SplashScreen from '@screens/splashScreen/SplashScreen';
import Success from '@screens/success/Success';
import WalletRestored from '@screens/success/WalletRestored';
import Warning from '@screens/warnings/Warning';
import React from 'react';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }} initialRouteName={RouteType.SPLASH}>
                <Stack.Screen component={SplashScreen} name={RouteType.SPLASH} />
                <Stack.Screen component={HomeScreen} name={RouteType.HOME_SCREEN} />
                <Stack.Screen component={Legal} name={RouteType.LEGAL} />
                <Stack.Screen component={BackupWallet} name={RouteType.BACKUPWALLET} />
                <Stack.Screen component={SeedPhrase} name={RouteType.SEEDPHRASE} />
                <Stack.Screen component={Success} name={RouteType.SUCCESS} />
                <Stack.Screen component={Login} name={RouteType.LOGIN} />
                <Stack.Screen component={MainWallet} name={RouteType.WALLETBALANCE}/>
                <Stack.Screen component={Settings} name= {RouteType.SETTINGS}/>
                <Stack.Screen component={AddAddress} name={RouteType.ADDADDRESS}/>
                <Stack.Screen component={AddCoin} name={RouteType.ADDCOIN}/>
                <Stack.Screen component={Network} name={RouteType.NETWORK}/>
                <Stack.Screen component={Currency} name={RouteType.CURRENCY}/>
                <Stack.Screen component={Cms} name={RouteType.CMS}/>
                <Stack.Screen component={UpdatePassword} name={RouteType.UPDATEPASSWORD}/>
                <Stack.Screen component={BackupYourWallet} name={RouteType.BACKUPYOURWALLET}/>
                <Stack.Screen component={CopySeedPhrase} name={RouteType.COPYSEEDPHRASE}/>
                <Stack.Screen component={RestoreAssets} name={RouteType.RESTOREASSETS}/>
                <Stack.Screen component={RestoreDetails} name={RouteType.ASSETDETAILS}/>
                <Stack.Screen component={ResetWallet} name={RouteType.RESETWALLET}/>
                <Stack.Screen component={Send} name={RouteType.SEND}/>
                <Stack.Screen component={SendConfirmation} name={RouteType.SENDCONFIRMATION}/>
                <Stack.Screen component={EditConfirmation} name={RouteType.EDITCONFIRMATION}/>
                <Stack.Screen component={Confirmation} name={RouteType.CONFIRMATION}/>
                <Stack.Screen component={EditFees} name={RouteType.EDITFEES}/>
                <Stack.Screen component={EditNonce} name={RouteType.EDITNONCE}/>
                <Stack.Screen component={Buy} name={RouteType.BUY}/>
                <Stack.Screen component={IncriptionDetails} name={RouteType.INCRIPTIONDETAILS}/>
                <Stack.Screen component={SendOrdinals} name={RouteType.SENDORDINALS}/>
                <Stack.Screen component={Transfer} name={RouteType.TRANSFER}/>
                <Stack.Screen component={ForgotPassword} name={RouteType.FORGOTPASSWORD}/>
                <Stack.Screen component={Receive} name={RouteType.RECEIVE}/>
                <Stack.Screen component={ViewQr} name={RouteType.VIEWQR}/>
                <Stack.Screen component={Warning} name={RouteType.WARNING}/>
                <Stack.Screen component={WalletRestored} name={RouteType.WALLETRESTORED}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
