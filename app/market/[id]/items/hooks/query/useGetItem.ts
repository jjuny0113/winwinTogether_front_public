"use client";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useParams } from "next/navigation";
import { getItem } from "./getItem";

export const useGetItem = () => {
  const param = useParams() as {
    id: string;
    itemId: string;
  };
  const itemId = Number(param.itemId);

  const { data, isLoading } = useQuery({
    queryKey: ["getitem", itemId],
    queryFn: () => getItem(itemId),
  });
  return {
    data,
    isLoading,
  };
};
