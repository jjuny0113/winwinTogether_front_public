import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { gql } from "graphql-request";

export const deleteItem = async (itemId: number) => {
  const query = gql`
    mutation deleteItem($id: Int!) {
      deleteItem(id: $id) {
        status
        message
      }
    }
  `;
  const variable = {
    id: itemId,
  };

  const result: SuccessResponse | failResponse = await getGraphQLClient.request(
    query,
    variable
  );

  return result;
};

interface SuccessResponse {
  signIn: {
    message: string;
    status: "ok";
  };
}

interface failResponse {
  signIn: {
    message: string;
    status: "error";
  };
}
