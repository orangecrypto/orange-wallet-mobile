import { fetchPrice } from "@utils/cryptoUtils";
import { useEffect, useMemo, useState } from "react";

type TokenType = {
  balance?: string | number;
  ticker: string;
};

export const useExchangeAmountValidation = (selectedToken: TokenType) => {
  const [amount, setAmount] = useState("");
  const [fiatRate, setFiatRate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const numericAmount = parseFloat(amount);
  const numericBalance = parseFloat(selectedToken.balance as string);

  useEffect(() => {
    const loadFiatRate = async () => {
      setLoading(true);
      try {
        const rate = await fetchPrice(selectedToken.ticker);
        console.log(rate)
        if (rate && !isNaN(rate)) {
          setFiatRate(rate);
        } else {
          setFiatRate(0);
        }
      } catch (e) {
        console.error("Error fetching fiat rate:", e);
        setFiatRate(0);
      } finally {
        setLoading(false);
      }
    };

    if (selectedToken?.ticker) {
      loadFiatRate();
    }
  }, [selectedToken]);

  const isValid = useMemo(() => {
    return !isNaN(numericAmount) && numericAmount > 0 && numericAmount <= numericBalance;
  }, [numericAmount, numericBalance]);

  const fiatValue = useMemo(() => {
    if (!isValid || fiatRate === 0) return "0.00";
    return (numericAmount * fiatRate).toFixed(2);
  }, [isValid, numericAmount, fiatRate]);

  return {
    amount,
    setAmount,
    isValid,
    fiatValue,
    fiatRate,
    loading,
  };
};
