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

interface EditSectionProps {
  sector: string;
}

const EditSection = ({ sector }: EditSectionProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<IDetailInfoCheckerInputs, "sector">>();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"sector">();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (value: Pick<IDetailInfoCheckerInputs, "sector">) => {
    if (!value.sector) {
      setError("sector", {
        message: "마켓명은 필수 입력입니다.",
      });
      return;
    }
    if (isLoading) {
      return;
    }

    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      sector: value.sector,
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("sector", sector);
  }, []);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        placeholder="업종"
        register={register("sector")}
        watchValue={watch("sector")}
        errorMessage={errors.sector?.message}
      />
    </MarketEditWrapper>
  );
};

export default EditSection;
