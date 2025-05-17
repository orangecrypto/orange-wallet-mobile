import { Config } from '@config/Config';
import { useQuery } from '@tanstack/react-query';
import { getTicker } from '@utils/cryptoUtils';
import axios from 'axios';
import AppConfig from 'react-native-config';

interface RuneItem {
  rune_id: string;
  slug: string;
  price_sats: number;
}

interface ExtendedRuneItem extends RuneItem {
  name: string;
  ticker: string;
}

const fetchRunesCollateral = async (): Promise<ExtendedRuneItem[]> => {
  const { data } = await axios.get<{ runes: RuneItem[] }>(
    `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/collateral/runes`,
    {
      headers: {
        Authorization: `Bearer ${AppConfig.LIQUIDIUM_API_KEY}`,
      },
    }
  );

  const uniqueRunesMap = new Map<string, RuneItem>();

  data.runes.forEach((item) => {
    if (!uniqueRunesMap.has(item.rune_id)) {
      uniqueRunesMap.set(item.rune_id, item);
    }
  });

  return Array.from(uniqueRunesMap.values()).map((item) => ({
    ...item,
    name: item.slug,
    ticker: getTicker(item.slug),
  }));
};

export const useRunesCollateral = () => {
  return useQuery({
    queryKey: ['runesCollateral'],
    queryFn: fetchRunesCollateral,
    staleTime: 1000 * 60,
  });
};