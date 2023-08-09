"use client";
import React from "react";
import ModalControl from "./components/Modal/ModalControl";
import LoginPageSwitcher from "./template/LoginPageSwitcher";
import PageWrapper from "@/components/PageWrapper";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import Footer from "@/components/Footer";
import { useLogin } from "./hooks/zustand/useLogin";

const LoginComponents = () => {
  useOffEntireLoading();
  const { page } = useLogin((state) => ({
    page: state.page,
  }));
  return (
    <PageWrapper isCenter>
      <LoginPageSwitcher />
      <ModalControl />
      {page === "welcome" ? <></> : <Footer />}
    </PageWrapper>
  );
};

export default LoginComponents;
