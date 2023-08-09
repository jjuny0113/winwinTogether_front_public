"use client";
import React from "react";
import { useLogin } from "../../hooks/zustand/useLogin";
import Intro from "./Intro";
import BannerInfo from "./BannerInfo";
import PromotionalText from "./PromotionalText";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import InitLoading from "@/components/InitLoading";

const WelcomeSwitcher = () => {
  const { welcome } = useLogin((state) => ({
    welcome: state.welcome,
  }));
  if (useBottomNavStore.getState().isBottomButtonLoading) {
    return <InitLoading />
    ;
  }
  switch (welcome) {
    case "intro":
      return <Intro />;
    case "banner":
      return <BannerInfo />;
    case "promotional":
      return <PromotionalText />;
    default:
      <></>;
  }
  return <></>;
};

export default WelcomeSwitcher;
