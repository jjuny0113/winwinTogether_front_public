import React from "react";
import { useInfoStore } from "../hooks/zustand/useInfoStore";
import { convert24To12 } from "@/util/convert24To12";
import { useMarketInfoDetailStore } from "../hooks/zustand/useMarketInfoDetailStore";

export interface OperationTimeListProps {
  operationTime: {
    day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
    isOperate: boolean;
    time: {
      open: string;
      close: string;
    };
  }[];
  dayOfWeek?: "월" | "화" | "수" | "목" | "금" | "토" | "일";
}
const OperationTimeList = ({
  operationTime,
  dayOfWeek,
}: OperationTimeListProps) => {
  if (operationTime.length === 0) return <></>;
  return (
    <div className="bg-white w-full rounded-2xl flex flex-col shadow-lg">
      {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
        <div
          key={day}
          className={`flex border-b border-monoGray3 last:border-none py-[15px] px-[48px] ${
            dayOfWeek === day
              ? "bg-purpleMain text-monoGray1"
              : "text-monoGray6"
          } last:rounded-b-2xl first:rounded-t-2xl`}
        >
          <p className="text-[14px] leading-[17px]  flex-[1] font-semibold">
            {day}
          </p>

          {operationTime[index].isOperate ? (
            <div className="flex flex-[2] gap-1 justify-center">
              {operationTime[index].time.open === "" ? (
                <></>
              ) : (
                <p className="text-[14px] leading-[17px] ">
                  {Number(operationTime[index].time.open.substring(0, 2)) > 12
                    ? "오후"
                    : "오전"}
                  &nbsp;
                  {convert24To12(operationTime[index].time.open)}
                </p>
              )}
              <p className="text-[14px] leading-[17px] ">-</p>
              {operationTime[index].time.close === "" ? (
                <></>
              ) : (
                <p className="text-[14px] leading-[17px] ">
                  {Number(operationTime[index].time.close.substring(0, 2)) > 12
                    ? "오후"
                    : "오전"}
                  &nbsp;
                  {convert24To12(operationTime[index].time.close)}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-[2] gap-1 justify-center">
              <p className="text-[14px] leading-[17px] ">휴무</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OperationTimeList;
