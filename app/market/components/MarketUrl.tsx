"use client";
import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import { useIsMarketAdmin } from "../[id]/items/hooks/useIsMarketAdmin";
import Button from "@/components/Button";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useRouter } from "next/navigation";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

interface MarketUrLProps {
  instaUrl?: string;
  kakaoUrl?: string;
  naverBlogUrl?: string;
  mallUrl?: string;
}

const MarketUrl = ({
  instaUrl,
  kakaoUrl,
  naverBlogUrl,
  mallUrl,
}: MarketUrLProps) => {
  const isMarketAdmin = useIsMarketAdmin();
  const router = useRouter();
  const onEntireLoading = useOnEntireLoading();
  if (
    [instaUrl, kakaoUrl, naverBlogUrl, mallUrl].every((url) => !url) &&
    isMarketAdmin
  ) {
    return (
      <div className="flex gap-5 justify-center px-4 items-center">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-sm text-monoGray3">
            URL을 등록해서 온라인 명함을 완성해 보세요
          </p>
          <p className="text-xs text-monoGray3">
            (내 마켓 정보 수정으로 이동합니다)
          </p>
        </div>
        <Button
          variant={"primary"}
          size={"x-small"}
          onClick={() => {
            onEntireLoading();
            router.push("market/info/edit");
          }}
        >
          등록하기
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col px-4">
      <p className="text-monoGray6 text-xs">프로필 링크</p>
      <div className="flex  gap-10 justify-center ">
        {instaUrl ? (
          <a target="_blank" href={instaUrl} rel="noreferrer">
            <div className="flex flex-col items-center gap-2">
              <Icon type={"instaUrl"} />
              <p className="text-[10px] text-monoGray6">instagram</p>
            </div>
          </a>
        ) : (
          <></>
        )}
        {kakaoUrl ? (
          <a href={kakaoUrl} target="_blank" rel="noreferrer">
            <div className="flex flex-col items-center gap-2">
              <Icon type={"kakaoUrl"} />
              <p className="text-[10px] text-monoGray6">오픈카톡</p>
            </div>
          </a>
        ) : (
          <></>
        )}
        {naverBlogUrl ? (
          <a href={naverBlogUrl} target="_blank" rel="noreferrer">
            <div className="flex flex-col items-center gap-2">
              <Icon type={"naverUrl"} />
              <p className="text-[10px] text-monoGray6">스마트 스토어</p>
            </div>
          </a>
        ) : (
          <></>
        )}
        {mallUrl ? (
          <a href={mallUrl} target="_blank" rel="noreferrer">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full border border-purpleLavendar w-[46px] h-[46px] flex justify-center items-center bg-purpleLoyal">
                <Icon type={"marketUrl"} />
              </div>
              <p className="text-[10px] text-monoGray6">온라인 쇼핑몰</p>
            </div>
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MarketUrl;
