"use client";
import useOutsideAlerter from "@/util/useOutsideAlerter";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useGetTextaresStyle } from "./useGetTextaresStyle";

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  register: UseFormRegisterReturn;
  placeholder: string;
  disable?: boolean;
  width?: string;
  errorMessage?: string;
  className?: React.ComponentProps<"div">["className"];
}

const Textarea = forwardRef(
  (
    {
      register,
      placeholder,
      disable = false,
      width = "342",
      errorMessage,
      className,
      ...props
    }: TextareaProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const divRef: React.LegacyRef<HTMLDivElement> | undefined = useRef(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    useOutsideAlerter(divRef, () => {
      setIsFocus(false);
    });
    const { getPlaceholderStyle, getTextareaStyle, getWrapperTw } =
      useGetTextaresStyle(
        isFocus,
        !!errorMessage,
        inputRef.current?.value ?? "",
        width
      );

    const { ref: registerRef, ...restRegister } = register;
    return (
      <div ref={divRef} className="flex flex-col gap-1">
        <div
          className={`${
            width === "chat" ? "w-[260px]" : "w-[342px]"
          }  ${getWrapperTw()}`}
          onClick={() => {
            setIsFocus(true);
          }}
          ref={ref}
        >
          <p className={`${getPlaceholderStyle()}`}>{placeholder}</p>
          <textarea
            {...restRegister}
            id={"text"}
            className={`resize-none outline-none w-full h-full my-2 ${getTextareaStyle()}`}
            ref={(e) => {
              registerRef(e);
              inputRef.current = e;
            }}
            disabled={disable}
            {...props}
          />
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

Textarea.displayName = "Textarea";

export default Textarea;
