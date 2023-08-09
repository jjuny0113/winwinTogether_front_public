"use client";
import { ForwardRefSubComponent } from "@/app/@types/Component";
import React, { forwardRef, useEffect, useState } from "react";
import Modal from "react-modal";

interface ICustomModal {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose(
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ): void;

  onAfterOpenCallback?: Modal.OnAfterOpenCallback;
  contentLabel?: string;
  className?: React.ComponentProps<"div">["className"];
  status?: "" | "error" | "warn";
}
const getTextColor = (status: ICustomModal["status"]) => {
  const mapper = new Map<ICustomModal["status"], string>([
    ["error", "text-errorPink"],
    ["warn", "text-warnOrange"],
  ]);
  return mapper.get(status) ?? "text-purpleMain";
};

export const Title = ({
  children,
  status = "",
}: {
  children: React.ReactNode;
  status?: ICustomModal["status"];
}) => {
  return (
    <p
      className={`${getTextColor(
        status
      )} text-3xl font-pretendard font-extrabold`}
    >
      {children}
    </p>
  );
};

export const Content = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-center">{children}</p>;
};

export const Description = ({
  children,
  status = "",
}: {
  children: React.ReactNode;
  status?: ICustomModal["status"];
}) => {
  return (
    <p
      className={`${getTextColor(
        status
      )} text-center text-[12px] leading-[14px]`}
    >
      {children}
    </p>
  );
};

interface ISubComponent {
  Title: typeof Title;
  Content: typeof Content;
  Description: typeof Description;
}

const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "#000",
    borderRadius: "24px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: "40px 54px",
    maxWidth: "376px",
  },
  overlay: {
    zIndex: 11,
  },
};

const CustomModal = forwardRef(
  (
    {
      onAfterOpenCallback,
      onRequestClose,
      isOpen,
      children,
      contentLabel,
      status,
    }: ICustomModal,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const handleAfterOpen = () => {
      if (!onAfterOpenCallback) return;
      onAfterOpenCallback();
    };

    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={handleAfterOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel={contentLabel}
        ariaHideApp={false}
      >
        <div
          className={`flex gap-4 flex-col justify-center z-40 items-center ${status}`}
          ref={ref}
        >
          {children}
        </div>
      </Modal>
    );
  }
) as ForwardRefSubComponent<ICustomModal, ISubComponent>;
CustomModal.displayName = "CustomModal";
CustomModal.Title = Title;
CustomModal.Content = Content;
CustomModal.Description = Description;

export default CustomModal;
