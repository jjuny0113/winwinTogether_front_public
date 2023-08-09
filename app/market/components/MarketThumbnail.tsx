"use client";
import Icon from "@/components/Icon/Icon";
import Image from "next/image";
import Link from "next/link";
import MarketInfoProfile from "../[id]/items/components/MarketInfoProfile";
import MarketUrl from "./MarketUrl";
import { useIsMarketAdmin } from "../[id]/items/hooks/useIsMarketAdmin";

export interface MarketThumbnailProps {
  marketName: string;
  profileImgUrl?: string;
  marketIntroduce?: string;
  isMarketAdmin: boolean;
}

const MarketThumbnail = ({
  marketName,
  marketIntroduce,
  profileImgUrl,
  isMarketAdmin,
}: MarketThumbnailProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <MarketInfoProfile
        profileImgUrl={profileImgUrl}
        marketName={marketName}
        marketIntroduce={marketIntroduce}
        isMarketAdmin={isMarketAdmin}
      />
    </div>
  );
};

export default MarketThumbnail;

