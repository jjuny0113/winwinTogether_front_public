import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

export const useUpdateItemInfo = () => {
  const updateItemInfo = async (updateItemDto: {
    id: number;
    name: string;
    price: number;
    mall_url: string;
    description?: string;
  }) => {
    const query = gql`
      mutation updateItem($updateItemDto: UpdateItemDto!) {
        updateItem(updateItemDto: $updateItemDto) {
          status
          message
        }
      }
    `;
    const variables = {
      updateItemDto,
    };

    const result: SuccessResponse | failResponse =
      await getGraphQLClient.request(query, variables);
    if (result.updateItem.status === "error") {
      throw new Error(result.updateItem.message);
    }
    return result.updateItem;
  };
  const { mutateAsync, isLoading } = useMutation(updateItemInfo);

  return {
    mutateUpdateItemInfoLoadingAsync: mutateAsync,
    isupdateItemInfoLoading: isLoading,
  };
};

interface SuccessResponse {
  updateItem: {
    status: "ok";
    message: string;
  };
}

interface failResponse {
  updateItem: {
    status: "error";
    message: string;
  };
}
