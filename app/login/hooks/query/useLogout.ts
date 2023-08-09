import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

export const useLogout = () => {
  const logout = async () => {
    const query = gql`
      mutation {
        logout {
          status
          message
        }
      }
    `;
    const result: SuccessResponse = await getGraphQLClient.request(query);
    return result;
  };
  const { mutateAsync, isLoading } = useMutation(logout);

  return {
    mutateAsync,
    isLoading,
  };
};
interface SuccessResponse {
  logout: {
    status: "ok";
    message: "error";
  };
}
