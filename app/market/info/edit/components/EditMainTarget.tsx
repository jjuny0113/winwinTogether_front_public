"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import { InstagramInputsForm } from "../../hooks/handler/useInstagramInputsHandler";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditMainTargetProps {
  mainTarget: string;
}
const EditMainTarget = ({ mainTarget }: EditMainTargetProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Pick<InstagramInputsForm, "mainTarget">>();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"main_target">();
  const invalidateQueries = useInvalidateQueries();
  const { mainTargetState, setState } = useEditInfoStore((state) => ({
    mainTargetState: state.mainTarget,
    setState: state.setState,
  }));
  const onSubmit = async (value: Pick<InstagramInputsForm, "mainTarget">) => {
    if (!value.mainTarget) {
      setError("mainTarget", {
        message: "마켓 주요 고객층은 필수 입력입니다.",
      });
      return;
    }
    if (isLoading) {
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      main_target: value.mainTarget,
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  useEffect(() => {
    setState("mainTarget", mainTarget);
    setValue("mainTarget", mainTargetState);
  }, []);

  useEffect(() => {
    setValue("mainTarget", mainTargetState);
  }, [mainTargetState, setValue]);

  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        placeholder="마켓 주요 고객층"
        register={register("mainTarget")}
        watchValue={watch("mainTarget")}
        errorMessage={errors.mainTarget?.message}
        mode={mainTarget ? "input" : "dropdown"}
        onClick={() => {
          setState("modalType", "mainTargetSetter");
        }}
      />
    </MarketEditWrapper>
  );
};

export default EditMainTarget;
