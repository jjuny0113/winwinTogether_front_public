import classNames from "classnames";
import React, { forwardRef } from "react";

interface ILoader extends React.ComponentPropsWithoutRef<"div"> {
  variant: "softLight" | "primary" | "med" | "dark" | "white";
  size?: "small" | "medium";
  className?: React.ComponentProps<"button">["className"];
}

const Loader = forwardRef(
  (
    { variant, className, size = "medium", ...props }: ILoader,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const getVariantStyle = (variant: ILoader["variant"]) => {
      const softLightTw = "text-purpleLight"
      const primaryTw = "text-purpleMain";
      const medTw = "text-purpleMedium";
      const darkTw = "text-bluePrimaryDarker";
      const whiteTw = "text-white";
      const mapper = new Map<ILoader["variant"], string>([
        ["softLight", softLightTw],
        ["primary", primaryTw],
        ["med", medTw],
        ["dark", darkTw],
        ["white", whiteTw],
      ]);

      return mapper.get(variant);
    };

    const getSize = () => {
      const medium =
        "w-[17.31px] h-[17.31px]  text-[11px] mx-[54.67px] my-[55.58px] load";
      const small = "w-[4px] h-[4px] text-[11px] animate-smallLoad pt-20px";
      const mapper = new Map<ILoader["size"], string>([
        ["small", small],
        ["medium", medium],
      ]);

      return mapper.get(size);
    };

    return (
      <div
        className={classNames(
          `relative ${getSize()} ${getVariantStyle(
            variant
          )} transform  rounded-[50%] font-[10px] indent-[-9999px]`,
          className
        )}
        {...props}
      >
        Loading...
      </div>
    );
  }
);

Loader.displayName = "Loader";

export default Loader;
