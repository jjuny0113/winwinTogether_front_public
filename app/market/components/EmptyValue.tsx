import React from "react";
import { Circle } from "./Circle";
import Button from "@/components/Button";

interface EmptyValueProps {
  title: string;
  descArr: string[];
  buttonName: string;
  onButtonClick: () => void;
}

const EmptyValue = ({
  title,
  descArr,
  buttonName,
  onButtonClick,
}: EmptyValueProps) => {
  return (
    <div className="flex flex-col gap-5 px-5">
      <div className="flex flex-col gap-2">
        <p className="text-base text-purpleMain">{title}</p>
        <div className="flex flex-col gap-1">
          {descArr.map((v) => (
            <p
              className="text-sm text-monoGray4 flex gap-2 items-center"
              key={v}
            >
              <Circle color={"monoGray4"} />
              {v}
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button variant="primary" size="medium" onClick={onButtonClick}>
          {buttonName}
        </Button>
      </div>
    </div>
  );
};

export default EmptyValue;
