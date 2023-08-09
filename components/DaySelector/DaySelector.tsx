"use client";
import React, { useMemo, useState } from "react";
import moment from "moment";
import { useDaySelectorHandler } from "./useDaySelectorHandler";

export interface IDaySelector {
  onClick: (timestamp: number) => void;
  baseDate: number;
  userRegistationDate: number;
}
const DaySelector = ({
  onClick,
  baseDate,
  userRegistationDate,
}: IDaySelector) => {
  const { dateTimeArr, getType, getButtonColor } = useDaySelectorHandler({
    baseDate,
    userRegistationDate,
  });
  return (
    <form className="flex gap-[17px] justify-center">
      {dateTimeArr.map((timestamp) => (
        <div
          key={timestamp}
          className={`${getButtonColor(
            timestamp
          )} w-9 h-9 rounded-full flex justify-center items-center cursor-pointer`}
          onClick={() => {
            if (getType(timestamp) === "disable") return;

            onClick(timestamp);
          }}
        >
          {moment(timestamp).local().format("D")}
        </div>
      ))}
    </form>
  );
};

export default DaySelector;
