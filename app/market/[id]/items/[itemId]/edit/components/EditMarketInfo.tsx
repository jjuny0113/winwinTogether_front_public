"use client";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import React, { useEffect } from "react";
import { ResgistorInputsForms } from "../../../hooks/handler/useItemRegisterHandler";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useGetItem } from "../../../hooks/query/useGetItem";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import Description from "@/app/market/info/components/Description";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { URL_REGEX } from "@/app/constants";
import { insertHttp } from "@/util/insertHttp";
import { useUpdateItemInfo } from "../hook/query/useUpdateItemInfo";
import { useQueryClient } from "@tanstack/react-query";

const EditMarketItemInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ResgistorInputsForms>();
  const { data, isLoading } = useGetItem();
  const router = useRouter();
  const param = useParams() as {
    id: string;
    itemId: string;
  };
  useEffect(() => {
    if (!data) {
      return;
    }
    setValue("name", data?.name ?? "");
    setValue("mallUrl", data.mall_url);
    setValue("name", data.name);
    setValue("description", data.description);
    setValue("price", data.price.toString());
  }, [data]);
  const { isupdateItemInfoLoading, mutateUpdateItemInfoLoadingAsync } =
    useUpdateItemInfo();
  const queryClient = useQueryClient();
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full ">
        <LongTimeLoader />
      </div>
    );
  }

  const onSubmit = async ({
    name,
    price,
    mallUrl,
    description,
  }: ResgistorInputsForms) => {
    const isValidateUrl = !(URL_REGEX.test(mallUrl) || mallUrl === "");
    if (!name) {
      setError("name", {
        message: "상품명은 필수 입력입니다.",
      });
    }
    if (!price) {
      setError("price", {
        message: "가격은 필수 입력입니다.",
      });
    } else if (!Number(price)) {
      setError("price", {
        message: "가격은 숫자만 입력해주세요",
      });
    }
    if (isValidateUrl) {
      setError("mallUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
    }
    if (!description) {
      setError("description", {
        message: "제품 설명 및 상품 구성은 필수 입력입니다",
      });
    }
    if (
      [!name, !price, !Number(price), isValidateUrl, !description].some(
        (v) => v
      )
    ) {
      return;
    }
    if (isupdateItemInfoLoading || !data) return;
    await mutateUpdateItemInfoLoadingAsync({
      id: data.id,
      mall_url: insertHttp(mallUrl),
      name,
      price: Number(price),
      ...(description ? { description } : {}),
    });
    await queryClient.invalidateQueries(["getitem"]);
    router.push(`/market/${param.id}/items/${param.itemId}`);
  };

  return (
    <form className="flex flex-col items-center justify-center gap-10">
      <Header
        title={`${data?.name ?? ""} 정보 수정`}
        backFunc={() => {
          router.push(`/market/${param.id}/items/${param.itemId}`);
        }}
      />
      <div className="flex flex-col items-center justify-center gap-[60px] pt-9 ">
        <Description
          mainTitle="아래 아이템 정보를 확인해주세요!"
          subTitle="정보를 토대로 위너분의 아이템 정보 및 온라인 명함이 설정됩니다."
        />
        <div className="flex flex-col gap-4">
          <Input
            register={register("name")}
            placeholder="상품명"
            errorMessage={errors.name?.message}
            watchValue={watch("name")}
          />
          <Input
            register={register("price")}
            placeholder="가격"
            errorMessage={errors.price?.message}
            watchValue={watch("price")}
          />
          <Input
            register={register("mallUrl")}
            placeholder="외부 판매 링크(선택)"
            errorMessage={errors.mallUrl?.message}
            watchValue={watch("mallUrl")}
          />

          <Textarea
            register={register("description")}
            placeholder="제품 설명 및 제품 구성"
            errorMessage={errors.description?.message}
          />
        </div>
        <div className="sticky bottom-0">
          <Button
            size="large"
            variant="primary"
            isLoading={isupdateItemInfoLoading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
          >
            수정
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditMarketItemInfo;
