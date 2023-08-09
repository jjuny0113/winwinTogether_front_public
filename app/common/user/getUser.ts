import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { gql } from "graphql-request";

export const isExistUser = (
  v: QuerySuccessResponse | QueryErrorResponse
): v is QuerySuccessResponse => !!(v as QuerySuccessResponse).user;
export const getUser = async (): Promise<
  QuerySuccessResponse["user"] | null
> => {
  const query = gql`
    query {
      user {
        id
        privacy_consent
        survey_sms_consent
        market_id
        profile_img
        market_name
        create_at
      }
    }
  `;

  const result: QuerySuccessResponse | QueryErrorResponse =
    await getGraphQLClient.request(query);

  if (isExistUser(result)) {
    return result.user;
  } else {
    return null;
  }
};

interface QuerySuccessResponse {
  user: {
    id: number;
    phone_num: string;
    privacy_consent: boolean;
    survey_sms_consent: boolean;
    market_id: number | null;
    profile_img: string | null;
    market_name: string | null;
    create_at: number;
  };
}

export interface QueryErrorResponse {
  errors: [{ message: "Unauthorized" }];
  data: null;
}
