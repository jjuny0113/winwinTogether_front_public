"use client";
import React, { useEffect } from "react";
import MarketEditWrapper from "./MarketEditWrapper";
import { useForm } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import { useQueryClient } from "@tanstack/react-query";
import Input from "@/components/Input/Input";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditMarketNameProps {
  marketName: string;
}
const EditMarketName = ({ marketName }: EditMarketNameProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<IDetailInfoCheckerInputs, "name">>();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"market_name">();

  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (value: Pick<IDetailInfoCheckerInputs, "name">) => {
    if (!value.name) {
      setError("name", {
        message: "마켓명은 필수 입력입니다.",
      });
      return;
    }
    if (isLoading) {
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      market_name: value.name,
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO, QUERY_KEYS.USER]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("name", marketName);
  }, []);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        placeholder="마켓명"
        register={register("name")}
        watchValue={watch("name")}
        errorMessage={errors.name?.message}
      />
    </MarketEditWrapper>
  );
};

export default EditMarketName;
