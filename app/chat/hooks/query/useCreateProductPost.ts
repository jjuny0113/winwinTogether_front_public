import { useMemo } from "react";
import { useChatStore } from "../zustand/useChatStore";
import { useProductStore } from "../zustand/useProductStore";
import { useGetItemsWithUserInfo } from "./useGetItemsWithUserInfo";
import { gql } from "graphql-request";
import { CreatePostDto, SuccessResponse, failResponse } from "./types";
import { ContentType } from "@/app/market/info/constants";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

export const useCreateProductPost = () => {
  const { setState } = useChatStore((state) => ({
    setState: state.setState,
  }));

  const { itemId } = useProductStore((state) => ({
    itemId: state.itemId,
  }));
  const { data } = useGetItemsWithUserInfo();
  const invalidateQueries = useInvalidateQueries();
  const itemInfo = useMemo(() => {
    //에러처리
    if (!itemId || !data) return;
    return data.find((v) => v.id === itemId);
  }, [data, itemId]);

  const createProductPost = async () => {
    const query = gql`
      mutation instaPosts($createPostDto: CreatePostDto!) {
        instaPosts(createPostDto: $createPostDto) {
          status
          message
          result {
            id
          }
        }
      }
    `;
    const variables: {
      createPostDto: CreatePostDto;
    } = {
      createPostDto: {
        type: ContentType.PRODUCT,
        instaPostOptionInput: [
          {
            key: "name",
            option: itemInfo?.name ?? "",
          },
          {
            key: "price",
            option: (itemInfo?.price ?? "").toString(),
          },
          {
            key: "description",
            option: itemInfo?.description ?? "",
          },
        ],
      },
    };

    const result: SuccessResponse | failResponse =
      await getGraphQLClient.request(query, variables);
    if (result.instaPosts.status === "error") {
      if (result.instaPosts.message === "태그가 생성되지 않았습니다.") {
        setState("isNotGenerageTags", true);
      }
      setState("isFailtoGetContent", true);
      setState("showComment.isGenerate", false);
      return;
    }
    await invalidateQueries([QUERY_KEYS.INSTA_POST, QUERY_KEYS.TOTAL_INFO]);
    setState("showComment.isGenerate", true);
    setState("isFailtoGetContent", false);
    setState("contentId", result.instaPosts.result.id);
    return result.instaPosts.result;
  };
  const { mutateAsync, isLoading } = useMutation(createProductPost);
  return {
    mutateAsync,
    isLoading,
  };
};
