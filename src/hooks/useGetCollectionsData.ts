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

    try {
      // CRITICAL FIX: Add timeout to prevent 76-second hangs
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Collections API timeout after 15 seconds')), 15000);
      });

      const fetchPromise = getCollections(
        AppConfig.ORANGESEED_API_KEY,
        network?.type || "Mainnet",
        selectedAccount?.ordinalsAddress,
        offset,
        PAGE_SIZE
      );

      // Race between API call and timeout
      const result = await Promise.race([fetchPromise, timeoutPromise]);

      console.log(`⏱️ [NFT TIMING] getCollections DONE at:`, new Date().toLocaleTimeString(), 'total:', result?.total_inscriptions);
      return result;

    } catch (error) {
      console.error(`⏱️ [NFT TIMING] getCollections FAILED at:`, new Date().toLocaleTimeString(), error.message);

      // CRITICAL: Return empty result instead of throwing
      // This prevents the loader from spinning forever on network errors
      return {
        results: [],
        total_inscriptions: 0,
        offset: 0,
        limit: PAGE_SIZE,
      };
    }
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
