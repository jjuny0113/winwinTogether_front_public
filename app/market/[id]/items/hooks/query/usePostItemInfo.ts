import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

export const usePostItemInfo = () => {
  const postItemInfo = async ({
    name,
    price,
    description,
    mall_url,
    marketInfoId,
  }: CreateItemDto): Promise<QuerySuccessResponse | QueryFailResponse> => {
    const query = gql`
      mutation createItem($createItemDto: CreateItemDto!, $marketInfoId: Int!) {
        createItem(createItemDto: $createItemDto, marketInfoId: $marketInfoId) {
          status
          result {
            id
          }
        }
      }
    `;

    const variables = {
      createItemDto: {
        name,
        price,
        description,
        mall_url,
      },
      marketInfoId,
    };
    return await getGraphQLClient.request(query, variables);
  };

  const { mutateAsync, isLoading } = useMutation(postItemInfo);

  return {
    postItemInfoAsyncMutataion: mutateAsync,
    isPostItemInfoLoading: isLoading,
  };
};

export interface CreateItemDto {
  name: string;
  price: number;
  mall_url?: string;
  description: string;
  marketInfoId: number;
}
export interface QueryFailResponse {
  createItem: {
    status: "error";
    message: string;
  };
}
export interface QuerySuccessResponse {
  createItem: {
    status: "ok";
    result: {
      id: number;
    };
  };
}
