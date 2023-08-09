"use client";
import React, { forwardRef, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ErrorIcon from "../Icon/svg/error.svg";
import { useGetInputStyle } from "./useGetInputStyle";
import useOutsideAlerter from "@/util/useOutsideAlerter";
import DownArrow from "../../components/Icon/svg/downArrow.svg";
import Icon from "../Icon/Icon";

export interface IInput extends React.ComponentPropsWithoutRef<"div"> {
  register: UseFormRegisterReturn;

  placeholder: string;
  mode?: "input" | "dropdown";
  errorMessage?: string;
  inputType?: React.HTMLInputTypeAttribute;
  width?: string;
  height?: string;
  watchValue?: string;
  className?: React.ComponentProps<"div">["className"];
  disable?: boolean;
  isActive?: boolean;
}

const Input = forwardRef(
  (
    {
      className,
      register,
      placeholder,
      errorMessage,

      inputType,
      mode = "input",
      width = "342",
      height = " 56",
      disable = false,
      isActive = false,

      watchValue,
      ...props
    }: IInput,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const divRef: React.LegacyRef<HTMLDivElement> | undefined = useRef(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useOutsideAlerter(divRef, () => {
      setIsFocus(false);
    });

    const { getWrapperStyle, getPlaceholderStyle, getInputStyle } =
      useGetInputStyle(
        isFocus,
        watchValue ? watchValue : inputRef.current?.value ?? "",
        !!errorMessage,
        mode,
        isActive
      );

    const { onClick, ...restProps } = props;
    const { ref: registerRef, ...restRegister } = register;

    return (
      <div ref={divRef} className="flex flex-col gap-1">
        <div
          style={{
            width: `${width}px`,
            height:`${height}px`
          }}
          ref={ref}
          className={`${getWrapperStyle()}`}
          onClick={(e) => {
            if (onClick) {
              onClick(e);
            }
            if (mode == "dropdown") return;
            inputRef.current?.focus();
            setIsFocus(true);
          }}
          {...restProps}
        >
          <p className={getPlaceholderStyle()}>{placeholder}</p>
          <input
            {...restRegister}
            className={getInputStyle()}
            disabled={disable}
            ref={(e) => {
              registerRef(e);
              inputRef.current = e;
            }}
            type={inputType}
          />

          {!!errorMessage ? (
            <ErrorIcon className="absolute right-5 top-4" />
          ) : null}
          {!errorMessage && mode === "dropdown" ? (
            <div className="pt-[6px]">
              <DownArrow />
            </div>
          ) : (
            <></>
          )}
        </div>
        {errorMessage ? (
          <p className={"text-errorPink text-[10px]"}>{errorMessage}</p>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
