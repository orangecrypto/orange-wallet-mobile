import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { navigationRef } from '@routes/Navigator';  
import { ADDADDRESS, ADDCOIN, ASSETDETAILS, BACKUPWALLET, BACKUPYOURWALLET, BUY, CMS, CONFIRMATION, CONFIRMNEWPASSWORD, COPYSEEDPHRASE, CURRENCY, EDITCONFIRMATION, EDITFEES, EDITNONCE, HOME_SCREEN, INCRIPTIONDETAILS, LEGAL, LOGIN, NETWORK, NEWPASSWORD, QR, RESETWALLET, RESTOREASSETS, SEEDPHRASE, SEND, SENDCONFIRMATION, SENDORDINALS, SETTINGS, SPLASH, SUCCESS, TRANSFER, UPDATEPASSWORD, WALLETBALANCE } from '@routes/RouteType';
import SplashScreen from '@screens/splashScreen/SplashScreen';
import HomeScreen from '@screens/homeScreen/HomeScreen';
import Legal from '@screens/legal/Legal';
import BackupWallet from '@screens/backupwallet/BackupWallet';
import SeedPhrase from '@screens/seedphrase/SeedPhrase';
import Success from '@screens/success/Success';
import Login from '@screens/login/Login';
import MainWallet from '@screens/mainwallet/MainWallet';
import Settings from '@screens/settings/Settings';
import Qr from '@screens/qr/Qr';
import AddAddress from '@screens/address/AddAddress';
import AddCoin from '@screens/addcoin/AddCoin';
import Network from '@screens/settings/Network';
import Currency from '@screens/settings/Currency';
import Cms from '@screens/settings/Cms';
import UpdatePassword from '@screens/settings/updatepassword/UpdatePassword';
import EnterNewPassword from '@screens/settings/updatepassword/EnterNewPassword';
import ConfirmNewPassword from '@screens/settings/updatepassword/ConfirmNewPassword';
import BackupYourWallet from '@screens/settings/backupwallet/BackupYourWallet';
import CopySeedPhrase from '@screens/settings/backupwallet/CopySeedPhrase';
import RestoreAssets from '@screens/settings/restoreassets/RestoreAssets';
import RestoreDetails from '@screens/settings/restoreassets/RestoreDetails';
import ResetWallet from '@screens/settings/ResetWallet';
import Send from '@screens/sendings/Send';
import SendConfirmation from '@screens/sendings/SendConfirmation';
import EditConfirmation from '@screens/sendings/EditConfirmation';
import Confirmation from '@screens/sendings/Confirmation';
import EditFees from '@screens/sendings/EditFees';
import EditNonce from '@screens/sendings/EditNonce';
import Buy from '@screens/sendings/Buy';
import IncriptionDetails from '@screens/mainwallet/nft/IncriptionDetails';
import SendOrdinals from '@screens/sendings/SendOrdinals';
import Transfer from '@screens/mainwallet/nft/Transfer';

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
                <Stack.Screen component={Qr} name= {QR}/>
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};
