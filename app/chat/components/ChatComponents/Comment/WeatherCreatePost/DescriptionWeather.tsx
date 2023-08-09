"use client";
import React from "react";
import ChatWrapper from "../../ChatWrapper/ChatWrapper";
import ChatText from "../../ChatText";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import Button from "@/components/Button";
import { useGetTodayWeather } from "@/app/chat/hooks/query/useGetTodayWeather";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import { useWeatherStore } from "@/app/chat/hooks/zustand/useWeatherStore";
import { useScollDown } from "@/app/chat/hooks/useScollDown";
import ReSelectorButton from "../../ReSelectorButton";

const DescriptionWeather = () => {
  const { contentType, setChatStoreState } = useChatStore((state) => ({
    contentType: state.contentType,
    setChatStoreState: state.setState,
  }));
  const { select, setState } = useWeatherStore((state) => ({
    select: state.select,
    setState: state.setState,
  }));
  const { data, isLoading } = useGetTodayWeather();
  useScollDown(contentType === "WEATHER", "descriptionWeather");
  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow={contentType === "WEATHER"}
        className="descriptionWeather"
      >
        <ChatText comment="오늘의 일기예보 기록이에요! 아래 정보로 인스타 콘텐츠를 만들까요?" />
        {isLoading && contentType === "WEATHER" ? (
          <LongTimeLoader />
        ) : (
          <div className="flex flex-col rounded-xl border border-monoGray3 shadow-lg p-2">
            <p className="text-xs text-monoGray6">
              오늘의 날씨는 &nbsp;
              <span className="font-semibold text-sm text-monoGray6">
                {data?.weather} &nbsp;&nbsp;{" "}
              </span>
            </p>
            {data?.rain && (
              <p className="text-xs text-monoGray6">
                강우량{" "}
                <span className="font-semibold text-sm text-monoGray6">
                  {data.rain}
                </span>
              </p>
            )}
            {data?.windSpeed && (
              <p className="text-xs text-monoGray6">
                바람은{" "}
                <span className="font-semibold text-sm text-monoGray6">
                  {" "}
                  {data?.windSpeed}
                </span>
              </p>
            )}
            <p className="text-xs text-monoGray6">
              습도는 &nbsp;
              <span className="font-semibold text-sm text-monoGray6">
                {data?.humidity}%
              </span>
            </p>

            <div className="text-xs text-monoGray6">
              온도는&nbsp;
              <span className="font-semibold text-sm text-monoGray6">
                {data?.temp}°C
              </span>
              <p className="text-xs text-monoGray6">
                최고온도는&nbsp;
                <span className="font-semibold text-sm text-monoGray6">
                  {data?.maxTemp}°C
                </span>
              </p>
              <p className="text-xs text-monoGray6">
                그리고 최저온도는&nbsp;
                <span className="font-semibold text-sm text-monoGray6">
                  {data?.minTemp}°C
                </span>
                &nbsp;이에요
              </p>
            </div>
          </div>
        )}
      </ChatWrapper>
      <ChatWrapper
        avatar={{
          position: "right",
        }}
        isShow={contentType === "WEATHER"}
      >
        <Button
          size="medium"
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            setState("select", "auto");
            setState("isGenerate", true);
          }}
          disable={select === "self"}
        >
          네! 만들어주세요
        </Button>
        <Button
          size="medium"
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            setState("select", "self");
          }}
          disable={select === "auto"}
        >
          아니요! 제가 입력할깨요
        </Button>
        {select === "" && (
          <ReSelectorButton
            onClick={() => {
              setChatStoreState("contentType", "");
            }}
          />
        )}
      </ChatWrapper>
    </>
  );
};

export default DescriptionWeather;
