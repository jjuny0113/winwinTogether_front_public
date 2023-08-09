import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

export const useFetchLogin = () => {
  const fetchLogin = async ({
    userPhoneNum,
    authNumber,
  }: {
    userPhoneNum: string;
    authNumber: string;
  }): Promise<SuccessResponse | failResponse> => {
    const query = gql`
      mutation signIn($authNumberDto: AuthNumberDto!) {
        signIn(authNumberDto: $authNumberDto) {
          status
          result {
            accessToken
            privacy_consent
            survey_sms_consent
          }
          message
        }
      }
    `;

    const variable = {
      authNumberDto: {
        userPhoneNum,
        authNumber,
      },
    };
    const result: SuccessResponse | failResponse =
      await getGraphQLClient.request(query, variable);

    return result;
  };

  const { mutateAsync, isLoading } = useMutation(fetchLogin);

  return {
    mutateAsync,
    isLoading,
  };
};

interface SuccessResponse {
  signIn: {
    message: string;
    status: "ok";
    result: {
      accessToken: string;
      privacy_consent: boolean;
      survey_sms_consent: boolean;
    };
  };
}

interface failResponse {
  signIn: {
    message: string;
    status: "error";
  };
}
