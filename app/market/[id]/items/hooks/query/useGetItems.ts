import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useParams } from "next/navigation";
import { getItems } from "./getItems";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
// 64930e1e185a5a9864b63be6
export const useGetItems = () => {
  const param = useParams() as {
    id: string;
  };
  const marketInfoId = Number(param.id);
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ITEMS, marketInfoId],
    queryFn: () => getItems(marketInfoId),

    enabled: !!marketInfoId,
  });
  return data;
};
