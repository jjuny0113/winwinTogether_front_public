"use client";
import React from "react";
import { useInfoStore } from "../../hooks/zustand/useInfoStore";
import CheckModal from "@/components/Modal/CheckModal";
import Button from "@/components/Button";

const ModalController = () => {
  const { setModal, modal } = useInfoStore((state) => ({
    modal: state.modal,
    setModal: state.setModal,
  }));
  switch (modal) {
    case "finish":
      return (
        <CheckModal
          title="오픈 완료"
          content={<>내 마켓이 오픈되었어요</>}
          description="마켓 페이지로 이동할게요"
          buttonChildren={
            <>
              <Button
                size="small"
                variant="primary"
                onClick={() => {
                  setModal("");
                }}
              >
                확인
              </Button>
            </>
          }
        />
      );
    default:
      return <></>;
  }
};

export default ModalController;
