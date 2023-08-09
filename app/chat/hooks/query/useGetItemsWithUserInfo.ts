import { useGetUser } from "@/app/common/user/useGetUser";
import { getItems } from "@/app/market/[id]/items/hooks/query/getItems";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
import { useQuery } from "@tanstack/react-query";

export const useGetItemsWithUserInfo = () => {
  const user = useGetUser();
  const userMarketId = user?.market_id;
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ITEM_WITH_USER_INFO, userMarketId],
    queryFn: () => getItems(userMarketId ?? 0),
    // enabled로 userMarketId있을 때만 통신하기 떄문에 위와같이 에러처리
    enabled: !!userMarketId,
  });
  return {
    data,
    isLoading,
  };
};
