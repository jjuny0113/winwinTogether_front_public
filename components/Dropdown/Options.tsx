import React, { useContext } from "react";
import { DropdownContext } from "./Dropdown";

interface IOption extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export const Options = ({ children, ...props }: IOption) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) return <></>;
  const { showList, width } = ctx;
  if (!showList) return <></>;
  return (
    <div
      className={`rounded-2xl border-[1px] border-monoGray2 bg-white flex flex-col absolute top-[70px]`}
      style={{
        width,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
