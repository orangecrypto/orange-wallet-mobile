import { useMemo } from "react";
import { BitcoinEsploraApiProvider } from "@orangecryptohq/orangeseed";
import { store } from "@redux/store";

const useBtcClient = () => {
  const btcClient = useMemo(
    () =>
      new BitcoinEsploraApiProvider({
        network: store.getState().appReducer.network?.type,
      }),
    []
  );

  const bitcoinAddress = store.getState().appReducer.selectedAccount?.btcAddress;

  return { btcClient, bitcoinAddress };
};

export default useBtcClient;
