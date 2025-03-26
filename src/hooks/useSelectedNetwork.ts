import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { appReducerType } from "@redux/slice/appReducer";

const useSelectedNetwork = () => {
 const { network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);

  const selectedNetwork = useMemo(() => {
    if (!network) return null;
    return network.type === "Mainnet"
      ? new StacksMainnet({ url: network.address })
      : new StacksTestnet({ url: network.address });
  }, [network]);

  return selectedNetwork;
};

export default useSelectedNetwork;
