import { type } from "os";
import { OperationTimeType } from "../../../hooks/query/getMarketInfo";
import { gql } from "graphql-request";
import {
  getGraphQLClient,
} from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";

export type MarketInfoUpdateType = keyof {
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
  naver_blog_url?: string;
  shoppingmall_url?: string;
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
};

export const useUpdateMarketInfo = <T extends MarketInfoUpdateType>() => {
  const updateMarketInfo = async (
    updateData: Partial<
      Record<
        MarketInfoUpdateType,
        T extends "operating_time"
          ? OperationTimeType[]
          : T extends "adj_market_express" | "adj_product_express"
          ? string[]
          : string
      >
    >
  ) => {
    const query = gql`
      mutation updateMarketInfo($updateMarketInfoDto: UpdateMarketInfoDto!) {
        updateMarketInfo(updateMarketInfoDto: $updateMarketInfoDto) {
          status
          message
        }
      }
    `;
    const variables = {
      updateMarketInfoDto: updateData,
    };

    const result: SuccessResponse | failResponse =
      await getGraphQLClient.request(query, variables);
    if (result.updateMarketInfo.status === "error") {
      throw new Error(result.updateMarketInfo.message);
    }
    return result.updateMarketInfo.message;
  };
  const { mutateAsync, isLoading } = useMutation(updateMarketInfo);

  return {
    mutateAsync,
    isLoading,
  };
};

interface SuccessResponse {
  updateMarketInfo: {
    status: "ok";
    message: string;
  };
}

interface failResponse {
  updateMarketInfo: {
    status: "error";
    message: string;
  };
}
