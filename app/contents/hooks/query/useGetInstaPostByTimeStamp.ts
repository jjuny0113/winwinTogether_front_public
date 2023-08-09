"use client";
import { useQuery } from "@tanstack/react-query";
import { ValueOf } from "./../../../@types/ValueOf";
import { ContentType } from "../../../market/info/constants";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { gql } from "graphql-request";
import { useContentsStore } from "../zustand/useContentsStore";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
import { useGetUser } from "@/app/common/user/useGetUser";

export const useGetInstaPostByTimeStamp = () => {
  const { curretSetTimestamp } = useContentsStore((state) => ({
    curretSetTimestamp: state.curretSetTimestamp,
  }));
  const user = useGetUser();
  const getInstaPostByTimeStamp = async (timestamp: number) => {
    const query = gql`
      query instaPostByTimestamp($timestamp: Float!) {
        instaPostByTimestamp(timestamp: $timestamp) {
          status
          result {
            id
            type
            content
            posts_img_url
            create_at
            instaPostOptions {
              id
              key
              option
            }
            tags {
              id
              name
            }
          }
        }
      }
    `;
    const variables = {
      timestamp,
    };

    const result: SuccessResponse | failResponse =
      await getGraphQLClient.request(query, variables);
    if (result.instaPostByTimestamp.status === "error") {
      return [];
    }
    return result.instaPostByTimestamp.result;
  };
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.INSTA_POST, curretSetTimestamp],
    queryFn: () => getInstaPostByTimeStamp(curretSetTimestamp),
    enabled: !!curretSetTimestamp || !!user?.market_id,
  });

  return { data, isLoading };
};

interface instaPost {
  id: number;
  type: ValueOf<typeof ContentType>;
  content: string;
  create_at: number;
  instaPostOptions: {
    id: number;
    key: "SELF" | "WEATHER" | "name" | "price" | "description";
    option: string;
  }[];
  tags: {
    id: number;
    name: string;
  }[];
}

interface SuccessResponse {
  instaPostByTimestamp: {
    status: "ok";
    result: instaPost[];
  };
}

interface failResponse {
  instaPostByTimestamp: {
    status: "error";
    message: string;
  };
}
