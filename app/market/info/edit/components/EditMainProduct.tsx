"use client";
import React, { useEffect } from "react";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import { useForm } from "react-hook-form";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditMainProductProps {
  mainSellingProduct: string;
  mainSellingProductDetail: string;
}
const EditMainProduct = ({
  mainSellingProduct,
  mainSellingProductDetail,
}: EditMainProductProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<
    Pick<
      IDetailInfoCheckerInputs,
      "mainSellingProduct" | "mainSellingProductDetail"
    >
  >();
  const { isLoading, mutateAsync } =
    useUpdateMarketInfo<"main_selling_product">();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<
      IDetailInfoCheckerInputs,
      "mainSellingProduct" | "mainSellingProductDetail"
    >
  ) => {
    if (!value.mainSellingProduct) {
      setError("mainSellingProduct", {
        message: "주력 판매 상품은 필수 입력입니다.",
      });
    }
    if (!value.mainSellingProductDetail) {
      setError("mainSellingProductDetail", {
        message: "주력 판매 상품에 대해서 설명은 필수 입력입니다.",
      });
    }

    if (!value.mainSellingProduct || !value.mainSellingProductDetail) {
      return;
    }

    if (isLoading) {
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      main_selling_product: value.mainSellingProduct,
      main_selling_product_detail: value.mainSellingProductDetail,
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("mainSellingProduct", mainSellingProduct);
    setValue("mainSellingProductDetail", mainSellingProductDetail);
  }, []);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-3">
        <Input
          placeholder="주력 판매 상품"
          register={register("mainSellingProduct")}
          watchValue={watch("mainSellingProduct")}
          errorMessage={errors.mainSellingProduct?.message}
        />
        <Textarea
          placeholder="주력 판매 상품에 대해서 설명해주세요"
          register={register("mainSellingProductDetail")}
          errorMessage={errors.mainSellingProductDetail?.message}
        />
      </div>
    </MarketEditWrapper>
  );
};

export default EditMainProduct;
