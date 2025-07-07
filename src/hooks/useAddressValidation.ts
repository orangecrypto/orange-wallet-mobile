import { useState, useEffect } from "react";
import { strings } from "@strings/i18n";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import { validateBtcAddress, validateBtcAddressIsTaproot, validateStxAddress } from "@orangecryptohq/orangeseed";

const useAddressValidation = (enteredAddress, selectedCoin) => {
  const { selectedAccount, network } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!enteredAddress) {
      setIsValidAddress(true);
      setErrorMessage("");
      return;
    }

    let isValid = true;
    let error = "";

    switch (selectedCoin?.protocol) {
      case "btc":
        isValid = validateBtcAddress({ btcAddress: enteredAddress, network: network?.type });
        if (enteredAddress === selectedAccount.btcAddress) error = strings.selfAddress;
        break;
      
      case "brc-20":
      case "runes":
        isValid = validateBtcAddressIsTaproot(enteredAddress);
        if (enteredAddress === selectedAccount.ordinalsAddress) error = strings.selfAddress;
        break;
      
      case "stacks":
        isValid = validateStxAddress({ stxAddress: enteredAddress, network: network?.type });
        if (enteredAddress === selectedAccount.stxAddress) error = strings.selfAddress;
        break;
    }

    setIsValidAddress(isValid && !error);
    setErrorMessage(isValid ? error : strings.invalidAddress);
  }, [enteredAddress, selectedCoin, selectedAccount, network]);

  return { isValidAddress, errorMessage };
};

export default useAddressValidation;
