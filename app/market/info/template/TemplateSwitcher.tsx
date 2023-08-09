"use client";
import React, { useEffect } from "react";
import { useInfoStore } from "../hooks/zustand/useInfoStore";
import BasicInfo from "./BasicInfo";
import ProfileInfoCheck from "./ProfileInfoCheck";
import ProductAdjectivceSelector from "./AdjectivceSelector/ProductAdjectivceSelector";
import MarketAdjectivceSelector from "./AdjectivceSelector/MarketAdjectivceSelector";
import InstaInfo from "./InstaInfo";
import MarketInfoDetail from "./MarketInfoDetail";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";

const TemplateSwitcher = () => {
  const { stage } = useInfoStore((state) => ({
    stage: state.stage,
  }));
  useEffect(() => {
    useBottomNavStore.getState().setState("isBottomButtonLoading", false);
  }, []);

  switch (stage) {
    case "basic":
      return <BasicInfo />;
    case "insta":
      return <InstaInfo />;
    case "detail":
      return <MarketInfoDetail />;
    case "finish":
      return <ProfileInfoCheck />;
    case "product":
      return <ProductAdjectivceSelector />;
    case "market":
      return <MarketAdjectivceSelector />;
    default:
      return <></>;
  }
};

export default TemplateSwitcher;
