import React from "react";
import { TimeBottomDropdownProps } from "../../components/bottomDropdown/TimeBottomDropdown";
import TimeBottomDropdownComponent from "@/components/TimeBottomDropdownComponent";
import { useEditTimeBottonDropdownHandler } from "../hooks/handler/useEditTimeBottonDropdownHandler";

interface EditTimeBottomDropdown extends TimeBottomDropdownProps {}

const EditTimeBottomDropdown = (
  editTimeBottomDropdown: EditTimeBottomDropdown
) => {
  const handler = useEditTimeBottonDropdownHandler();
  const props = {
    ...handler,
    ...editTimeBottomDropdown,
  };
  return <TimeBottomDropdownComponent {...props} />;
};

export default EditTimeBottomDropdown;
