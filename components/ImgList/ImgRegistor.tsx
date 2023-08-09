import React from "react";
import Icon from "../Icon/Icon";
import { UseFormRegisterReturn } from "react-hook-form";

interface ImgRegistorProps {
  register: UseFormRegisterReturn;
  imgUrls: string[];
  maxRegistImg: number;
}

const ImgRegistor = ({ register, imgUrls, maxRegistImg }: ImgRegistorProps) => {
  if (imgUrls.length >= 10) {
    return (
      <div className="flex flex-col w-[110px] h-[110px] min-w-[110px] min-h-[110px] rounded-xl bg-monoGray3 border border-monoGray3 justify-center items-center">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 21H3.5V7H12.5V5H3.5C2.4 5 1.5 5.9 1.5 7V21C1.5 22.1 2.4 23 3.5 23H17.5C18.6 23 19.5 22.1 19.5 21V12H17.5V21ZM9.71 17.83L7.75 15.47L5 19H16L12.46 14.29L9.71 17.83ZM19.5 5V2H17.5V5H14.5C14.51 5.01 14.5 7 14.5 7H17.5V9.99C17.51 10 19.5 9.99 19.5 9.99V7H22.5V5H19.5Z"
            fill="#767676"
          />
        </svg>
        <p className="text-[12px] leading-[14px] text-monoGray4">사진 추가</p>
        <p className="text-[12px] leading-[14px] text-monoGray4">
          ({imgUrls.length}/{maxRegistImg})
        </p>
      </div>
    );
  }
  return (
    <form className="flex flex-col justify-center items-center w-[110px] h-[110px] min-w-[110px] min-h-[110px] rounded-xl bg-white border border-monoGray3">
      <label className=" w-[110px] h-[110px] min-w-[110px] min-h-[110px] flex flex-col justify-center items-center">
        <div>
          <Icon type="addPicture" />
          <p className="text-[12px] leading-[14px] text-monoGray3">사진 추가</p>
          <p className="text-[12px] leading-[14px] text-monoGray3">
            ({imgUrls.length}/{maxRegistImg})
          </p>
        </div>
        <input
          {...register}
          id="picture"
          type="file"
          className="hidden"
          accept="image/*"
          multiple
        />
      </label>
    </form>
  );
};

export default ImgRegistor;
