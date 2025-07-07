import { useQuery } from "@tanstack/react-query";

const fetchOrdinalData = async (inscriptionId: string) => {
  const response = await fetch(`https://api.hiro.so/ordinals/v1/inscriptions/${inscriptionId}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

const useOrdinalData = (inscriptionId: string) => {
  return useQuery({
    queryKey: ["ordinalData", inscriptionId],
    queryFn: () => fetchOrdinalData(inscriptionId),
    enabled: Boolean(inscriptionId),
    retry: 3,
    staleTime: 1000 * 60 * 5, // Cache result for 5 minutes
  });
};

export default useOrdinalData;
