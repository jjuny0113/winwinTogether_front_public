import Description from "@/app/market/info/components/Description";
import MarketSocialUrl from "@/app/market/info/components/MarketInfoDetailInputs/MarketSocialUrl";

import React from "react";
import Button from "../Button";
import MarketInfoDetail from "@/app/market/info/components/MarketInfoDetailInputs/MarketInfoDetail";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { MarketInfoDetailForm } from "@/app/market/info/hooks/handler/useMarketInfoDetailHandler";
import { BankListType } from "@/app/market/info/constants";

interface MarketInfoDetailInputsComponentProps {
  register: UseFormRegister<MarketInfoDetailForm>;
  isActiveOperationTimeValue: boolean;
  watch: UseFormWatch<MarketInfoDetailForm>;
  bank: "" | BankListType;
  submit?: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  errors: FieldErrors<MarketInfoDetailForm>;
}

const MarketInfoDetailInputsComponent = ({
  register,
  isActiveOperationTimeValue,
  watch,
  bank,
  submit,
  errors,
}: MarketInfoDetailInputsComponentProps) => {
  return (
    <form className="flex flex-col items-center justify-center gap-[60px] pt-[95px] ">
      <div className="flex flex-col items-center gap-6 ">
        <Description
          mainTitle="마켓정보를 입력해주세요"
          subTitle="인스타 홍보문구 및 마켓홍보에 도움을 줍니다(선택사항입니다)"
          selectPhrases={`‣ sns 주소를 입력하면 온라인 명함에 링크시스템을 제공해 드려요! <br/> ‣ 검색엔진 최적화된 페이지를 통해 홍보효과를 누려보세요`}
        />
      </div>
      <div className="flex flex-col gap-4">
        <MarketSocialUrl register={register} error={errors} />
        <MarketInfoDetail
          isActiveOperationTimeValue={isActiveOperationTimeValue}
          register={register}
          watch={watch}
          bank={bank}
          error={errors}
        />
      </div>
      {submit && (
        <Button
          variant="primary"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          다음
        </Button>
      )}
    </form>
  );
};

export default MarketInfoDetailInputsComponent;
