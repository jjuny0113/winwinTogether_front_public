"use client";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import React from "react";
import { useAuthNumberInputHandler } from "../../hooks/handler/useAuthNumberInputHandler";
import { CookiesProvider } from "react-cookie";

const AuthNumberInput = () => {
  const { submit, register, isLoading, errors, watch } =
    useAuthNumberInputHandler();
  return (
    <form className="flex flex-col gap-[18px]">
      <Input
        register={register("authNumber")}
        placeholder="인증번호 입력"
        inputType="number"
        errorMessage={errors.authNumber?.message}
        watchValue={watch("authNumber")}
      />
      <Button
        variant="primary"
        size="large"
        isLoading={isLoading}
        onClick={submit}
      >
        로그인하기
      </Button>
      <CookiesProvider />
    </form>
  );
};

export default AuthNumberInput;
