"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
const FinishGenerateComponent = () => {
  const router = useRouter();
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
        오늘은 이미 콘텐츠를 생성했어요
      </p>
      <Button
        variant="primary"
        size="medium"
        onClick={() => {
          onEntireLoading();
          router.push("/contents");
        }}
      >
        콘텐츠 보관함으로 가기
      </Button>
    </div>
  );
};

export default FinishGenerateComponent;
