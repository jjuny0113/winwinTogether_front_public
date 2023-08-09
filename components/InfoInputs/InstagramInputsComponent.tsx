"use client";
import React from "react";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea/Textarea";
import Description from "@/app/market/info/components/Description";
import Input from "../Input/Input";
import ExpressExample from "@/app/market/info/components/ExpressExample";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { InstagramInputsForm } from "@/app/market/info/hooks/handler/useInstagramInputsHandler";

interface InstagramInputsComponentProps {
  register: UseFormRegister<InstagramInputsForm>;
  submit?: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  watch: UseFormWatch<InstagramInputsForm>;
  setModalValue: (modalValue: "" | "bank" | "target" | "operate") => void;
  errors: FieldErrors<InstagramInputsForm>;
  marketExpress: string[];
  productExpress: string[];
  mainTarget: string;
  handleAdjProductExpressButtonClick: () => void;
  handleAdjMarketExpressButtonClick: () => void;
}

const InstagramInputsComponent = ({
  register,
  submit,
  watch,
  setModalValue,
  errors,
  marketExpress,
  productExpress,
  mainTarget,
  handleAdjProductExpressButtonClick,
  handleAdjMarketExpressButtonClick,
}: InstagramInputsComponentProps) => {
  return (
    <form className="flex flex-col items-center justify-center gap-[60px] pt-[95px] ">
      <div className="flex flex-col items-center gap-6 ">
        <Description
          mainTitle="인스타그램 문구 생성에 필수 정보들입니다."
          subTitle="마켓의 특징을 잘 나타내 주세요!"
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Input
          placeholder="주력 판매 상품"
          register={register("mainSellingProduct")}
          errorMessage={errors.mainSellingProduct?.message}
        />
        <Textarea
          placeholder="주력 판매 상품에 대해서 설명해주세요"
          register={register("mainSellingProductDetail")}
          errorMessage={errors.mainSellingProductDetail?.message}
        />
        <div className="flex flex-col gap-2">
          <Input
            placeholder="마켓 주요 분위기, 특화/차별점"
            register={register("adjMarketExpress")}
            mode={"dropdown"}
            onClick={handleAdjMarketExpressButtonClick}
            watchValue={watch("adjMarketExpress")}
            errorMessage={errors.adjMarketExpress?.message}
            isActive={marketExpress.length > 0}
          />
          <ExpressExample expressArr={marketExpress} />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="상품 특화/차별점"
            register={register("adjProductExpress")}
            mode={"dropdown"}
            onClick={handleAdjProductExpressButtonClick}
            watchValue={watch("adjProductExpress")}
            errorMessage={errors.adjProductExpress?.message}
            isActive={productExpress.length > 0}
          />
          <ExpressExample expressArr={productExpress} />
        </div>
        <Input
          placeholder="마켓 주요 고객층 (ex. 여성, 20대 ~ 30대)"
          register={register("mainTarget")}
          watchValue={watch("mainTarget")}
          mode={mainTarget ? "input" : "dropdown"}
          onClick={() => {
            setModalValue("target");
          }}
          errorMessage={errors.mainTarget?.message}
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

export default InstagramInputsComponent;
