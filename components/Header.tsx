"use client";
import React from "react";
import Arrow from "./Icon/svg/arrow.svg";
import { FaPencil } from "react-icons/fa6";

interface IHeader {
  title?: string;
  backFunc?: () => void;
  editFunc?: () => void;
  isEdit?: boolean;
}

const Header = ({ title, backFunc, editFunc, isEdit = false }: IHeader) => {
  return (
    <header className="flex h-[57px] w-full px-5 items-center sticky top-0 mt-5 bg-white z-20">
      <div
        className="w-[60px] flex h-full items-center"
        onClick={() => {
          if (backFunc) {
            backFunc();
          }
        }}
      >
        {backFunc ? (
          <div>
            <Arrow />
          </div>
        ) : null}
      </div>
      <div className="w-[244px] flex justify-center">
        <h1 className=" text-[21px] leading-[21px] font-semibold text-monoGray6">
          {title}
        </h1>
      </div>
      <div
        className="w-[60px] flex justify-end header-right gap-5 items-center"
        onClick={() => {
          if (editFunc) {
            editFunc();
          }
        }}
      >
        {editFunc ? (
          <p className="text-xs text-purpleMain font-semibold">
            {isEdit ? "완료" : <FaPencil size={20} color="#A75AFF"/>}
          </p>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
