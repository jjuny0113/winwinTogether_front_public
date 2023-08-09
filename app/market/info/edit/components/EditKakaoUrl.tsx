"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { URL_REGEX } from "@/app/constants";
import { insertHttp } from "@/util/insertHttp";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditKakaoUrlProps {
  kakaoUrl: string;
}
const EditKakaoUrl = ({ kakaoUrl }: EditKakaoUrlProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<IDetailInfoCheckerInputs, "kakaoUrl">>();
  const { isLoading, mutateAsync } =
    useUpdateMarketInfo<"kakao_open_profile_url">();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "kakaoUrl">
  ) => {
    const isValidateUrl =
      URL_REGEX.test(value.kakaoUrl) || value.kakaoUrl === "";
    if (isLoading) {
      return;
    }

    if (!isValidateUrl) {
      setError("kakaoUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      kakao_open_profile_url: insertHttp(value.kakaoUrl),
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("kakaoUrl", kakaoUrl);
  }, []);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        placeholder="카카오톡 오픈 프로필"
        register={register("kakaoUrl")}
        watchValue={watch("kakaoUrl")}
        errorMessage={errors.kakaoUrl?.message}
      />
    </MarketEditWrapper>
  );
};

export default EditKakaoUrl;
