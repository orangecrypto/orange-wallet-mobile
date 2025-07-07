import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInscriptions = async (ids: string[]) => {
  if (!ids.length) return { data: [], total_inscriptions_brc_20: 0 };

  try {
    const requests = ids.map(async (id) => {
      const url = `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`;
      const response = await axios.get(url);

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
    });

    const results = await Promise.all(requests);
    const filteredData = results.filter((item) => item !== null);

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
    staleTime: 60 * 1000,
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
