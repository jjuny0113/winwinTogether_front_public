"use client";
import { useMemo } from "react";
import { IInput } from "./Input";

export const useGetInputStyle = (
  isFocus: boolean,
  value: string,
  isError: boolean,
  mode: IInput["mode"] = "input",
  isActive: boolean
) => {
  const getWrapperStyle = () => {
    const curserTw = mode === "dropdown" ? "cursor-pointer" : "";
    const dropdownModeTw =
      mode === "dropdown"
        ? "items-center justify-between"
        : "flex-col justify-center";
    const baseTw = `flex ${dropdownModeTw} gap-[6px] border-[1px] rounded-2xl z-10 px-4 relative ${curserTw}`;
    const focusBorderTw = "border-purpleMain ";
    const focusBgTw = "bg-purpleLight";
    const errorBorderTw = "border-errorPink";

    const normalBorderTw = "border-monoGray3";
    const normalBgTw = "bg-white";
    const emptyBgTw = "bg-white";

    if (isFocus) {
      return isError
        ? ` ${baseTw} ${focusBgTw} ${errorBorderTw} `
        : `${baseTw}${focusBgTw} ${focusBorderTw}   `;
    }

    if (!isFocus && isError) {
      return `${baseTw} ${errorBorderTw} ${normalBgTw} `;
    }
    if (value) {
      return `${baseTw} ${normalBgTw} ${focusBorderTw} `;
    }
    if (mode === "dropdown" && isActive) {
      return `${baseTw} ${normalBgTw} ${focusBorderTw} `;
    }
    return ` ${baseTw} ${emptyBgTw} ${normalBorderTw} `;
  };

  const getPlaceholderStyle = () => {
    const baseTw = "leading-[14px]";
    const focusOutTw = "text-[14px] transition-all";
    const focusInTw = "text-[12px] transition-all";
    const focusTextColorTw = "text-purpleMain";
    const baseTextColorTw = "text-monoGray3";
    const errorTextTw = "text-errorPink";
    if (mode === "dropdown" && isActive) {
      return `${baseTw} ${focusOutTw} ${baseTextColorTw}`;
    }
    if (isError) {
      return isFocus
        ? `${baseTw} ${focusInTw} ${errorTextTw}`
        : `${baseTw} ${focusOutTw} ${errorTextTw} pt-[6px]`;
    }
    if (value) {
      return isFocus
        ? `${baseTw} ${focusInTw} ${focusTextColorTw}`
        : `${baseTw} ${focusInTw} ${baseTextColorTw}`;
    }
    return isFocus
      ? `${baseTw} ${focusInTw} ${focusTextColorTw}`
      : `${
          mode === "dropdown" ? "pt-[2px]" : "pt-[6px]"
        }  ${baseTw} ${focusOutTw} ${baseTextColorTw}`;
  };

  const getInputStyle = () => {
    const baseTw = "text-black text-[16px] leading-[19px] outline-none";
    const focusOutTw = "w-[0px] h-[0px] transition-all";
    const focusInTw = "h-[19px] transition-all";
    const focusBgTw = " bg-purpleLight";
    const normalBgTw = "bg-white";
    const errorTextColorTw = "text-errorPink";

    if (value) {
      if (isFocus) {
        return `${baseTw} ${focusInTw} ${focusBgTw}`;
      }
      if (isError) {
        return `${baseTw} ${focusInTw} ${errorTextColorTw} ${normalBgTw}`;
      }

      return `${baseTw} ${focusInTw} ${normalBgTw}`;
    }

    return isFocus
      ? `${baseTw} ${focusInTw} ${focusBgTw}`
      : `${baseTw} ${focusOutTw} ${normalBgTw}`;
  };
  return {
    getWrapperStyle,
    getPlaceholderStyle,
    getInputStyle,
  };
};
