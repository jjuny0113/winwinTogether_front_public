"use client";
import React, { HTMLAttributes, forwardRef } from "react";
import classnames from "classnames";
import Loader from "./Loader";

export interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  variant: "primary" | "tinted" | "plain" | "danger";
  size: "small" | "large" | "x-small" | "medium" | "normal";
  disable?: boolean;
  isLoading?: boolean;
  className?: React.ComponentProps<"button">["className"];
}

const Button = forwardRef(
  (
    {
      children,
      variant,
      size,
      className,
      disable = false,
      isLoading = false,
      ...props
    }: IButton,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const getVariantStyle = (variant: IButton["variant"]) => {
      const primaryTw = "bg-purpleMain text-[#FFFFFF]";
      const tintedTw = "bg-purpleLight text-purpleMain";
      const plainTw = "bg-[#FFFFFF] text-purpleMain";
      const dangerTw = "bg-errorPink text-monoGray1";
      const mapper = new Map<IButton["variant"], string>([
        ["primary", primaryTw],
        ["tinted", tintedTw],
        ["plain", plainTw],
        ["danger", dangerTw],
      ]);

      const disableTw =
        size === "medium"
          ? "bg-purplePrimaryDarkerDisable text-monoGray1 text-opacity-60"
          : "bg-purplePrimaryDarkerDisable text-monoGrayDisable";
      return disable ? disableTw : mapper.get(variant);
    };
    const getSizeStyle = (size: IButton["size"]) => {
      if (size === "x-small") {
        return "w-[61px] h-[26px]";
      }

      if (size === "medium") {
        return "py-[6px] px-[8px] min-w-[80px]";
      }
      if (size === "normal") {
        return "py-2 px-3 min-w-[100px]";
      }
      if (size === "small") {
        return "w-[135px] h-[43px] ";
      }
      const widthTw =
        size === "large"
          ? "w-[342px] h-[53px] text-base"
          : "w-[165px] h-[53px] ";
      return widthTw;
    };
    const hoverColorTw = disable
      ? ""
      : "hover:bg-purpleMainHover hover:text-white";
    const fontSize = (() => {
      if (size === "medium") {
        return "leading-[14px] text-[12px]";
      }

      if (size === "normal") {
        return "text-sm";
      }
      return size === "x-small"
        ? "leading-[14px] text-[12px]"
        : "leading-[22px] ";
    })();

    const baseTw =
      "rounded-[90px] font-pretendard shadow-buttonShadow font-normal  flex justify-center items-center outline-none";
    const { onClick, ...restProps } = props;
    return (
      <button
        ref={ref}
        className={classnames(
          `${getVariantStyle(variant)} ${getSizeStyle(
            size
          )} ${baseTw} ${hoverColorTw} ${fontSize}`,
          className
        )}
        onClick={(e) => {
          if (disable || isLoading || !onClick) {
            e.preventDefault();
            return;
          }
          onClick(e);
        }}
        {...restProps}
      >
        {isLoading ? <Loader variant="white" size="small" /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
