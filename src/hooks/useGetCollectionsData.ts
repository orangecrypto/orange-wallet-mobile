import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@orangecryptohq/orangeseed";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import { useState } from "react";

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

    console.log(`Fetching Data with Offset: ${offset}`);

    return getCollections(
      network?.type || "Mainnet",
     'bc1psgkjsnvc5dq2eete2q98qnmt3qsdp23wxdff6qvp9mumve9vh09smxlnuq',
    //'bc1pzcswdh4g7ye823ryxnpmn9w8053m4ghy5n4p2eheg60xrs5pf7gse9w8ma',
      offset, // ✅ Pass the manual offset
      PAGE_SIZE
    );
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["collections", network?.type, selectedAccount?.ordinalsAddress, offset],
    queryFn: fetchCollectionsByAddress,
    enabled: !!network?.type && !!selectedAccount?.ordinalsAddress,
    retry: 3,
    staleTime: 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
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
