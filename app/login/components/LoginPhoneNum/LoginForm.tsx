"use client";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import React from "react";
import { useLoginFormHandler } from "../../hooks/handler/useLoginFormHandler";

const LoginForm = () => {
  const { isLoading, register, submit, errors } = useLoginFormHandler();

  return (
    <form className="flex flex-col gap-[18px] items-center">
      <Input
        register={register("phoneNum")}
        placeholder="휴대폰 번호 입력"
        inputType="tel"
        errorMessage={errors.phoneNum?.message}
      />

      <Button
        variant="primary"
        size="large"
        isLoading={isLoading}
        onClick={submit}
      >
        인증 번호 받기
      </Button>
    </form>
  );
};

export default LoginForm;
