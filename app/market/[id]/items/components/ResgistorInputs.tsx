"use client";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import React from "react";
import Textarea from "@/components/Textarea/Textarea";
import ShareUrlExampleComponent from "@/app/market/components/ShareUrlExampleComponent";
import {
  ResgistorInputsForms,
  useItemRegisterHandler,
} from "../hooks/handler/useItemRegisterHandler";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ResgistorInputsProps {
  register: UseFormRegister<ResgistorInputsForms>;
  handleSubmitButtonClick: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  isLoading: boolean;
  mainImg: string;
  itemName: string;
  description: string;
  errors: FieldErrors<ResgistorInputsForms>;
}

const ResgistorInputs = ({
  register,
  handleSubmitButtonClick,
  isLoading,
  mainImg,
  itemName,
  description,
  errors,
}: ResgistorInputsProps) => {
  return (
    <form className="flex flex-col items-center justify-center gap-[60px] pt-[25px] ">
      <div className="flex flex-col gap-4">
        <Input
          register={register("name")}
          placeholder="상품명"
          errorMessage={errors.name?.message}
        />
        <Input
          register={register("price")}
          placeholder="가격"
          errorMessage={errors.price?.message}
        />
        <Input
          register={register("mallUrl")}
          placeholder="외부 판매 링크(선택)"
          errorMessage={errors.mallUrl?.message}
        />

        <Textarea
          register={register("description")}
          placeholder="제품 설명 및 제품 구성"
          errorMessage={errors.description?.message}
        />
      </div>
      <ShareUrlExampleComponent
        message="상품사진을 등록해서 홍보페이지와 url로 전달할 때 정보에 사진을 나오게 해보세요!"
        mainImg={mainImg}
        title={itemName}
        subTitle={description}
      >
        <Button
          size="large"
          variant="primary"
          onClick={handleSubmitButtonClick}
          isLoading={isLoading}
        >
          확인
        </Button>
      </ShareUrlExampleComponent>
    </form>
  );
};

export default ResgistorInputs;
