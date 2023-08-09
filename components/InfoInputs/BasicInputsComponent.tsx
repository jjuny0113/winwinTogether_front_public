import React from "react";
import MarketImageUpload from "../ImageUpload/MarketImageUpload";
import Description from "@/app/market/info/components/Description";
import Input from "../Input/Input";
import Address from "../Address/Address";
import Button from "../Button";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { IBasicInputs } from "@/app/market/info/hooks/handler/useBasicInputsHandler";
import { useInfoStore } from "@/app/market/info/hooks/zustand/useInfoStore";

interface BasicInputsComponentProps {
  register: UseFormRegister<IBasicInputs>;
  handleAddressButtonClick: () => void;
  submit?: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  profileImg: string;
  errors: FieldErrors<IBasicInputs>;
  watch: UseFormWatch<IBasicInputs>;
}

const BasicInputsComponent = ({
  register,
  handleAddressButtonClick,
  submit,
  profileImg,
  errors,
  watch,
}: BasicInputsComponentProps) => {
  return (
    <form className="flex flex-col items-center justify-center gap-[60px] pt-[95px]">
      <div className="flex flex-col items-center gap-6 ">
        <Description
          mainTitle="마켓 기본 정보를 입력해주세요."
          subTitle="프로필 사진 등록과 추가 주소는 선택 나머지는 필수 사항입니다."
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <MarketImageUpload register={register("image")} image={profileImg} />
        <Input
          placeholder="마켓명"
          register={register("marketName")}
          errorMessage={errors.marketName?.message}
        />
        <Input
          placeholder="업종"
          register={register("sector")}
          errorMessage={errors.sector?.message}
        />
        <Input
          register={register("address")}
          placeholder="마켓 주소 검색(도로명 주소로 입력됩니다.)"
          onClick={() => {
            handleAddressButtonClick();
          }}
          errorMessage={errors.address?.message}
          watchValue={watch && watch("address")}
        />
        <Input
          register={register("subAddress")}
          placeholder="추가 주소 입력"
          watchValue={watch && watch("subAddress")}
        />
      </div>
      {submit && (
        <Button
          variant="primary"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            if (submit) {
              submit();
            }
          }}
        >
          다음
        </Button>
      )}
    </form>
  );
};

export default BasicInputsComponent;
