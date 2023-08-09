"use client";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { DIRECT_INPUT_REGEX } from "../constants";
export interface AdjectiveSelectorProps {
  selectors: string[];
  selectedArr: string[];
  onClick: (selector: string) => void;
}

const Selector = ({
  selector,
  selectedArr,
  onClick,
}: {
  selector: string;
  selectedArr: AdjectiveSelectorProps["selectedArr"];
  onClick: AdjectiveSelectorProps["onClick"];
}) => {
  const getWrapperStyle = (selector: string, selectedArr: string[]) => {
    if (selectedArr.includes(selector)) {
      return "border border-purpleMainHover bg-purpleMainHover";
    }
    return "border border-monoGray2 bg-white";
  };

  const getTextStyle = (selector: string, selectedArr: string[]) => {
    if (selectedArr.includes(selector)) {
      return "text-monoGray1";
    }
    return "text-monoGray4";
  };
  return (
    <div
      className={`px-4 py-2 flex justify-center items-center rounded-full ${getWrapperStyle(
        selector,
        selectedArr
      )} transition-all duration-300 cursor-pointer`}
      key={selector}
      onClick={() => {
        onClick(selector);
      }}
    >
      <span
        className={`text-[12px] leading-[16px] ${getTextStyle(
          selector,
          selectedArr
        )} transition-all duration-300`}
      >
        {selector}
      </span>
    </div>
  );
};

const AdjectiveSelector = ({
  selectors,
  selectedArr,
  onClick,
}: AdjectiveSelectorProps) => {
  return (
    <div className="flex flex-col w-[78%] min-w-[278px] min-h-[266px]">
      <div className="flex gap-6 flex-wrap">
        {selectors.map((selector) => (
          <Selector
            selectedArr={selectedArr}
            selector={selector}
            key={selector}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AdjectiveSelector;
