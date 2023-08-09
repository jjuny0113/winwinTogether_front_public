import { useQuery } from "@tanstack/react-query";
import { getMarketInfo } from "./getMarketInfo";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

export const useGetMarketInfo = (marketId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.MARKET_INFO, marketId],
    queryFn: () => getMarketInfo(marketId),
    enabled: !!marketId,
  });

  if (error) {
    throw new Error();
  }
  return {
    data,
    isLoading,
  };
};
