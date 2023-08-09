import { useQuery } from "@tanstack/react-query";
import { getTotalInfo } from "./getTotalInfo";
import { useGetUser } from "@/app/common/user/useGetUser";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

export const useGetTotalInfo = () => {
  const user = useGetUser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.TOTAL_INFO],
    queryFn: getTotalInfo,
    enabled: !!user?.market_id,
  });

  return {
    data,
    isLoading,
    error,
  };
};
