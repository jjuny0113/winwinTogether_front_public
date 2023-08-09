import React, { useEffect } from "react";
import OperationTimeList from "../../components/OperationTimeList";
import { useForm } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import Input from "@/components/Input/Input";
import MarketEditWrapper from "./MarketEditWrapper";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditOperationTimeProps {
  operationTime: {
    day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
    isOperate: boolean;
    time: {
      open: string;
      close: string;
    };
  }[];
}

const EditOperationTime = ({ operationTime }: EditOperationTimeProps) => {
  const { register, watch, handleSubmit, setValue } =
    useForm<Pick<IDetailInfoCheckerInputs, "operatingTime">>();
  const { setState, operationTimeState, modalType } = useEditInfoStore(
    (state) => ({
      setState: state.setState,
      operationTimeState: state.operationTime,
      modalType: state.modalType,
    })
  );
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"operating_time">();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "operatingTime">
  ) => {
    await mutateAsync({
      operating_time: operationTimeState,
    });
    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
  };
  const isActiveOperationTimeValue =
    modalType === "" &&
    operationTimeState
      .map((v) => [v.time.open, v.time.close])
      .flat()
      .some((v) => v !== "");

  useEffect(() => {
    useEditInfoStore.getState().setState("operationTime", operationTime);
  }, []);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        placeholder="마켓 운영 시간"
        register={register("operatingTime")}
        mode={"dropdown"}
        onClick={(e) => {
          e.preventDefault();
          useEditInfoStore
            .getState()
            .setState("modalType", "operationTimeSetter");
        }}
        isActive={isActiveOperationTimeValue}
      />
      {isActiveOperationTimeValue && (
        <OperationTimeList operationTime={operationTimeState} />
      )}
    </MarketEditWrapper>
  );
};

export default EditOperationTime;
