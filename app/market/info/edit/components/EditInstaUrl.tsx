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
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";

interface EditInstaUrlProps {
  instaUrl: string;
}
const EditInstaUrl = ({ instaUrl }: EditInstaUrlProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<IDetailInfoCheckerInputs, "instaUrl">>();
  const { isLoading, mutateAsync } =
    useUpdateMarketInfo<"kakao_open_profile_url">();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "instaUrl">
  ) => {
    const isValidateUrl =
      URL_REGEX.test(value.instaUrl) || value.instaUrl === "";
    if (!isValidateUrl) {
      setError("instaUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
      return;
    }

    if (isLoading) {
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      instagram_url: insertHttp(value.instaUrl),
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);

    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("instaUrl", instaUrl);
  }, []);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        placeholder="인스타그램 프로필"
        register={register("instaUrl")}
        watchValue={watch("instaUrl")}
        errorMessage={errors.instaUrl?.message}
      />
    </MarketEditWrapper>
  );
};

export default EditInstaUrl;
