"use client";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const EmptyImgUpload = () => {
  const router = useRouter();
  const pathName = usePathname();
  const onEntireLoading = useOnEntireLoading();
  return (
    <div
      className="h-[200px] w-full bg-monoGray3 flex justify-center items-center flex-col"
      onClick={() => {
        onEntireLoading();
        router.push(`${pathName}/img_upload`);
      }}
    >
      <p>등록된 사진이 없어요</p>
      <p>+ 여기를 터치해서 마켓 사진을 등록해보세요</p>
    </div>
  );
};

export default EmptyImgUpload;
