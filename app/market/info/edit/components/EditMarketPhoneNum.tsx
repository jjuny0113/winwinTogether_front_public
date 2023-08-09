"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditMarketPhoneNumProps {
  phoneNum: string;
}
const EditMarketPhoneNum = ({ phoneNum }: EditMarketPhoneNumProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<IDetailInfoCheckerInputs, "phoneNum">>();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"phone_number">();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "phoneNum">
  ) => {
    const isPhoneNum = /010[0-9]{4}[0-9]{4}$/.test(value.phoneNum);

    if (!isPhoneNum) {
      setError("phoneNum", {
        message: "정확한 휴대폰 번호를 입력해주세요",
        type: "validate",
      });
      return;
    }
    if (isLoading) {
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      phone_number: value.phoneNum,
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("phoneNum", phoneNum);
  }, []);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        placeholder="마켓 전화번호"
        register={register("phoneNum")}
        watchValue={watch("phoneNum")}
        errorMessage={errors.phoneNum?.message}
      />
    </MarketEditWrapper>
  );
};

export default EditMarketPhoneNum;
