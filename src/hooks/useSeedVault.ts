import { SeedVault } from "@orangecryptohq/orangeseed";
import { ReactNativeStorageAdapter } from '../services/seedVault/ReactNativeStorageAdapter'
import { MobileCryptoAdapter } from "../services/seedVault/MobileCryptoAdapter";
import { useMemo } from "react";

const useSeedVault = () => {
    const vault = useMemo(
      () =>
        new SeedVault({
          cryptoUtilsAdapter: MobileCryptoAdapter,
          secureStorageAdapter: ReactNativeStorageAdapter,
          commonStorageAdapter: ReactNativeStorageAdapter,
        }),
      [],
    );
  
    return vault;
  };
  export default useSeedVault;
