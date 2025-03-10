import { useMemo } from "react";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";

const useAddress = (type: string) => {
 const { selectedAccount } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);

  const selectedNetwork = useMemo(() => {
    if (!selectedAccount) return null;
    return type === "Bitcoin"
      ? selectedAccount.btcAddress
      : selectedAccount.stxAddress
  }, [selectedAccount]);

  return selectedNetwork;
};

export default useAddress;
