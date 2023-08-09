import Input from "@/components/Input/Input";
import React from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { MarketInfoDetailForm } from "../../hooks/handler/useMarketInfoDetailHandler";
import { useInfoStore } from "../../hooks/zustand/useInfoStore";
import OperationTimeList from "../OperationTimeList";
import { useMarketInfoDetailStore } from "../../hooks/zustand/useMarketInfoDetailStore";

interface MarketInfoDetailProps {
  register: UseFormRegister<MarketInfoDetailForm>;
  watch: UseFormWatch<MarketInfoDetailForm>;
  bank: MarketInfoDetailForm["bank"];
  isActiveOperationTimeValue: boolean;
  error: FieldErrors<MarketInfoDetailForm>;
}

const MarketInfoDetail = ({
  register,
  watch,
  bank,
  isActiveOperationTimeValue,
  error,
}: MarketInfoDetailProps) => {
  const { operationTime } = useMarketInfoDetailStore((state) => ({
    operationTime: state.detail.operationTime,
  }));
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="은행"
            register={register("bank")}
            mode={bank === "" ? "dropdown" : "input"}
            onClick={() => {
              useInfoStore.getState().setModalValue("bank");
            }}
            watchValue={watch("bank")}
            errorMessage={error.bank?.message}
          />
          <Input
            placeholder="예금주"
            register={register("accountHolder")}
            errorMessage={error.accountHolder?.message}
          />
          <Input
            placeholder="계좌번호"
            register={register("account")}
            errorMessage={error.account?.message}
          />
        </div>
        <Input
          placeholder="마켓 전화번호(- 제외하고 입력해주세요)"
          register={register("phoneNum")}
          inputType="tel"
          errorMessage={error.phoneNum?.message}
        />

        <Input
          placeholder="마켓 한 줄 소개"
          register={register("marketIntroduction")}
        />
        <Input
          placeholder="마켓 운영 시간"
          register={register("operatingTime")}
          mode={"dropdown"}
          onClick={() => {
            useInfoStore.getState().setModalValue("operate");
          }}
          isActive={isActiveOperationTimeValue}
        />
        {isActiveOperationTimeValue && (
          <OperationTimeList operationTime={operationTime} />
        )}
      </div>
    </div>
  );
};

export default MarketInfoDetail;
