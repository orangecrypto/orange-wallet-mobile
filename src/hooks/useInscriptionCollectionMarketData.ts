import { CollectionMarketDataResponse, getCollectionMarketData } from "@orangecryptohq/orangeseed";
import { appReducerType } from "@redux/slice/appReducer";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import AppConfig from 'react-native-config';

//For showing details if colelction data is there
const useInscriptionCollectionMarketData = (collectionId?: string | null) => {
    const {  network } = useSelector(
        (state: { appReducer: appReducerType }) => state.appReducer
      );
    const collectionMarketData = async (): Promise<CollectionMarketDataResponse | undefined> => {
      if (!collectionId) {
        throw ('collectionId is required');
      }
      return getCollectionMarketData(AppConfig.ORANGESEED_API_KEY, network.type, collectionId);
    };
    return useQuery({
      enabled: !!collectionId,
      retry: 3,
      queryKey: ['collection-market-data', collectionId, network.type],
      queryFn: collectionMarketData,
      staleTime: 1 * 60 * 1000, // 1 min
    });
  };
  export default useInscriptionCollectionMarketData;