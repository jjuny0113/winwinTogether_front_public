"use client";
import React, { useEffect } from "react";
import Navigator from "@/components/Navigator/Navigator";
import Header from "@/components/Header";
import { useInfoStore } from "../hooks/zustand/useInfoStore";
import DetailInfoChecker from "../components/DetailInfoChecker/DetailInfoChecker";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useDetailInfoCheckerHandler } from "../hooks/handler/useDetailInfoCheckerHandler";

const ProfileInfoCheck = () => {
  const { setStage } = useInfoStore((state) => ({
    setStage: state.setStage,
  }));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const detailInfoCheckerHandler = useDetailInfoCheckerHandler();
  return (
    <div className="flex flex-col  h-full pb-12 min-h-[100vh]">
      <Header
        title="프로필 정보 확인"
        backFunc={
          detailInfoCheckerHandler.isButtonLoading
            ? undefined
            : () => {
                setStage("detail");
              }
        }
      />
      <Navigator step={4} />

      <DetailInfoChecker {...detailInfoCheckerHandler} />
      <AlertModal />
    </div>
  );
};

export default ProfileInfoCheck;
