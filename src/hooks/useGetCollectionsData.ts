import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@orangecryptohq/orangeseed";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import { useState } from "react";
import AppConfig from 'react-native-config';

const PAGE_SIZE = 20;

const useGetCollectionsData = () => {
  const { selectedAccount, network } = useSelector(
    (state: { appReducer: appReducerType }) => state.appReducer
  );

  const [offset, setOffset] = useState(0); // ✅ Track pagination manually

  const fetchCollectionsByAddress = async () => {
    if (!selectedAccount?.ordinalsAddress) {
      throw new Error("ordinalsAddress is required");
    }

    console.log(`⏱️ [NFT TIMING] Fetching collections with Offset: ${offset} at:`, new Date().toLocaleTimeString());

    const result = await getCollections(
      AppConfig.ORANGESEED_API_KEY,
      network?.type || "Mainnet",
     //'bc1psgkjsnvc5dq2eete2q98qnmt3qsdp23wxdff6qvp9mumve9vh09smxlnuq',
    //'bc1pzcswdh4g7ye823ryxnpmn9w8053m4ghy5n4p2eheg60xrs5pf7gse9w8ma',
    selectedAccount?.ordinalsAddress,
      offset, // ✅ Pass the manual offset
      PAGE_SIZE
    );

    console.log(`⏱️ [NFT TIMING] getCollections DONE at:`, new Date().toLocaleTimeString(), 'total:', result?.total_inscriptions);
    return result;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["collections", network?.type, selectedAccount?.ordinalsAddress, offset],
    queryFn: fetchCollectionsByAddress,
    enabled: !!network?.type && !!selectedAccount?.ordinalsAddress,
    retry: 1, // Reduce retries from 3 to 1
    retryDelay: 1000, // Wait 1 second between retries
    staleTime: 5 * 60 * 1000, // 5 minutes instead of 1 minute
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnMount: false, // Don't refetch if data exists
    refetchOnWindowFocus: false, // Don't refetch on focus
    // TIMEOUT: Don't hang forever if API is slow
    meta: {
      timeout: 30000, // 30 second timeout
    },
  });

  
  // ✅ Load Next Page
  const loadNextPage = () => {
    console.log('loadNextPage', 'call')

    if (data?.total_inscriptions && offset + PAGE_SIZE < data.total_inscriptions) {
        setOffset((prevOffset) => prevOffset + PAGE_SIZE);

      refetch(); // Fetch new page
    }
  };

  return { data, isLoading, isError, loadNextPage };
};

export default useGetCollectionsData;
