"use client";
import React, { useEffect, useState } from "react";
import { useLogin } from "../../hooks/zustand/useLogin";
import CheckModal from "@/components/Modal/CheckModal";
import Button from "@/components/Button";
import { shallow } from "zustand/shallow";

const ModalControl = () => {
  const { modal, setModal, setPage } = useLogin(
    (state) => ({
      modal: state.modal,
      setModal: state.setModal,
      setPage: state.setPage,
    }),
    shallow
  );

  switch (modal) {
    case "resend":
      return (
        <CheckModal
          title="인증 번호 재전송"
          content={
            <>
              휴대폰 인증 번호가 재전송 되었습니다
              <br />
              메세지를 확인해주세요!
            </>
          }
          key="resend"
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

    case "notEqual":
      return (
        <CheckModal
          title="인증 번호 불일치"
          content={
            <>
              휴대폰으로 전송된 인증 번호와
              <br />
              입력하신 정보가 다릅니다
              <br />
              다시 확인주세요!
            </>
          }
          key="notEqual"
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
    case "phoneNumError":
      return (
        <CheckModal
          title="인증 번호 저장 오류"
          content={
            <>
              인증번호 처리에 문제가 생겼어요 ㅜㅜ
              <br />
              다시 시도 부탁드려요!
            </>
          }
          key="notEqual"
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
      null;
  }
  return <></>;
};

export default ModalControl;
