import React, { forwardRef, useContext } from "react";
import { DropdownContext } from "./Dropdown";

interface IOptionWrapper extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
const OptionWrapper = forwardRef(({ children, ...props }: IOptionWrapper) => {
  const { onClick, ...rest } = props;
  const ctx = useContext(DropdownContext);
  if (!ctx) return <></>;
  const { setShowList } = ctx;
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!onClick) return;
    onClick(event);
    setShowList(false);
  };
  return (
    <div
      className="py-5 px-5 text-black first:rounded-t-2xl last:rounded-b-2xl bg-gradient-to-r hover:from-purpleMain/30"
      {...rest}
      onClick={handleClick}
    >
      {children}
    </div>
  );
});

OptionWrapper.displayName = "OptionWrapper";

export default OptionWrapper;
