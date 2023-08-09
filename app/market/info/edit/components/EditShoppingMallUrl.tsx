import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { insertHttp } from "@/util/insertHttp";
import { URL_REGEX } from "@/app/constants";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditShoppingMallUrlProps {
  shoppingMallUrl: string;
}
const EditShoppingMallUrl = ({ shoppingMallUrl }: EditShoppingMallUrlProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<IDetailInfoCheckerInputs, "shoppingMallUrl">>();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"shoppingmall_url">();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "shoppingMallUrl">
  ) => {
    if (isLoading) {
      return;
    }
    const isValidateUrl =
      URL_REGEX.test(value.shoppingMallUrl) || value.shoppingMallUrl === "";
    if (!isValidateUrl) {
      setError("shoppingMallUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      shoppingmall_url: insertHttp(value.shoppingMallUrl),
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("shoppingMallUrl", shoppingMallUrl);
  }, []);
  return (
    <MarketEditWrapper handleSumbit={handleSubmit(onSubmit)}>
      <Input
        placeholder="온라인 자사몰/쇼핑몰 플랫폼 주소"
        register={register("shoppingMallUrl")}
        watchValue={watch("shoppingMallUrl")}
        errorMessage={errors.shoppingMallUrl?.message}
      />
    </MarketEditWrapper>
  );
};

export default EditShoppingMallUrl;
