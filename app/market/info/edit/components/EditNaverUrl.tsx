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

interface EditNaverUrlProps {
  naverUrl: string;
}
const EditNaverUrl = ({ naverUrl }: EditNaverUrlProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<IDetailInfoCheckerInputs, "naverBlogUrl">>();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"naver_blog_url">();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "naverBlogUrl">
  ) => {
    if (isLoading) {
      return;
    }
    const isValidateUrl =
      URL_REGEX.test(value.naverBlogUrl) || value.naverBlogUrl === "";
    if (!isValidateUrl) {
      setError("naverBlogUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      naver_blog_url: insertHttp(value.naverBlogUrl),
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("naverBlogUrl", naverUrl);
  }, []);
  return (
    <MarketEditWrapper handleSumbit={handleSubmit(onSubmit)}>
      <Input
        placeholder="네이버 스마트스토어"
        register={register("naverBlogUrl")}
        watchValue={watch("naverBlogUrl")}
        errorMessage={errors.naverBlogUrl?.message}
      />
    </MarketEditWrapper>
  );
};

export default EditNaverUrl;
