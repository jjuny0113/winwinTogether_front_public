import { gql } from "graphql-request";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";
import { useBasicStore } from "../zustand/useBasicStore";
import { shallow } from "zustand/shallow";
import { useInstagramInputsStore } from "../zustand/useInstagramInputsStore";
import { useMarketInfoDetailStore } from "../zustand/useMarketInfoDetailStore";
import { useCallback } from "react";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";

export const usePostMarketInfo = () => {
  const { marketName, sector, address, subAddress } = useBasicStore(
    (state) => ({
      marketName: state.marketName,
      sector: state.sector,
      address: state.address,
      subAddress: state.subAddress,
    }),
    shallow
  );

  const {
    mainSellingProduct,
    mainSellingProductDetail,
    marketExpress,
    productExpress,
    mainTarget,
  } = useInstagramInputsStore(
    (state) => ({
      mainSellingProduct: state.mainSellingProduct,
      mainSellingProductDetail: state.mainSellingProductDetail,
      marketExpress: state.marketExpress,
      productExpress: state.productExpress,
      mainTarget: state.mainTarget,
    }),
    shallow
  );

  const { social, detail } = useMarketInfoDetailStore(
    (state) => ({
      social: state.social,
      detail: state.detail,
    }),
    shallow
  );

  const postMarketInfo = useCallback(async () => {
    const query = gql`
      mutation createMarketInfo($createMarketInfoDto: CreateMarketInfoDto!) {
        createMarketInfo(createMarketInfoDto: $createMarketInfoDto) {
          message
          status
        }
      }
    `;
    const variables: {
      createMarketInfoDto: CreateMarketInfoDto;
    } = {
      createMarketInfoDto: {
        sector,
        market_name: marketName,
        address,
        address_detail: subAddress,
        main_selling_product: mainSellingProduct,
        main_selling_product_detail: mainSellingProductDetail,
        adj_market_express: marketExpress,
        adj_product_express: productExpress,
        main_target: mainTarget,
        kakao_open_profile_url: social.kakaoUrl,
        naver_blog_url: social.naverUrl,
        instagram_url: social.instaUrl,
        shoppingmall_url: social.mallUrl,
        marketIntroduction: detail.marketIntroduction,
        phone_number: detail.phoneNum,
        bank: detail.bank,
        accountHolder: detail.accountHolder,
        account: detail.account,
        operating_time: detail.operationTime,
      },
    };

    const result: SuccessCreateMarketInfo | FailCreateMarketInfo =
      await getGraphQLClient.request(query, variables);

    return result;
  }, [
    address,
    detail.account,
    detail.accountHolder,
    detail.bank,
    detail.marketIntroduction,
    detail.operationTime,
    detail.phoneNum,
    mainSellingProduct,
    mainSellingProductDetail,
    mainTarget,
    marketExpress,
    marketName,
    productExpress,
    sector,
    social.instaUrl,
    social.kakaoUrl,
    social.mallUrl,
    social.naverUrl,
    subAddress,
  ]);

  const { mutateAsync, isLoading } = useMutation(postMarketInfo);

  return {
    mutateAsync,
    isLoading,
  };
};
interface CreateMarketInfoDto {
  market_name: string;
  sector: string;
  address: string;
  address_detail?: string;
  kakao_open_profile_url?: string;
  instagram_url?: string;
  naver_blog_url?: string;
  shoppingmall_url?: string;
  main_selling_product: string;
  main_selling_product_detail: string;
  operating_time: {
    day: string;
    isOperate: boolean;
    time: {
      open: string;
      close: string;
    };
  }[];
  bank?: string;
  account?: string;
  accountHolder?: string;
  phone_number?: string;
  adj_market_express: string[];
  adj_product_express: string[];
  main_target?: string;
  marketIntroduction?: string;
}

interface SuccessCreateMarketInfo {
  createMarketInfo: {
    status: "ok";
    message: string;
  };
}

interface FailCreateMarketInfo {
  createMarketInfo: {
    status: "error";
    message: string | "이미 등록된 마켓 정보가 있습니다.";
  };
}
