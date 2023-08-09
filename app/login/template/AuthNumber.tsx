"use client";
import React from "react";
import SignIn from "../components/AuthNumber/SignIn";
import AuthNumberInput from "../components/AuthNumber/AuthNumberInput";
import Resend from "../components/AuthNumber/Resend";
import Header from "@/components/Header";
import { useLogin } from "../hooks/zustand/useLogin";
import PageWrapper from "@/components/PageWrapper";

const AuthNumber = () => {
  const { setPage } = useLogin((state) => ({
    setPage: state.setPage,
  }));
  return (
    <PageWrapper
      header={
        <Header
          backFunc={() => {
            setPage("phoneNum");
          }}
        />
      }
      isCenter
    >
      <div className="flex flex-col items-center gap-[53px]">
        <SignIn />
        <AuthNumberInput />
        <Resend />
      </div>
    </PageWrapper>
  );
};

export default AuthNumber;
