"use client";
import React, { useEffect } from "react";
import { useLogin } from "../hooks/zustand/useLogin";
import LoginPhoneNum from "./LoginPhoneNum";
import AuthNumber from "./AuthNumber";
import Welcome from "./Welcome";
import InitLoading from "@/components/InitLoading";
import { shallow } from "zustand/shallow";

const LoginPageSwitcher = () => {
  const { page, isLoading, reset, isFromConsent } = useLogin(
    (state) => ({
      page: state.page,
      isLoading: state.isLoading,
      reset: state.reset,
      isFromConsent: state.isFromConsent,
    }),
    shallow
  );
  useEffect(() => {
    if (isFromConsent) {
      return;
    }
    reset();
  }, []);

  if (isLoading) {
    return <InitLoading />;
  }

  switch (page) {
    case "phoneNum":
      return <LoginPhoneNum />;
    case "signIn":
      return <AuthNumber />;
    case "welcome":
      return <Welcome />;

    default:
      return <></>;
  }
};

export default LoginPageSwitcher;
