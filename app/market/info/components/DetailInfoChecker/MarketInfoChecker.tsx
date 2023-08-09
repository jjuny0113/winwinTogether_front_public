import Icon from "@/components/Icon/Icon";
import Input from "@/components/Input/Input";
import React from "react";
import OperationTimeList from "../OperationTimeList";
import { UseFormRegister } from "react-hook-form";
import { IDetailInfoCheckerInputs } from "../../hooks/handler/useDetailInfoCheckerHandler";
import { useMarketInfoDetailStore } from "../../hooks/zustand/useMarketInfoDetailStore";

interface MarketInfoCheckerProps {
  register: UseFormRegister<IDetailInfoCheckerInputs>;
}

const MarketInfoChecker = ({ register }: MarketInfoCheckerProps) => {
  const { operationTime } = useMarketInfoDetailStore((state) => ({
    operationTime: state.detail.operationTime,
  }));
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-5 items-center">
          <Icon type="kakaoUrl" />
          <Input
            disable
            placeholder="카카오톡 오픈 프로필"
            register={register("kakaoUrl")}
            width={"276"}
          />
        </div>
        <div className="flex gap-5 items-center">
          <Icon type="instaUrl" />
          <Input
            disable
            placeholder="인스타그램 프로필"
            register={register("instaUrl")}
            width={"276"}
          />
        </div>
        <div className="flex gap-5 items-center">
          <Icon type="naverUrl" />
          <Input
            disable
            placeholder="네이버 블로그"
            register={register("naverBlogUrl")}
            width={"276"}
          />
        </div>
        <Input
          disable
          placeholder="온라인 자사몰/쇼핑몰 플랫폼 주소"
          register={register("shoppingMallUrl")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Input disable placeholder="은행" register={register("bank")} />
        <Input
          disable
          placeholder="예금주"
          register={register("accountHolder")}
        />
        <Input disable placeholder="계좌번호" register={register("account")} />
      </div>
      <Input
        disable
        placeholder="마켓 운영 시간"
        register={register("operatingTime")}
        mode="dropdown"
        isActive
      />
      <OperationTimeList operationTime={operationTime} />

      <Input
        disable
        placeholder="마켓 전화번호"
        register={register("phoneNum")}
      />

      <Input
        disable
        placeholder="마켓 한 줄 소개(자랑거리)"
        register={register("marketIntroduction")}
      />
    </>
  );
};

export default MarketInfoChecker;
