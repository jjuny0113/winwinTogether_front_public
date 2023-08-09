"use client";
import React, { HTMLAttributes, forwardRef } from "react";
import classnames from "classnames";

export interface IButtonController
  extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  className?: React.ComponentProps<"button">["className"];
}

const ButtonController = forwardRef(
  (
    { children, className, ...props }: IButtonController,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const baseTw = "w-[8px] h-[22px]";

    return (
      <button
        ref={ref}
        className={classnames(`${baseTw}`, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonController.displayName = "ButtonController";

export default ButtonController;
