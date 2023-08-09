import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { gql } from "graphql-request";

export const getItem = async (
  itemId: number
): Promise<QueryItemSuccessResponse["item"]["result"]> => {
  const query = gql`
      query {
        item(id: ${itemId}) {
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
  const result: QueryItemSuccessResponse | QueryFailResponse =
    await getGraphQLClient.request(query);

  if (result.item.status === "error") {
    throw new Error(result.item.message);
  }
  return result.item.result;
};

export interface QueryFailResponse {
  item: {
    status: "error";
    message: string;
  };
}
export interface QueryItemSuccessResponse {
  item: {
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
    };
  };
}
