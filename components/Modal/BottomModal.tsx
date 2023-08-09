"use client";
import React, { useEffect, useState } from "react";
import Sheet from "react-modal-sheet";

interface IBottomModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const BottomModal = ({ isOpen, onClose, children }: IBottomModal) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
      <Sheet.Container
        style={{
          backgroundColor: "none",
          boxShadow: "none",
        }}
      >
        <Sheet.Content
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="border-[1px] border-monoGray2 w-[420px] bg-white rounded-t-2xl">
            {children}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default BottomModal;
