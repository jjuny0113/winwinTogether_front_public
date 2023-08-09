"use client";
import React, { useEffect } from "react";
import { UseFormWatch, useForm } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import MarketEditWrapper from "./MarketEditWrapper";
import Address from "@/components/Address/Address";
import { IBasicInputs } from "../../hooks/handler/useBasicInputsHandler";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
import Input from "@/components/Input/Input";

interface EditAddressProps {
  address: string;
  addressDetail: string;
}
const EditAddress = ({ address, addressDetail }: EditAddressProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<IDetailInfoCheckerInputs, "address" | "addressDetail">>();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"address">();
  const { setState, mainAddress } = useEditInfoStore((state) => ({
    setState: state.setState,
    mainAddress: state.mainAddress,
  }));
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "address" | "addressDetail">
  ) => {
    if (!value.address) {
      setError("address", {
        message: "주소입력은 필수 입력입니다.",
      });
      return;
    }
    if (isLoading) {
      return;
    }
    setState("isEditLoading", true);
    await mutateAsync({
      address: value.address,
      address_detail: value.addressDetail,
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    setState("editType", "list");
    setState("isEditLoading", false);
  };
  useEffect(() => {
    setValue("address", address);
    setValue("addressDetail", addressDetail);
  }, []);
  useEffect(() => {
    if (mainAddress) {
      setValue("address", mainAddress);
    }
  }, [mainAddress]);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-4">
        <Input
          register={register("address")}
          placeholder="마켓 주소 검색(도로명 주소로 입력됩니다.)"
          onClick={() => {
            useEditInfoStore.getState().setState("modalType", "addressSetter");
          }}
          errorMessage={errors.address?.message}
          watchValue={watch && watch("address")}
        />
        <Input
          register={register("addressDetail")}
          placeholder="추가 주소 입력"
          watchValue={watch && watch("addressDetail")}
        />
      </div>
    </MarketEditWrapper>
  );
};

export default EditAddress;
