"use client";
import React, { forwardRef } from "react";
import Check from "./Icon/svg/checkBox.svg";
import classNames from "classnames";

export interface ICheckBox extends React.ComponentPropsWithoutRef<"div"> {
  isCheck: boolean;
  className?: React.ComponentProps<"div">["className"];
}

const CheckBox = forwardRef(
  (
    { isCheck, className, ...props }: ICheckBox,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const checkTw = "bg-purpleMain";
    const baseTw =
      "w-[28px] h-[28px] rounded-lg border-purpleMain flex justify-center items-center border-[2px]";
    const checkStyle = isCheck ? checkTw : "";
    return (
      <div
        className={classNames(`${baseTw} ${checkStyle}`, className)}
        ref={ref}
        {...props}
      >
        {isCheck ? <Check /> : <></>}
      </div>
    );
  }
);

CheckBox.displayName = "CheckBox";

export default CheckBox;
