import { BiUndo } from "react-icons/bi";
import Button from "@/components/Button";
import Icon from "@/components/Icon/Icon";
import React from "react";

interface ReSelectorButtonProps {
  onClick: () => void;
}

const ReSelectorButton = ({ onClick }: ReSelectorButtonProps) => {
  return (
    <Button
      size="medium"
      variant="primary"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className="flex gap-1">
        <BiUndo />
        다시 선택할께요
      </div>
    </Button>
  );
};

export default ReSelectorButton;
