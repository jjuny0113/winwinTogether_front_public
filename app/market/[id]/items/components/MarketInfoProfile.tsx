import React from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { useIsMarketAdmin } from "../hooks/useIsMarketAdmin";

interface MarketInfoProfileProps {
  marketName: string;
  profileImgUrl?: string;
  marketIntroduce?: string;
  isMarketAdmin: boolean;
}
const MarketInfoProfile = ({
  profileImgUrl,
  marketName,
  marketIntroduce,
  isMarketAdmin,
}: MarketInfoProfileProps) => {
  return (
    <div className="w-full bottom-0 flex flex-row px-4 py-4 justify-between items-center mt-3">
      <div className="flex flex-row gap-3">
        {profileImgUrl ? (
          <Image
            src={profileImgUrl}
            alt={`${marketName} 프로필 이미지`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-monoGray2 flex justify-center items-center">
            <Icon type="smallprofile" />
          </div>
        )}

        <div className="flex flex-col gap-[3px] justify-center">
          <p className="text-base font-extrabold text-monoGray6 leading-5">
            {marketName}
          </p>
          {marketIntroduce ? (
            <p className="text-xs font-medium text-monoGray6">
              {marketIntroduce}
            </p>
          ) : isMarketAdmin ? (
            <p className="text-xs font-medium text-monoGray6">
              마켓소개를 등록해주세요. (내 정보에서 등록 가능합니다)
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketInfoProfile;
