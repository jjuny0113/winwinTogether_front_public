"use client";
import React, { useRef, useState } from "react";
import { useGetNavigatorStyle } from "./useGetNavigatorStyle";
import { useEffect } from "react";

export interface INavigator {
  step?: 1 | 2 | 3 | 4;
}
const Navigator = ({ step = 1 }: INavigator) => {
  const { stepStyle, stageValueStyle, lineStyle } = useGetNavigatorStyle(step);

  const [width, setWidth] = useState(105);
  const sectionRef = useRef<HTMLTableSectionElement>(null);
  useEffect(() => {
    setWidth(
      (sectionRef.current?.getBoundingClientRect().width ?? 1) / 4 > 109
        ? 109
        : (sectionRef.current?.getBoundingClientRect().width ?? 1) / 4
    );
  }, []);

  return (
    <section className="relative" ref={sectionRef}>
      <div className=" grid grid-cols-4 absolute items-center justify-between w-full ">
        {[
          {
            stageNum: 1,
            stageValue: "기본 정보",
          },
          {
            stageNum: 2,
            stageValue: "필수 정보",
          },
          {
            stageNum: 3,
            stageValue: "마켓 정보",
          },
          {
            stageNum: 4,
            stageValue: "완료",
          },
        ].map((v, idx) => (
          <div
            className={`flex flex-col leading-3 text-[10px] text-monoGray4  items-center justify-center gap-1`}
            key={v.stageNum}
          >
            <div
              className={`rounded-full flex justify-center items-center w-[25px] h-6 z-10 ${stepStyle[idx]}`}
            >
              {v.stageNum}
            </div>
            <p className={`leading-3 text-[10px] ${stageValueStyle[idx]}`}>
              {v.stageValue}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 max-w-[420px]  absolute top-3 left-[42px]">
        {[
          {
            key: 1,
          },
          {
            key: 2,
          },
          {
            key: 3,
          },
        ].map((v, idx) => (
          <div
            key={v.key}
            className={`h-[1px] ${lineStyle[idx]}`}
            style={{
              width: `${width}px`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Navigator;
