"use client";
import React, { useEffect } from "react";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import { useForm } from "react-hook-form";
import MarketEditWrapper from "./MarketEditWrapper";
import Input from "@/components/Input/Input";
import {
  EditInfoStoreInitState,
  useEditInfoStore,
} from "../hooks/zustand/useEditInfoStore";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";

import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
interface EditBankInfoProps {
  bank: string;
  accountHolder: string;
  account: string;
}
const EditBankInfo = ({ bank, accountHolder, account }: EditBankInfoProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<
    Pick<IDetailInfoCheckerInputs, "bank" | "account" | "accountHolder">
  >();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"bank">();

  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async (
    value: Pick<IDetailInfoCheckerInputs, "bank" | "account" | "accountHolder">
  ) => {
    const isAllValueEmpty =
      !value.account && !value.accountHolder && !value.bank;
    const isAllValue = value.account && value.accountHolder && value.bank;
    if (!(isAllValue || isAllValueEmpty)) {
      setError("bank", {
        message:
          "은행을 입력하셔야해요!(은행, 예금주, 계좌번호는 같이 입력해야해요.)",
      });
      setError("accountHolder", {
        message:
          "예금주를 입력하셔야해요!(은행, 예금주, 계좌번호는 같이 입력해야해요.)",
      });
      setError("account", {
        message:
          "계좌번호를 입력하셔야해요!(은행, 예금주, 계좌번호는 같이 입력해야해요.)",
      });
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    await mutateAsync({
      bank: value.bank,
      account: value.account,
      accountHolder: value.accountHolder,
    });

    await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
    useEditInfoStore.getState().setState("editType", "list");
    useEditInfoStore.getState().setState("isEditLoading", false);
  };
  const { bankState, setState } = useEditInfoStore((state) => ({
    bankState: state.bank,
    setState: state.setState,
  }));
  useEffect(() => {
    setState("bank", bank as EditInfoStoreInitState["bank"]);
    setValue("bank", bankState);
    setValue("account", account);
    setValue("accountHolder", accountHolder);
  }, []);
  useEffect(() => {
    setValue("bank", bankState);
  }, [bankState, setValue]);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-4">
        <Input
          disable
          placeholder="은행"
          register={register("bank")}
          watchValue={watch("bank")}
          onClick={() => {
            setState("modalType", "bankSetter");
          }}
          errorMessage={errors.bank?.message}
        />
        <Input
          placeholder="예금주"
          register={register("accountHolder")}
          errorMessage={errors.accountHolder?.message}
        />
        <Input
          placeholder="계좌번호"
          register={register("account")}
          errorMessage={errors.account?.message}
        />
      </div>
    </MarketEditWrapper>
  );
};

export default EditBankInfo;
