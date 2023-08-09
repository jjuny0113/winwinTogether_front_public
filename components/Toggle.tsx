import React, { forwardRef } from "react";

interface IToggle {
  isOn: boolean;
  onClick: () => void;
  size?: "default" | "small";
}

// width: 26px;
// height: 14px;

const sizeClassNameMapper: Record<
  "parent" | "children",
  Record<NonNullable<IToggle["size"]>, string>
> = {
  parent: {
    default: "w-[52px] h-[28px]",
    small: "w-[26px] h-[14px]",
  },
  children: {
    default: "w-6 h-6",
    small: "w-3 h-3",
  },
};

const Toggle = forwardRef(
  (
    { isOn, onClick, size = "default" }: IToggle,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={`w-[52px] h-[28px] border-2 bg-white rounded-2xl relative  ${
          isOn ? "border-purpleMain" : ""
        } ${isOn ? "border-purpleMain" : "border-purpleLightActive"} ${
          sizeClassNameMapper.parent[size]
        }`}
        onClick={onClick}
      >
        <div
          className={`rounded-full w-6 h-6 transition-all ${
            isOn ? "bg-purpleMain translate-x-6" : "bg-purpleLightActive"
          }  ${sizeClassNameMapper.children[size]}`}
        ></div>
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
