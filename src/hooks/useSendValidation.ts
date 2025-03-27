import { useState, useEffect } from "react";
import { fetchPrice } from "@utils/cryptoUtils";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { btcToSats, satsToBtc } from "@orangecryptohq/orangeseed";
import { strings } from "@strings/i18n";

const BITCOIN_DUST_AMOUNT_SATS = 1500;
const MIN_STX = 0.000001
const MICROSATS =1
const useSendValidation = (selectedCoin) => {
    const [amount, setAmount] = useState(0);
    const [sendFiatRate, setSendFiatRate] = useState(0);
    const [invalidFund, setInvalidFund] = useState(false);
    const [invalidFundMessage, setInvalidFundMessage] = useState("");

    useEffect(() => {
        const fetchFiatRate = async () => {
            if (!selectedCoin) return;
            try {
                const fiatRate = await fetchPrice(selectedCoin.ticker.trim());
                setSendFiatRate(fiatRate);
            } catch (error) {
                console.error("Error fetching fiat rate:", error);
            }
        };

        if (selectedCoin) {
            fetchFiatRate();
            setSendFiatRate(0);
            setAmount(0);
            setInvalidFund(false);
            setInvalidFundMessage("");
        }
    }, [selectedCoin]);

    const onAmountChange = (amount) => {
        setAmount(amount);
        if (!selectedCoin) return;

        const bigAmount = new BigNumber(amount);
        const bigBalance = new BigNumber(selectedCoin.balance);

        if (amount === "" || bigAmount.isZero()) {
            setInvalidFund(false);
            setInvalidFundMessage("");
            return;
        }

        if (bigAmount.isGreaterThan(bigBalance)) {
            setInvalidFund(true);
            setInvalidFundMessage(strings.insufficientfunds);
            return;
        }

        let isBelowDustAmount = false;
        let errorMessage = "";

        switch (selectedCoin.protocol) {
            case "btc":
                isBelowDustAmount = new BigNumber(btcToSats(bigAmount)).isLessThan(BITCOIN_DUST_AMOUNT_SATS);
                if (isBelowDustAmount) {
                    errorMessage = `${strings.minimumtransfer} ${satsToBtc(new BigNumber(BITCOIN_DUST_AMOUNT_SATS))} BTC for ${selectedCoin.ticker}`;
                }
                break;

            case "brc-20":
            case "runes":
                isBelowDustAmount = bigAmount.isLessThan(MICROSATS);
                if (isBelowDustAmount) {
                    errorMessage = `${strings.minimumtransfer} ${MICROSATS} sats for ${selectedCoin.ticker}`;
                }
                break;

            case "stacks":
                isBelowDustAmount = bigAmount.isLessThan(MIN_STX);
                if (isBelowDustAmount) {
                    errorMessage = `${strings.minimumtransfer} ${MIN_STX} STX for ${selectedCoin.ticker}`;
                }
                break;

            default:
                break;
        }

        setInvalidFund(isBelowDustAmount);
        setInvalidFundMessage(isBelowDustAmount ? errorMessage : "");
    };

    return {
        amount,
        sendFiatRate,
        invalidFund,
        invalidFundMessage,
        onAmountChange,
        setAmount,
    };
};

export default useSendValidation;
