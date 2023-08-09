"use client";
import React, { useEffect } from "react";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import { useForm } from "react-hook-form";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";

import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditIntroduceProps {
  marketIntroduction: string;
}
const EditIntroduce = ({ marketIntroduction }: EditIntroduceProps) => {
  const { register, watch, handleSubmit, setValue } =
    useForm<Pick<IDetailInfoCheckerInputs, "marketIntroduction">>();
  const { isLoading, mutateAsync } =
    useUpdateMarketInfo<"marketIntroduction">();

  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "marketIntroduction">
  ) => {
    if (isLoading) {
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      marketIntroduction: value.marketIntroduction,
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("marketIntroduction", marketIntroduction);
  }, []);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        placeholder="마켓소개"
        register={register("marketIntroduction")}
        watchValue={watch("marketIntroduction")}
      />
    </MarketEditWrapper>
  );
};

export default EditIntroduce;
