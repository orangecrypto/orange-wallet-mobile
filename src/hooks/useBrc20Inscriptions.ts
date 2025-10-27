import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@utils/axiosInstance";
import { DEBUG_NETWORK_LOGGING } from "@config/Config";

// Batch requests to avoid overwhelming the API
const BATCH_SIZE = 5; // Process 5 requests at a time

const fetchInscriptions = async (ids: string[]) => {
  // Filter out empty, null, or undefined IDs
  const validIds = ids.filter(id => id && id.trim() !== '');

  if (!validIds.length) return { data: [], total_inscriptions_brc_20: 0 };

  try {
    const allResults = [];

    // Process in batches to avoid too many concurrent requests
    for (let i = 0; i < validIds.length; i += BATCH_SIZE) {
      const batch = validIds.slice(i, i + BATCH_SIZE);

      const batchRequests = batch.map(async (id) => {
        try {
          const url = `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`;
          if (DEBUG_NETWORK_LOGGING) {
            console.log(`Fetching BRC-20 inscription: ${url}`);
          }
          const response = await axiosInstance.get(url);

          if (!response.data) return null;

          const contentType = response.headers?.["content-type"] || "";

          if (response.data.p === "brc-20" && contentType.includes("text/plain")) {
            return {
              id,
              ...response.data,
              contentType,
            };
          }

          return null;
        } catch (error: any) {
          if (DEBUG_NETWORK_LOGGING) {
            console.error(`Error fetching inscription ${id}:`, error?.message || error);
            console.error(`URL that failed: https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`);
            if (error.response) {
              console.error(`Status: ${error.response.status}, Data:`, error.response.data);
            }
          }
          return null;
        }
      });

      const batchResults = await Promise.all(batchRequests);
      allResults.push(...batchResults);
    }

    const filteredData = allResults.filter((item) => item !== null);

    return {
      data: filteredData,
      total_inscriptions_brc_20: filteredData.length,
    };
  } catch (error) {
    console.error("Error fetching inscriptions:", error);
    return { data: [], total_inscriptions_brc_20: 0 };
  }
};

const useBrc20Inscriptions = () => {
  const [ids, setIds] = useState<string[]>([]);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["inscriptions", ids],
    queryFn: () => fetchInscriptions(ids),
    enabled: ids.length > 0, // Prevents execution until IDs are set
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    retry: 1, // Reduce retries
  });

  // Method to fetch inscriptions and return data
  const fetchByIds = async (newIds: string[]) => {
    setIds(newIds);
    const response = await fetchInscriptions(newIds); // Fetch data immediately
    refetch(); // Trigger React Query refetch
    return response; // Return the fetched data
  };

  return { data, isPending, error, fetchByIds };
};

export default useBrc20Inscriptions;
