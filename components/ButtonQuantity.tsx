"use client";
import React, { HTMLAttributes, forwardRef, useState } from "react";
import classnames from "classnames";

export interface IButtonQuantity extends React.ComponentPropsWithoutRef<"div"> {
  variant: "primary" | "plain";
  className?: React.ComponentProps<"button">["className"];
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ButtonQuantity = forwardRef(
  (
    { variant, className, quantity, setQuantity, ...props }: IButtonQuantity,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const handleIncrement = () => {
      if (quantity < 999) setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
      if (quantity > 1) setQuantity(quantity - 1);
    };

    const getVariantStyle = (variant: IButtonQuantity["variant"]) => {
      const primaryTw = "bg-purpleMain text-[#FFFFFF]";

      const plainTw = "bg-white text-purpleMain";

      const mapper = new Map<IButtonQuantity["variant"], string>([
        ["primary", primaryTw],

        ["plain", plainTw],
      ]);
      return mapper.get(variant);
    };
    const baseTw =
      "w-[106px] h-[36px] rounded-[90px] font-pretendard font-[900] hover:bg-purpleMedium hover:text-[#FFFFFF] shadow-buttonShadow leading-[22px] flex flex-row justify-center items-center px-[14.4px] py-[16.2px] gap-[9px]";

    return (
      <div
        ref={ref}
        className={classnames(
          `${getVariantStyle(variant)} ${baseTw}`,
          className
        )}
        {...props}
      >
        <div
          className={classnames(
            `w-[87px] h-[22px] flex flex-row items-center gap-[1px] not-italic`,
            className
          )}
        >
          <button className="w-[22px] h-[22px]" onClick={handleDecrement}>
            -
          </button>
          <span className="w-[45px] h-[19px] flex items-center text-center justify-center">
            {quantity ?? 1}
          </span>
          <button className="w-[22px] h-[22px]" onClick={handleIncrement}>
            +
          </button>
        </div>
      </div>
    );
  }
);

ButtonQuantity.displayName = "ButtonQuantity";

export default ButtonQuantity;
