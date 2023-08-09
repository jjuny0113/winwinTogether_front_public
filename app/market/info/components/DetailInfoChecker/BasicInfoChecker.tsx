import Input from "@/components/Input/Input";
import React from "react";
import {
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormWatch,
} from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";

interface BasicInfoCheckerProps {
  register: UseFormRegister<IDetailInfoCheckerInputs>;
  watch: UseFormWatch<IDetailInfoCheckerInputs>;
}
const BasicInfoChecker = ({ register, watch }: BasicInfoCheckerProps) => {
  return (
    <>
      <Input
        disable
        placeholder="마켓명"
        register={register("name")}
        watchValue={watch("name")}
      />
      <Input
        disable
        placeholder="업종"
        register={register("sector")}
        watchValue={watch("sector")}
      />
      <Input disable placeholder="마켓 주소" register={register("address")} />
      <Input
        disable
        placeholder="상세 주소 입력"
        register={register("addressDetail")}
        watchValue={watch("addressDetail")}
      />
    </>
  );
};

export default BasicInfoChecker;
