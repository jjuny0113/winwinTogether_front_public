import React, { useContext } from "react";
import { forwardRef } from "react";
import { DropdownContext } from "./Dropdown";
import DropdownArrow from "../Icon/svg/dropdownArrow.svg";

interface ISelect extends React.ComponentPropsWithoutRef<"div"> {}

export const Select = forwardRef(
  ({ ...props }: ISelect, ref: React.Ref<HTMLDivElement>) => {
    const ctx = useContext(DropdownContext);
    if (!ctx) return <></>;
    const { showList, setShowList, selectValue, placeholder } = ctx;
    const fontStyle = (() => {
      const unselectTw = "text-monoGray3";
      const selectTw = "text-black";
      return selectValue === "" ? unselectTw : selectTw;
    })();

    const isRotaionIcon = showList ? "" : "rotate-180";
    return (
      <div
        ref={ref}
        className="rounded-2xl flex px-[23px] py-[18px] border-[1px] border-monoGray2 items-center justify-between"
        {...props}
        onClick={() => {
          setShowList(!showList);
        }}
      >
        <p className={`text-[16px] ${fontStyle}`}>
          {selectValue === "" ? placeholder : selectValue}
        </p>
        <DropdownArrow className={isRotaionIcon} />
      </div>
    );
  }
);

Select.displayName = "Select";
