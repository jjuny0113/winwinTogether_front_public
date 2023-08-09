"use client";
import React from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { useRouter } from "next/navigation";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

interface MarketSummaryProps {
  profileImg: string;
  marketName: string;
  sector: string;
}

const MarketSummary = ({
  profileImg,
  marketName,
  sector,
}: MarketSummaryProps) => {
  const router = useRouter();
  const onEntireLoading = useOnEntireLoading();
  return (
    <section className="flex flex-col gap-2 items-center px-4 mt-3 ">
      <div className="flex flex-col items-center gap-5 py-7 px-4 shadow-middleShadow rounded-2xl w-full relative">
        <div className="flex justify-between w-full px-4 items-center">
          <h2 className="text-monoGray6 text-lg font-semibold">내 정보</h2>
          <div
            className="absolute right-5"
            onClick={() => {
              onEntireLoading();
              router.push("market/info/edit");
            }}
          >
            <p className="text-purpleMain text-xs">자세히 보기</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {profileImg ? (
            <Image
              src={profileImg}
              alt="market profile img"
              width={112}
              height={112}
              className="rounded-full w-28 h-28 shadow-2xl"
            />
          ) : (
            <div className="flex justify-center items-center w-28 h-28  bg-[#f5f5f8] rounded-full relative">
              <Icon type="person" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-monoGray6 text-lg font-semibold">
            {marketName} &nbsp;
            <span className="text-monoGray6 text-sm font-normal">
              ({sector})
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketSummary;
