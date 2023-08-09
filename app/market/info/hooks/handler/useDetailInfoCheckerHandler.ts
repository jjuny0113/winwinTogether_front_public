import { useForm } from "react-hook-form";
import { useInfoStore } from "../zustand/useInfoStore";
import { shallow } from "zustand/shallow";
import { useCallback, useEffect } from "react";
import { usePostMarketInfo } from "../query/usePostMarketInfo";
import { usePostMarketProfileImg } from "../query/usePostMarketProfileImg";
import { useBasicStore } from "../zustand/useBasicStore";
import { useInstagramInputsStore } from "../zustand/useInstagramInputsStore";
import { useMarketInfoDetailStore } from "../zustand/useMarketInfoDetailStore";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAlertModalStore } from "@/components/AlertModal/useAlertModalStore";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

export interface IDetailInfoCheckerInputs {
  name: string;
  sector: string;
  address: string;
  addressDetail: string;
  mainSellingProduct: string;
  mainSellingProductDetail: string;
  bank: string;

  account: string;
  accountHolder: string;
  phoneNum: string;

  operatingTime: string;
  difference: string;
  mainTarget: string;
  marketIntroduction: string;
  kakaoUrl: string;
  instaUrl: string;
  naverBlogUrl: string;
  shoppingMallUrl: string;
}

export const useDetailInfoCheckerHandler = () => {
  const { setModal } = useInfoStore(
    (state) => ({
      setModal: state.setModal,
    }),
    shallow
  );
  const setAlertModalData = useAlertModalSetting();
  const { address, marketName, profileImgFile, sector, subAddress } =
    useBasicStore(
      (state) => ({
        address: state.address,
        marketName: state.marketName,
        profileImgFile: state.profileImgFile,
        sector: state.sector,
        subAddress: state.subAddress,
      }),
      shallow
    );
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mainSellingProduct,
    mainSellingProductDetail,
    mainTarget,
    marketExpress,
    productExpress,
  } = useInstagramInputsStore(
    (state) => ({
      mainSellingProduct: state.mainSellingProduct,
      mainSellingProductDetail: state.mainSellingProductDetail,
      mainTarget: state.mainTarget,
      marketExpress: state.marketExpress,
      productExpress: state.productExpress,
    }),
    shallow
  );

  const { detail, social } = useMarketInfoDetailStore(
    (state) => ({
      detail: state.detail,
      social: state.social,
    }),
    shallow
  );
  const { register, setValue, watch } = useForm<IDetailInfoCheckerInputs>();

  const { mutateAsync, isLoading } = usePostMarketInfo();
  const {
    mutateAsync: profileImgMutationAsync,
    isLoading: isProfileImgLoading,
  } = usePostMarketProfileImg();

  const handleSubmitButtonClick = useCallback(async () => {
    const result = await mutateAsync();
    if (result.createMarketInfo.status === "error") {
      if (
        result.createMarketInfo.message === "이미 등록된 마켓 정보가 있습니다."
      ) {
        setAlertModalData({
          status: "error",
          comment: result.createMarketInfo.message,
          title: "등록 실패",
          onButtonClick: () => {
            useAlertModalStore.getState().setState("status", "");
          },
        });
        return;
      }
      setAlertModalData({
        status: "error",
        comment: "등록된 마켓 정보가 있습니다.",
        title: "등록 실패",
        onButtonClick: () => {
          useAlertModalStore.getState().setState("status", "");
        },
      });
      return;
    }
    const profileImg = await profileImgMutationAsync();
    if (profileImg?.status === "error") {
      setAlertModalData({
        status: "error",
        comment:
          "프로필 이미지 등록에 실패했습니다. <br>추후 내 마켓 수정 페이지를 이용해서 등록해주세요.",
        title: "등록 실패",
        onButtonClick: async () => {
          useAlertModalStore.getState().setState("status", "");
          await queryClient.invalidateQueries([QUERY_KEYS.USER]);
          await queryClient.invalidateQueries([QUERY_KEYS.TOTAL_INFO]);
          router.push("/dashboard");
        },
      });
      return;
    }
    await queryClient.invalidateQueries([QUERY_KEYS.USER]);
    await queryClient.invalidateQueries([QUERY_KEYS.TOTAL_INFO]);

    router.push("/dashboard");
  }, [
    mutateAsync,
    profileImgMutationAsync,
    queryClient,
    router,
    setAlertModalData,
  ]);

  const isButtonLoading = isLoading || isProfileImgLoading;

  useEffect(() => {
    setValue("name", marketName);
    setValue("sector", sector);
    setValue("address", address);
    setValue("addressDetail", subAddress ?? "-");
    setValue("mainSellingProduct", mainSellingProduct);
    setValue("mainSellingProductDetail", mainSellingProductDetail);
    setValue("mainTarget", mainTarget);
    setValue(
      "accountHolder",
      detail.accountHolder === "" ? "-" : detail.accountHolder
    );
    setValue("bank", detail.bank === "" ? "-" : detail.bank);

    setValue("account", detail.account === "" ? "-" : detail.account);
    setValue("phoneNum", detail.phoneNum === "" ? "-" : detail.phoneNum);

    setValue(
      "marketIntroduction",
      detail.marketIntroduction === "" ? "-" : detail.marketIntroduction
    );
    setValue("kakaoUrl", social.kakaoUrl === "" ? "-" : social.kakaoUrl);
    setValue("instaUrl", social.instaUrl === "" ? "-" : social.instaUrl);
    setValue("naverBlogUrl", social.naverUrl === "" ? "-" : social.naverUrl);
    setValue("shoppingMallUrl", social.mallUrl === "" ? "-" : social.mallUrl);
  }, []);

  return {
    register,
    handleSubmitButtonClick,
    isButtonLoading,
    marketExpress,
    productExpress,
    watch,
  };
};