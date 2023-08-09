import React from "react";
import MarketProfileImg from "../MarketProfileImg";
import Description from "../Description";
import Button from "@/components/Button";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import BasicInfoChecker from "./BasicInfoChecker";
import InstagramInfoChecker from "./InstagramInfoChecker";
import MarketInfoChecker from "./MarketInfoChecker";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface DetailInfoCheckerProps {
  register: UseFormRegister<IDetailInfoCheckerInputs>;
  handleSubmitButtonClick: () => Promise<void>;
  isButtonLoading: boolean;
  marketExpress: string[];
  productExpress: string[];
  watch: UseFormWatch<IDetailInfoCheckerInputs>;
}

const DetailInfoChecker = ({
  register,
  handleSubmitButtonClick,
  isButtonLoading,
  marketExpress,
  productExpress,
  watch,
}: DetailInfoCheckerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[60px] pt-[95px] ">
      <div className="flex flex-col items-center gap-6 ">
        <MarketProfileImg />

        <Description
          mainTitle="아래 정보를 확인해주세요!"
          subTitle="정보를 토대로 위너분의 마켓 정보 및 온라인 명함이 설정됩니다."
        />
      </div>
      <div className="flex flex-col gap-[12px]">
        <BasicInfoChecker register={register} watch={watch} />
        <InstagramInfoChecker
          register={register}
          marketExpress={marketExpress}
          productExpress={productExpress}
          watch={watch}
        />
        <MarketInfoChecker register={register} />
      </div>
      <Button
        variant="primary"
        size="large"
        onClick={handleSubmitButtonClick}
        isLoading={isButtonLoading}
      >
        완료
      </Button>
    </div>
  );
};

export default DetailInfoChecker;
