import { ContentType } from "@/app/market/info/constants";
import { gql } from "graphql-request";
import { CreatePostDto, SuccessResponse, failResponse } from "./types";
import { useChatStore } from "../zustand/useChatStore";
import { shallow } from "zustand/shallow";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

export const useCreateCustomPost = () => {
  const { option, setState } = useChatStore(
    (state) => ({
      option: state.optionValue.SELF,
      setState: state.setState,
    }),
    shallow
  );
  const invalidateQueries = useInvalidateQueries();
  const createCustomPost = async () => {
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
        type: ContentType.SELF,
        instaPostOptionInput: [
          {
            key: ContentType.SELF,
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
  const { mutateAsync, isLoading } = useMutation(createCustomPost);

  return {
    mutationCreateCustomPostAsync: mutateAsync,
    isCreateCustomPostLoading: isLoading,
  };
};
