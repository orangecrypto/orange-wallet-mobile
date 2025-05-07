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
import Buy from '@screens/buy/Buy';
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
import ResetWallet from '@screens/settings/resetwallet/ResetWallet';
import VerifyPassword from '@screens/settings/resetwallet/VerifyPassword';
import RestoreAssets from '@screens/settings/restoreassets/RestoreAssets';
import RestoreDetails from '@screens/settings/restoreassets/RestoreDetails';
import Settings from '@screens/settings/Settings';
import UpdatePassword from '@screens/settings/updatepassword/UpdatePassword';
import SplashScreen from '@screens/splashScreen/SplashScreen';
import Success from '@screens/success/Success';
import WalletRestored from '@screens/success/WalletRestored';
import Warning from '@screens/warnings/Warning';
import React from 'react';
import SendConfirmOrdinlas from '@screens/sendings/SendConfirmOrdinlas';
import ConfirmBrc20 from '@screens/sendings/brc20/ConfirmBrc20';
import SendBrc20Confirmation from '@screens/sendings/brc20/SendBrc20Confirmation';
import Borrow from '@screens/borrow/Borrow';
import BorrowOffers from '@screens/borrow/BorrowOffers';
import BorrowConfirmation from '@screens/borrow/BorrowConfirmation';
import LoanStatus from '@screens/borrow/LoanStatus';
import Swap from '@screens/swap/Swap';
import ConfirmSwapTransaction from '@screens/swap/ConfirmSwapTransaction';
import SwapProviders from '@screens/swap/SwapProviders';
import SwapDetails from '@screens/swap/swapdetails/SwapDetails';
import ReviewTransactions from '@screens/swap/ReviewTransactions';
import Repay from '@screens/mainwallet/loan/Repay';
import EditSlippage from '@screens/swap/swapdetails/EditSlippage';

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
                <Stack.Screen component={VerifyPassword} name={RouteType.RESETWALLETPASSWORD}/>
                <Stack.Screen component={SendConfirmOrdinlas} name={RouteType.SENDORDINALSCONFIRMATION}/>
                <Stack.Screen component={ConfirmBrc20} name={RouteType.CONFIRMBRC20}/>
                <Stack.Screen component={SendBrc20Confirmation} name={RouteType.SENDCONFIRMBRC20}/>
                <Stack.Screen component={Borrow} name={RouteType.BORROW}/>
                <Stack.Screen component={BorrowOffers} name={RouteType.BORROWOFFERS}/>
                <Stack.Screen component={BorrowConfirmation} name={RouteType.BORROWCONFIRMATION}/>
                <Stack.Screen component={LoanStatus} name={RouteType.LOANSTATUS}/>
                <Stack.Screen component={Swap} name={RouteType.SWAP}/>
                <Stack.Screen component={SwapProviders} name={RouteType.SWAPPROVIDERS}/>
                <Stack.Screen component={SwapDetails} name={RouteType.SWAPDETAILS}/>
                <Stack.Screen component={ReviewTransactions} name={RouteType.REVIEWSWAPTRANSACTION}/>
                <Stack.Screen component={ConfirmSwapTransaction} name={RouteType.CONFIRMSWAPTRANSACTION}/>
                <Stack.Screen component={Repay} name={RouteType.REPAY}/>
                <Stack.Screen component={EditSlippage} name={RouteType.EDITSLIPPAGE}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
