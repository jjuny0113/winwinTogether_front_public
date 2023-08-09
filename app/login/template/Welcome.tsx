"use client";
import React, { useEffect } from "react";
import WelcomeSwitcher from "../components/Welcome/WelcomeSwitcher";
import LoginSideSlide from "../components/Welcome/WelcomSideSlide";
import WelcomeButton from "../components/Welcome/WelcomeButton";
import ContentModal from "../components/Welcome/ContentModal";
import { useLogin } from "../hooks/zustand/useLogin";
import { useGetUser } from "@/app/common/user/useGetUser";

const Welcome = () => {
  const { setIsLoading, setIsContentModalOpen } = useLogin((state) => ({
    setIsLoading: state.setIsLoading,
    setIsContentModalOpen: state.setIsContentModalOpen,
  }));

  useEffect(() => {
    //welcome은 동의하지 않아야만 오는 곳이라 무조건 모달 뜨게 함
    setIsContentModalOpen(true);
  }, []);

  return (
    <div className="flex flex-col gap-[80px] items-center">
      <WelcomeSwitcher />

      <LoginSideSlide />
      <WelcomeButton />
      <ContentModal />
    </div>
  );
};

export default Welcome;
