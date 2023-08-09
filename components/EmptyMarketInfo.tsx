"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import { useBottomNavStore } from "./BottomNavigator/useBottomNavStore";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

const EmptyMarketInfo = () => {
  const router = useRouter();

  useEffect(() => {
    useBottomNavStore.getState().setState("isBottomButtonLoading", false);
  }, []);
  const onEntireLoading = useOnEntireLoading();
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full ">
      <Image
        src="/512pxLogoImg.png"
        alt="이미 콘텐츠가 있을 때 이미지"
        width={100}
        height={100}
        className="rounded-full"
      />
      <p className="font-normal text-monoGray5 text-sm ">
        마켓을 등록해야 이용할 수 있어요
      </p>
      <Button
        variant="primary"
        size="medium"
        onClick={() => {
          onEntireLoading();
          router.push("/market/info");
        }}
      >
        마켓 등록하러 가기
      </Button>
    </div>
  );
};

export default EmptyMarketInfo;
