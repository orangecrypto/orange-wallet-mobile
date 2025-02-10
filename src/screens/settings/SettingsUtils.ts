import { walletFromSeedPhrase } from '@orangecryptohq/orangeseed/dist';
import Toast from 'react-native-toast-message';


export const changeNetwork = async (seedPhrase: string, networkType: string) => {

    console.log('changeNetwork', networkType)
   try {
           
        const wallet =  await walletFromSeedPhrase({ mnemonic: seedPhrase, index: 0n, network: networkType })
        const account = {
               id: 0,
               btcAddress: wallet.btcAddress,
               btcPublicKey: wallet.btcPublicKey,
               masterPubKey: wallet.masterPubKey,
               ordinalsAddress: wallet.ordinalsAddress,
               ordinalsPublicKey: wallet.ordinalsPublicKey,
               stxAddress: wallet.stxAddress,
               stxPublicKey: wallet.stxPublicKey,
           };
   
           return { account, wallet };
   
       } catch (error) {
           Toast.show({ type: 'error', text1: error.message });
       }
  };