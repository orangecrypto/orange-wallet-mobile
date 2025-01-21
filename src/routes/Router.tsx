import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@routes/Navigator';
import { ADDADDRESS, ADDCOIN, ASSETDETAILS, BACKUPWALLET, BACKUPYOURWALLET, BUY, CMS, CONFIRMATION, CONFIRMNEWPASSWORD, COPYSEEDPHRASE, CURRENCY, EDITCONFIRMATION, EDITFEES, EDITNONCE, FORGOTPASSWORD, HOME_SCREEN, INCRIPTIONDETAILS, LEGAL, LOGIN, NETWORK, NEWPASSWORD, RECEIVE, RESETWALLET, RESTOREASSETS, SEEDPHRASE, SEND, SENDCONFIRMATION, SENDORDINALS, SETTINGS, SPLASH, SUCCESS, TRANSFER, UPDATEPASSWORD, VIEWQR, WALLETBALANCE } from '@routes/RouteType';
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
import ConfirmNewPassword from '@screens/settings/updatepassword/ConfirmNewPassword';
import EnterNewPassword from '@screens/settings/updatepassword/EnterNewPassword';
import UpdatePassword from '@screens/settings/updatepassword/UpdatePassword';
import SplashScreen from '@screens/splashScreen/SplashScreen';
import Success from '@screens/success/Success';
import React from 'react';

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
                <Stack.Screen component={MainWallet} name={WALLETBALANCE}/>
                <Stack.Screen component={Settings} name= {SETTINGS}/>
                <Stack.Screen component={AddAddress} name={ADDADDRESS}/>
                <Stack.Screen component={AddCoin} name={ADDCOIN}/>
                <Stack.Screen component={Network} name={NETWORK}/>
                <Stack.Screen component={Currency} name={CURRENCY}/>
                <Stack.Screen component={Cms} name={CMS}/>
                <Stack.Screen component={UpdatePassword} name={UPDATEPASSWORD}/>
                <Stack.Screen component={EnterNewPassword} name={NEWPASSWORD}/>
                <Stack.Screen component={ConfirmNewPassword} name={CONFIRMNEWPASSWORD}/>
                <Stack.Screen component={BackupYourWallet} name={BACKUPYOURWALLET}/>
                <Stack.Screen component={CopySeedPhrase} name={COPYSEEDPHRASE}/>
                <Stack.Screen component={RestoreAssets} name={RESTOREASSETS}/>
                <Stack.Screen component={RestoreDetails} name={ASSETDETAILS}/>
                <Stack.Screen component={ResetWallet} name={RESETWALLET}/>
                <Stack.Screen component={Send} name={SEND}/>
                <Stack.Screen component={SendConfirmation} name={SENDCONFIRMATION}/>
                <Stack.Screen component={EditConfirmation} name={EDITCONFIRMATION}/>
                <Stack.Screen component={Confirmation} name={CONFIRMATION}/>
                <Stack.Screen component={EditFees} name={EDITFEES}/>
                <Stack.Screen component={EditNonce} name={EDITNONCE}/>
                <Stack.Screen component={Buy} name={BUY}/>
                <Stack.Screen component={IncriptionDetails} name={INCRIPTIONDETAILS}/>
                <Stack.Screen component={SendOrdinals} name={SENDORDINALS}/>
                <Stack.Screen component={Transfer} name={TRANSFER}/>
                <Stack.Screen component={ForgotPassword} name={FORGOTPASSWORD}/>
                <Stack.Screen component={Receive} name={RECEIVE}/>
                <Stack.Screen component={ViewQr} name={VIEWQR}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
