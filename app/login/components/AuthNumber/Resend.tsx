"use client";
import React from "react";
import { useLogin } from "../../hooks/zustand/useLogin";
import { shallow } from "zustand/shallow";
import { useRequestAuthNumber } from "../../hooks/query/useRequestAuthNumber";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";

const Resend = () => {
  const { setModal, userPhoneNum } = useLogin(
    (state) => ({
      setModal: state.setModal,
      userPhoneNum: state.userPhoneNum,
    }),
    shallow
  );

  const { mutateAsync, isLoading } = useRequestAuthNumber();
  if (isLoading) {
    return <LongTimeLoader />;
  }
  return (
    <div className="flex flex-col gap-3 text-[12px] leading-[14px] items-center">
      <p className="text-monoGray3">인증 번호를 받지 못했나요?</p>
      <p
        className="text-purpleMain"
        onClick={async () => {
          const sendedAuthNumber = await mutateAsync(userPhoneNum);
          if (sendedAuthNumber.authNumber.status === "error") {
            if (sendedAuthNumber.authNumber.message.startsWith("id")) {
              for (let i = 0; i <= 5; i++) {
                const data = await mutateAsync(userPhoneNum);

                if (data.authNumber.status === "ok") {
                  setModal("resend");
                  break;
                }
              }
              return;
            }
            useLogin.getState().setModal("phoneNumError");

            return;
          }
          setModal("resend");
        }}
      >
        인증 번호 재전송하기
      </p>
    </div>
  );
};

export default Resend;
