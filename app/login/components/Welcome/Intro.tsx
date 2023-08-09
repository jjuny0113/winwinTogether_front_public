"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useLogin } from "../../hooks/zustand/useLogin";

const Intro = () => {
  useEffect(() => {
    useLogin.getState().setIsLoading(false);
  }, []);
  return (
    <div className="flex flex-col gap-[60px] items-center">
      <Image
        src={"/512pxLogoImg.png"}
        alt="mainCharacter"
        width={133}
        height={178}
        className="rounded-full"
      />
      <div className="flex flex-col gap-4 items-center">
        <p className="text-2xl text-monoGray6">
          안녕하세요!
          <br />
          자영업자분들의 <br />
          온라인 어시스턴스 &nbsp;
          <span className="text-purpleMain font-extrabold">윈윈</span>이에요!
          <br />
          <span className="text-purpleMain font-extrabold">위너님</span>의
          어려움을 도와드릴께요
        </p>
      </div>
    </div>
  );
};

export default Intro;
