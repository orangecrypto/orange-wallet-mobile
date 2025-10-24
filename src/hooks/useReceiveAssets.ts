import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTicker } from "@utils/cryptoUtils"; // your util
import { walletReducerType } from "@redux/slice/WalletReducer";
import { Config } from "@config/Config";

type ReceiveAsset = {
  name: string;
  ticker: string;
};

const getName = (quoteCurrency: string): string => {
  const [ticker] = quoteCurrency.split(":");
  return ticker;
};

const fetchDotswapAssets = async (): Promise<ReceiveAsset[]> => {
  try {
    const response = await fetch(`${Config.DOTSWAP_BASE_URL}/brc20swap/external/tickers`);
    if (!response.ok) throw new Error(`Dotswap error: ${response.status}`);
    const data = await response.json();
    return data.map((item: any) => ({
      name: getName(item.quote_currency),
      ticker: getTicker(item.quote_currency),
    }));
  } catch (error) {
    console.error("Dotswap fetch error:", error);
    return [];
  }
};

const fetchRunesdexAssets = async (): Promise<ReceiveAsset[]> => {
  try {
    const response = await fetch(`${Config.RUNEDEX_BASE_URL}/v1/runes`);
    if (!response.ok) throw new Error(`Runesdex error: ${response.status}`);
    const { records } = await response.json();
    return records.map((item: any) => ({
      name: item.display_name,
      ticker: getTicker(item.display_name),
    }));
  } catch (error) {
    console.error("Runesdex fetch error:", error);
    return [];
  }
};

const mergeAssets = (...sources: ReceiveAsset[][]): ReceiveAsset[] => {
  const combined = sources.flat();
  const seen = new Set<string>();

  return combined.filter(({ ticker }) => {
    const key = ticker.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const useReceiveAssets = () => {
  const { tokenList } = useSelector((state: { walletReducer: walletReducerType }) => state.walletReducer);

  const [assets, setAssets] = useState<ReceiveAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const [dotswap, runesdex] = await Promise.all([
          fetchDotswapAssets(),
          fetchRunesdexAssets(),
        ]);
        const merged = mergeAssets(tokenList, dotswap, runesdex);
        setAssets(merged);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, [tokenList]);

  return { assets, loading, error };
};
