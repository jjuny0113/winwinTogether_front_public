"use client";
import React, { useEffect } from "react";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import { useForm } from "react-hook-form";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import { InstagramInputsForm } from "../../hooks/handler/useInstagramInputsHandler";
import ExpressExample from "../../components/ExpressExample";

interface EditAdjProductProps {
  adjProduct: string[];
}
const EditAdjProduct = ({ adjProduct }: EditAdjProductProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<InstagramInputsForm, "adjProductExpress">>();
  const onSubmit = async (
    value: Pick<InstagramInputsForm, "adjProductExpress">
  ) => {
    if (!value.adjProductExpress) {
      setError("adjProductExpress", {
        message: "상품 특화/차별점은 필수 입력입니다.",
      });
      return;
    }
  };

  return (
    <MarketEditWrapper handleSumbit={handleSubmit(onSubmit)}>
      <Input
        placeholder="상품 특화/차별점"
        register={register("adjProductExpress")}
        watchValue={watch("adjProductExpress")}
        errorMessage={errors.adjProductExpress?.message}
        mode={"dropdown"}
        isActive={adjProduct.length > 0}
        onClick={() => {}}
      />
      <ExpressExample expressArr={adjProduct} />
    </MarketEditWrapper>
  );
};

export default EditAdjProduct;
