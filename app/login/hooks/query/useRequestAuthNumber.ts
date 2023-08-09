import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import {
  ErrorResponse,
  PromiseResult,
  SuccessResponseWithMessage,
} from "@/util/reactQuery/types";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useLogin } from "../zustand/useLogin";

export const useRequestAuthNumber = () => {
  const requestAuthNumber = async (
    phoneNum: string
  ): Promise<{
    authNumber:
      | {
          status: "ok";
          message: string;
        }
      | {
          status: "error";
          message: string;
        };
  }> => {
    const query = gql`mutation {authNumber(smsResponseDto:{userPhoneNum:"${phoneNum}"}){message,status}}`;
    return await getGraphQLClient.request(query);
  };

  const { mutateAsync, isLoading } = useMutation(requestAuthNumber);
  return {
    mutateAsync,
    isLoading,
  };
};
