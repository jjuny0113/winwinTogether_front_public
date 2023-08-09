"use client";
import React, { useEffect } from "react";
import { useEditInfoStore } from "./hooks/zustand/useEditInfoStore";
import EditList from "./components/EditList";
import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import EditMarketName from "./components/EditMarketName";
import { useGetUser } from "@/app/common/user/useGetUser";
import { useGetMarketInfo } from "../hooks/query/useGetMarketInfo";

import EditSection from "./components/EditSection";
import EditIntroduce from "./components/EditIntroduce";
import EditMarketPhoneNum from "./components/EditMarketPhoneNum";
import EditAddress from "./components/EditAddress";
import EditMainProduct from "./components/EditMainProduct";
import EditMainTarget from "./components/EditMainTarget";
import EditInstaUrl from "./components/EditInstaUrl";
import EditKakaoUrl from "./components/EditKakaoUrl";
import EditNaverUrl from "./components/EditNaverUrl";
import EditShoppingMallUrl from "./components/EditShoppingMallUrl";
import EditBankInfo from "./components/EditBankInfo";
import EditOperationTime from "./components/EditOperationTime";
import MarketAdjectivceSelector from "../template/AdjectivceSelector/MarketAdjectivceSelector";
import ProductAdjectivceSelector from "../template/AdjectivceSelector/ProductAdjectivceSelector";
import EditModalSwitcher from "./components/EditModalSwitcher";
import EditProfileImg from "./components/EditProfileImg";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import InitLoading from "@/components/InitLoading";
import AlertModal from "@/components/AlertModal/AlertModal";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { shallow } from "zustand/shallow";

const MarketInfoEditPageComponent = () => {
  const { editType, setState, isEditLoading } = useEditInfoStore(
    (state) => ({
      editType: state.editType,
      isEditLoading: state.isEditLoading,
      setState: state.setState,
    }),
    shallow
  );
  const router = useRouter();
  const user = useGetUser();

  const { isBottomButtonLoading } = useBottomNavStore((state) => ({
    isBottomButtonLoading: state.isBottomButtonLoading,
  }));
  const invaidateQueries = useInvalidateQueries();
  const { data, isLoading } = useGetMarketInfo(Number(user?.market_id));
  useOffEntireLoading();

  if (isLoading || isBottomButtonLoading) {
    return <InitLoading />;
  }
  const component = (() => {
    const componentMapper = new Map<typeof editType, React.ReactNode>([
      ["list", <EditList key={"list"} />],
      [
        "marketName",
        <EditMarketName
          marketName={data?.market_name ?? ""}
          key="marketName"
        />,
      ],
      ["section", <EditSection sector={data?.sector ?? ""} key="section" />],
      [
        "introduction",
        <EditIntroduce
          marketIntroduction={data?.marketIntroduction ?? ""}
          key={"introduction"}
        />,
      ],
      [
        "phoneNum",
        <EditMarketPhoneNum
          phoneNum={data?.phone_number ?? ""}
          key="phoneNum"
        />,
      ],
      [
        "address",
        <EditAddress
          address={data?.address ?? ""}
          addressDetail={data?.address_detail ?? ""}
          key="address"
        />,
      ],
      [
        "mainProduct",
        <EditMainProduct
          mainSellingProduct={data?.main_selling_product ?? ""}
          mainSellingProductDetail={data?.main_selling_product_detail ?? ""}
          key="mainProduct"
        />,
      ],
      [
        "adjMarket",
        <MarketAdjectivceSelector
          isShowHeader={false}
          buttonName="수정"
          key="adjMarket"
          isEdit
        />,
      ],
      [
        "adjProduct",
        <ProductAdjectivceSelector
          isShowHeader={false}
          buttonName="수정"
          key="adjProduct"
          isEdit
        />,
      ],
      [
        "mainTarget",
        <EditMainTarget
          mainTarget={data?.main_target ?? ""}
          key="mainTarget"
        />,
      ],
      [
        "instaUrl",
        <EditInstaUrl instaUrl={data?.instagram_url ?? ""} key="instaUrl" />,
      ],
      [
        "kakaoUrl",
        <EditKakaoUrl
          kakaoUrl={data?.kakao_open_profile_url ?? ""}
          key="kakaoUrl"
        />,
      ],
      [
        "naverUrl",
        <EditNaverUrl naverUrl={data?.naver_blog_url ?? ""} key="naverUrl" />,
      ],
      [
        "shoppingMallUrl",
        <EditShoppingMallUrl
          shoppingMallUrl={data?.shoppingmall_url ?? ""}
          key="shoppingMallUrl"
        />,
      ],
      [
        "bankInfo",
        <EditBankInfo
          account={data?.account ?? ""}
          accountHolder={data?.accountHolder ?? ""}
          bank={data?.bank ?? ""}
          key="bankInfo"
        />,
      ],
      [
        "operationTime",
        <EditOperationTime
          operationTime={
            (data?.operating_time as {
              day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
              isOperate: boolean;
              time: {
                open: string;
                close: string;
              };
            }[]) ?? []
          }
          key="operationTime"
        />,
      ],

      [
        "adjProductSetter",
        <ProductAdjectivceSelector key="adjProductSetter" />,
      ],
      [
        "profileImg",
        <EditProfileImg
          profileImgUrl={data?.profile_img ?? ""}
          key="profileImg"
        />,
      ],
    ]);
    return componentMapper.get(editType) ?? <></>;
  })();

  return (
    <PageWrapper
      header={
        <Header
          backFunc={
            isEditLoading
              ? undefined
              : async () => {
                  if (editType === "list") {
                    router.push('/dashboard');
                  } else {
                    setState("editType", "list");
                  }
                  await invaidateQueries([QUERY_KEYS.TOTAL_INFO]);
                  router.refresh();
                }
          }
          title="내 마켓 정보"
        />
      }
    >
      {component}
      <EditModalSwitcher />
      <AlertModal />
    </PageWrapper>
  );
};

export default MarketInfoEditPageComponent;
