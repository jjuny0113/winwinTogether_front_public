import { shallow } from "zustand/shallow";
import { useLogin } from "../zustand/useLogin";
import { gql } from "graphql-request";

import { useMutation } from "@tanstack/react-query";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";

export const useRequestContent = () => {
  const requestContent = async ({
    privacyConsent,
    surveySmsConsent,
  }: {
    privacyConsent: boolean;
    surveySmsConsent: boolean;
  }) => {
    const query = gql`
      mutation {
        consent(
          consentDto: { privacy_consent: ${privacyConsent}, survey_sms_consent: ${surveySmsConsent} }
        ) {
          message
          status
        }
      }
    `;

    return getGraphQLClient.request(query);
  };

  const { mutateAsync, isLoading } = useMutation(requestContent);

  return {
    mutateAsync,
    isLoading,
  };
};
