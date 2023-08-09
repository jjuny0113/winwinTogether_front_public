"use client";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Carmera from "../Icon/svg/camera.svg";
import Person from "../Icon/svg/person.svg";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { TbTrashX } from "react-icons/tb";
import { useBasicStore } from "@/app/market/info/hooks/zustand/useBasicStore";

interface IMarketImageUpload {
  register: UseFormRegisterReturn;
  image: string;
}

const MarketImageUpload = ({ register, image }: IMarketImageUpload) => {
  if (image)
    return (
      <div className="flex flex-col gap-3 border border-purpleMain p-4 w-[342px] rounded-2xl items-center">
        <div className="w-full">
          <p className="leading-[14px] text-[14px] text-monoGray3">
            프로필 이미지
          </p>
        </div>
        <div className="p-6 relative">
          <Image
            src={image}
            alt="image"
            width={120}
            height={120}
            className="rounded-full w-[120px] h-[120px] "
          />
          <div
            className=" flex justify-center items-center absolute -right-4 -top-2 cancel"
            onClick={() => {
              useBasicStore.getState().setBasicStoreState("profileImg", "");
            }}
          >
            <TbTrashX color="#252525" size={20}/>
          </div>
          <label
            htmlFor="picture"
            className="absolute -right-3 bottom-0 cursor-pointer"
          >
            <Icon type="whitePencil" />

            <input
              {...register}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col gap-3 border border-monoGray3 p-4 w-[342px] rounded-2xl items-center">
      <div className="w-full">
        <p className="leading-[14px] text-[14px] text-monoGray3">
          프로필 이미지
        </p>
      </div>
      <div className="p-6">
        <label
          htmlFor="picture"
          className="flex justify-center items-center w-[120px] h-[120px]  bg-[#f5f5f8] rounded-full relative"
        >
          <Person />
          <input
            {...register}
            id="picture"
            type="file"
            className="hidden"
            accept="image/*"
          />
          <div className="bg-purpleMain w-[36px] h-[36px] rounded-full flex justify-center items-center absolute right-0 bottom-0">
            <Carmera />
          </div>
        </label>
      </div>
    </div>
  );
};

export default MarketImageUpload;
