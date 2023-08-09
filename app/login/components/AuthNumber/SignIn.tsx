import React from "react";
import { useLogin } from "../../hooks/zustand/useLogin";

const SignIn = () => {
  return (
    <>
      <section className="flex flex-col gap-[63px] justify-center items-center">
        <p className="text-purpleMain text-[28px] leading-[33px] font-extrabold">
          Sign-in!
        </p>
        <p className="text-monoGray6 leading-5 text-center">
          휴대폰으로 전송 된 <br />
          인증번호 여섯자리를 입력해주세요
        </p>
      </section>
    </>
  );
};

export default SignIn;
