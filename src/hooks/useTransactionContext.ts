import { useMemo } from "react";
import useBtcClient from "./useBtcClient";
import useSeedVault from "./useSeedVault";
import { btcTransaction, UtxoCache } from "@orangecryptohq/orangeseed";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTransactionContext = () => {
    const { selectedAccount, network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);

    console.log('selectedAccount', selectedAccount)
    const seedVault = useSeedVault();
    const { btcClient } = useBtcClient();
    const utxoCache = useMemo(
      () =>
        new UtxoCache({
          cacheStorageController: {
            get: async (key: string) => {
              const value = AsyncStorage.getItem(key);
              return value;
            },
            set: async (key: string, value: string) => {
                AsyncStorage.setItem(key, value);
            },
            remove: async (key: string) => {
                AsyncStorage.removeItem(key);
            },
          },
          network: network.type,
        }),
      [network.type],
    );
  
    const transactionContext = useMemo(() => {
      if (selectedAccount?.id === undefined) {
        throw new Error('No account selected');
      }
      return btcTransaction.createTransactionContext({
        account: selectedAccount,
        seedVault,
        utxoCache,
        network: network.type,
        esploraApiProvider: btcClient,
      });
    }, [utxoCache, selectedAccount, network, seedVault, btcClient]);
    console.log('transactionContext log', JSON.stringify(transactionContext))
    return transactionContext;
  };
  export default useTransactionContext;