"use client";

import { GenerateWeatherContent } from "@/util/generateWeatherContent";
import { useGetTodayWeather } from "./useGetTodayWeather";
import { gql } from "graphql-request";
import { CreatePostDto, SuccessResponse, failResponse } from "./types";
import { ContentType } from "@/app/market/info/constants";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useChatStore } from "../zustand/useChatStore";
import { shallow } from "zustand/shallow";
import { useMutation } from "@tanstack/react-query";
import { useWeatherStore } from "../zustand/useWeatherStore";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

export const useCreateWeatherPost = () => {
  const { data } = useGetTodayWeather();
  const { setState } = useChatStore((state) => ({
    setState: state.setState,
  }));

  const { select, customValue } = useWeatherStore(
    (state) => ({
      select: state.select,
      customValue: state.customValue,
    }),
    shallow
  );
  const invalidateQueries = useInvalidateQueries();
  const createWeatherPost = async () => {
    setState("isNotGenerageTags", false);
    setState("isFailtoGetContent", false);

    if (!data) return;
    const option =
      select === "self" ? customValue : GenerateWeatherContent.getContent(data);

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
        type: ContentType.WEATHER,
        instaPostOptionInput: [
          {
            key: ContentType.WEATHER,
            option,
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

  const { mutateAsync, isLoading } = useMutation(createWeatherPost);
  return {
    mutationCreateWeatherPostAsync: mutateAsync,
    isCreateWeatherPostLoading: isLoading,
  };
};
