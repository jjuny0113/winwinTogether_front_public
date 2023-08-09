import React from "react";
import {
  FieldErrors,
  UseFormRegisterReturn,
  UseFormWatch,
} from "react-hook-form";
import Input from "../Input/Input";
import { useAddressHandler } from "./useAddressHandler";
import { IBasicInputs } from "@/app/market/info/hooks/handler/useBasicInputsHandler";

export interface IAddress {
  mainAddressResgister: UseFormRegisterReturn;
  mainAddressSetter: (value: string) => void;
  subAddressResgister: UseFormRegisterReturn;
  errors: FieldErrors<IBasicInputs>;
  watch?: UseFormWatch<Pick<IBasicInputs, "address" | "subAddress">>;
}

const Address = ({
  mainAddressResgister,
  mainAddressSetter,
  subAddressResgister,
  errors,
  watch,
}: IAddress) => {
  const { handleAddress1Click } = useAddressHandler({
    mainAddressSetter,
  });

  return (
    <div className="flex flex-col gap-4">
      <Input
        register={mainAddressResgister}
        placeholder="마켓 주소 검색(도로명 주소로 입력됩니다.)"
        onClick={handleAddress1Click}
        errorMessage={errors.address?.message}
        watchValue={watch && watch("address")}
      />
      <Input
        register={subAddressResgister}
        placeholder="추가 주소 입력"
        watchValue={watch && watch("subAddress")}
      />
    </div>
  );
};

export default Address;
