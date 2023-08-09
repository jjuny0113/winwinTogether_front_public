import { Nullable } from "@/app/@types/Nullable";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { gql } from "graphql-request";

export const getMarketInfo = async (
  marketId: number
): Promise<QuerySuccessResponse["marketInfo"]["result"]> => {
  const query = gql`
    query marketInfo($marketId: Int!) {
      marketInfo(marketId: $marketId) {
        status
        result {
          id
          profile_img
          market_name
          sector
          address
          address_detail
          coordinate_longitude
          coordinate_latitude
          kakao_open_profile_url
          instagram_url
          naver_blog_url
          shoppingmall_url
          main_selling_product
          main_selling_product_detail
          bank
          accountHolder
          account
          phone_number
          adj_market_express
          adj_product_express
          main_target
          marketIntroduction
          user_id
          market_imgs {
            id
            url
          }
          mostFrequentTags {
            count
            name
          }
          operating_time {
            isOperate
            day
            time {
              open
              close
            }
          }
        }
      }
    }
  `;
  const variables = {
    marketId,
  };
  const result: QuerySuccessResponse | QueryFailResponse =
    await getGraphQLClient.request(query, variables);
  if (result.marketInfo.status === "error") {
    console.error(result.marketInfo.message);
    throw new Error(result.marketInfo.message);
  }

  return result.marketInfo.result;
};

export interface QueryFailResponse {
  marketInfo: {
    status: "error";
    message: string;
  };
}

export interface QuerySuccessResponse {
  marketInfo: {
    status: "ok";
    result: {
      id: number;
      profile_img?: string;
      market_name: string;
      sector: string;
      address: string;
      address_detail?: string;
      coordinate_longitude: string;
      coordinate_latitude: string;
      kakao_open_profile_url?: string;
      instagram_url?: string;
      naver_blog_url?: string; // 스마트스토어
      shoppingmall_url?: string; // 쇼핑몰 url
      main_selling_product: string;
      main_selling_product_detail: string;
      operating_time: OperationTimeType[];
      bank?: string;
      account?: string;
      accountHolder?: string;
      phone_number?: string;
      adj_market_express: string[];
      adj_product_express: string[];
      main_target: string;
      marketIntroduction?: string;
      user_id: number;
      mostFrequentTags: {
        count: number;
        name: string;
      }[];
      market_imgs: {
        id: number;
        url: string;
      }[];
    };
  };
}

interface OperationTimeObjType {
  open?: Nullable<string>;
  close?: Nullable<string>;
}

export interface OperationTimeType {
  day: string;
  isOperate: boolean;
  time: OperationTimeObjType;
}
