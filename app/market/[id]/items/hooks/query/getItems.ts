import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { gql } from "graphql-request";

export const getItems = async (
  marketInfoId: number
): Promise<QuerySuccessResponse["items"]["result"]> => {
  const query = gql`
    query items($marketInfoId: Int!) {
      items(marketInfoId: $marketInfoId) {
        status
        message
        result {
          id
          name
          price
          mall_url
          description
          market_item_imgs {
            id
            url
          }
        }
      }
    }
  `;
  const variables = {
    marketInfoId,
  };
  const result: QuerySuccessResponse | QueryFailResponse =
    await getGraphQLClient.request(query, variables);

  if (result.items.status === "error") {
    throw new Error(result.items.message);
  }
  return result.items.result;
};

export interface QueryFailResponse {
  items: {
    status: "error";
    message: string;
  };
}
export interface QuerySuccessResponse {
  items: {
    status: "ok";
    result: {
      id: number;
      name: string;
      price: number;
      mall_url: string;
      description: string;
      market_item_imgs: {
        id: number;
        url: string;
      }[];
    }[];
  };
}
