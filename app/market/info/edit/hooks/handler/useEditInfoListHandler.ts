"use client";
import { useGetMarketInfo } from "../../../hooks/query/useGetMarketInfo";
import { useGetUser } from "@/app/common/user/useGetUser";
import { useForm } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../../hooks/handler/useDetailInfoCheckerHandler";
import { useEffect } from "react";
import { useLogout } from "@/app/login/hooks/query/useLogout";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";
import { useRouter } from "next/navigation";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
import { useAlertModalStore } from "@/components/AlertModal/useAlertModalStore";
import { useQueryClient } from "@tanstack/react-query";

export const useEditInfoListHandler = () => {
  const { register, setValue, watch } = useForm<IDetailInfoCheckerInputs>();
  const user = useGetUser();
  const router = useRouter();
  const { data, isLoading } = useGetMarketInfo(Number(user?.market_id));
  useEffect(() => {
    if (!data) return;
    setValue("name", data.market_name ?? "");
    setValue("sector", data.sector);
    setValue("address", data.address);
    setValue("addressDetail", data.address_detail ?? "-");
    setValue("mainSellingProduct", data.main_selling_product);
    setValue("mainSellingProductDetail", data.main_selling_product_detail);
    setValue("mainTarget", data.main_target);
    setValue("accountHolder", data.accountHolder ?? "-");
    setValue("bank", data.bank ?? "-");

    setValue("account", data.account ?? "-");
    setValue("phoneNum", data.phone_number ?? "-");

    setValue("marketIntroduction", data.marketIntroduction ?? "-");
    setValue("kakaoUrl", data.kakao_open_profile_url ?? "-");
    setValue("instaUrl", data.instagram_url ?? "-");
    setValue("naverBlogUrl", data.naver_blog_url ?? "-");
    setValue("shoppingMallUrl", data.shoppingmall_url ?? "-");
  }, [data]);
  const { isLoading: isLogoutLoading, mutateAsync } = useLogout();
  const setAlertModalData = useAlertModalSetting();
  const onEntireLoading = useOnEntireLoading();
  const queryClient = useQueryClient();
  const handlelogoutButtonClick = () => {
    setAlertModalData({
      status: "warn",
      title: "로그아웃",
      comment: "로그아웃 하시겠습니까?",
      onButtonClick: async () => {
        await mutateAsync();
        onEntireLoading();
        useAlertModalStore.getState().setState("status", "");
        router.refresh();
        queryClient.clear();
        router.push("/login");
      },
      isShowCancelButton: true,
    });
  };
  return {
    profileImg: data?.profile_img,
    register,
    watch,
    marketExpress: data?.adj_market_express ?? [],
    productExpress: data?.adj_product_express ?? [],
    isLoading,
    operationTime: (data?.operating_time ?? []) as {
      day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
      isOperate: boolean;
      time: {
        open: string;
        close: string;
      };
    }[],
    isLogoutLoading,
    handlelogoutButtonClick,
  };
};
