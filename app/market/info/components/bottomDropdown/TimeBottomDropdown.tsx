import React from "react";
import TimeBottomDropdownComponent from "@/components/TimeBottomDropdownComponent";
import { useTimeBottonDropdownHandler } from "../../hooks/handler/useTimeBottonDropdownHandler";

export interface TimeBottomDropdownProps {
  isBottomModalOpen: boolean;
  setIsBottomModalOpen?: (isOpen?: boolean) => void;
}

const TimeBottomDropdown = (
  timeBottomDropdownProps: TimeBottomDropdownProps
) => {
  const handler = useTimeBottonDropdownHandler();
  const props = {
    ...handler,
    ...timeBottomDropdownProps,
  };
  return <TimeBottomDropdownComponent {...props} />;
};

export default TimeBottomDropdown;
