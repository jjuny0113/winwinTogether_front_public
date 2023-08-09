import Input from "@/components/Input/Input";
import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import ExpressExample from "../ExpressExample";
import Textarea from "@/components/Textarea/Textarea";

interface BasicInfoCheckerProps {
  register: UseFormRegister<IDetailInfoCheckerInputs>;
  watch: UseFormWatch<IDetailInfoCheckerInputs>;
  marketExpress: string[];
  productExpress: string[];
}

const InstagramInfoChecker = ({
  register,
  watch,
  marketExpress,
  productExpress,
}: BasicInfoCheckerProps) => {
  return (
    <>
      <Input
        disable
        placeholder="주력 판매 상품"
        register={register("mainSellingProduct")}
        watchValue={watch("mainSellingProduct")}
      />
      {/* 상품설명 */}
      <Textarea
        placeholder="주력 판매 상품에 대해서 설명해주세요"
        register={register("mainSellingProductDetail")}
        disable
      />
      <p className="text-monoGray3 opacity-80 leading-[14px] text-[12px]">
        마켓 주요 분위기, 특화/차별점
      </p>
      <ExpressExample expressArr={marketExpress} />
      <p className="text-monoGray3 opacity-80 leading-[14px] text-[12px]">
        상품 특화/차별점
      </p>

      <ExpressExample expressArr={productExpress} />
      <Input
        disable
        placeholder="마켓 주요 고객층 (ex. 성별 무관, 20대 ~ 30대)"
        register={register("mainTarget")}
        watchValue={watch("mainTarget")}
        isActive={marketExpress.length > 0}
      />
    </>
  );
};

export default InstagramInfoChecker;
