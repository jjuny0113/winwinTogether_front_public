"use client";
import CheckBox from "@/components/CheckBox";
import React from "react";
import { useLogin } from "../hooks/zustand/useLogin";
import { shallow } from "zustand/shallow";

const Consent = () => {
  const {
    personalInfoAgree,
    sendTextAgree,
    setPersonalInfoAgree,
    setSendTextAgree,
  } = useLogin(
    (state) => ({
      personalInfoAgree: state.personalInfoAgree,
      sendTextAgree: state.sendTextAgree,
      setPersonalInfoAgree: state.setPersonalInfoAgree,
      setSendTextAgree: state.setSendTextAgree,
    }),
    shallow
  );
  return (
    <section className="flex flex-col gap-2 mt-12">
      {[
        {
          isCheck: personalInfoAgree,
          onClick: () => {
            setPersonalInfoAgree();
          },
          text: [
            "[필수] 만족도 조사 문자 발송 동의",
            "(8월 10일에 발송 예정입니다.)"
          ],
        },
        {
          isCheck: sendTextAgree,
          onClick: () => {
            setSendTextAgree();
          },
          text: ["[필수] 개인정보 보호 동의"],
        },
      ].map(({ isCheck, onClick, text }) => (
        <div className="flex items-center gap-3" key={text[0]}>
          <CheckBox isCheck={isCheck} onClick={onClick} />
          {text.map((v) => (
            <p key={`2-${v}`} className="text-monoGray3 text-xs">
              {v}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Consent;
