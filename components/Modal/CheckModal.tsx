"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import CircleCheck from "../Icon/svg/circleCheck.svg";
import "./styles.css";

interface ICheckModal {
  title: string;
  content: React.ReactNode;
  buttonChildren?: React.ReactNode;
  description?: React.ReactNode;
  status?: "" | "error" | "warn";
}
const CheckModal = ({
  title,
  content,
  description,
  status = "",
  buttonChildren = <></>,
}: ICheckModal) => {
  return (
    <CustomModal isOpen={true} onRequestClose={() => {}} status={status}>
      <CircleCheck />
      <CustomModal.Title status={status}>{title}</CustomModal.Title>
      <CustomModal.Content>{content}</CustomModal.Content>
      {description ? (
        <CustomModal.Description status={status}>{description}</CustomModal.Description>
      ) : (
        <></>
      )}
      {buttonChildren}
    </CustomModal>
  );
};

export default CheckModal;
