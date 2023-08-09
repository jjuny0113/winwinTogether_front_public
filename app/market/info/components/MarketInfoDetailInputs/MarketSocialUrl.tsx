import Icon from "@/components/Icon/Icon";
import Input from "@/components/Input/Input";
import React from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { MarketInfoDetailForm } from "../../hooks/handler/useMarketInfoDetailHandler";

interface MarketSocialUrlProps {
  register: UseFormRegister<MarketInfoDetailForm>;
  error: FieldErrors<MarketInfoDetailForm>;
  watch?: UseFormWatch<
    Omit<
      MarketInfoDetailForm,
      "bank" | "account" | "marketIntroduction" | "operatingTime" | "phoneNum"
    >
  >;
}

const MarketSocialUrl = ({ register, error, watch }: MarketSocialUrlProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-5 items-center">
        <Icon type="kakaoUrl" />
        <Input
          placeholder="카카오톡 오픈 프로필 주소"
          register={register("kakaoUrl")}
          width={"276"}
          errorMessage={error.kakaoUrl?.message}
          watchValue={watch && watch("kakaoUrl")}
        />
      </div>
      <div className="flex gap-5 items-center">
        <Icon type="instaUrl" />
        <Input
          placeholder="인스타그램 프로필 주소"
          register={register("instaUrl")}
          width={"276"}
          errorMessage={error.instaUrl?.message}
          watchValue={watch && watch("instaUrl")}
        />
      </div>
      <div className="flex gap-5 items-center">
        <Icon type="naverUrl" />
        <Input
          placeholder="네이버 스토어 주소"
          register={register("naverUrl")}
          width={"276"}
          errorMessage={error.naverUrl?.message}
          watchValue={watch && watch("naverUrl")}
        />
      </div>
      <Input
        placeholder="온라인 자사몰/쇼핑몰 플랫폼 주소"
        register={register("mallUrl")}
        errorMessage={error.mallUrl?.message}
        watchValue={watch && watch("mallUrl")}
      />
    </div>
  );
};

export default MarketSocialUrl;
