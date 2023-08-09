"use client";
import React, { useEffect } from "react";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import { useForm } from "react-hook-form";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import { InstagramInputsForm } from "../../hooks/handler/useInstagramInputsHandler";
import ExpressExample from "../../components/ExpressExample";

interface EditAdjMarketProps {
  adjMarket: string[];
}
const EditAdjMarket = ({ adjMarket }: EditAdjMarketProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<InstagramInputsForm, "adjMarketExpress">>();
  const onSubmit = async (
    value: Pick<InstagramInputsForm, "adjMarketExpress">
  ) => {
    if (!value.adjMarketExpress) {
      setError("adjMarketExpress", {
        message: "마켓 주요 분위기, 특화/차별점은 필수 입력입니다.",
      });
      return;
    }
  };

  return (
    <MarketEditWrapper handleSumbit={handleSubmit(onSubmit)}>
      <Input
        placeholder="마켓 주요 분위기, 특화/차별점"
        register={register("adjMarketExpress")}
        watchValue={watch("adjMarketExpress")}
        errorMessage={errors.adjMarketExpress?.message}
        mode={"dropdown"}
        isActive={adjMarket.length > 0}
        onClick={() => {}}
      />
      <ExpressExample expressArr={adjMarket} isEdit />
    </MarketEditWrapper>
  );
};

export default EditAdjMarket;
