"use client";
import Header from "@/components/Header";
import MarketImageUpload from "@/components/ImageUpload/MarketImageUpload";
import Navigator from "@/components/Navigator/Navigator";
import React, { useEffect } from "react";

import BasicInputs from "../components/BasicInputs";
import ItemList from "../../[id]/items/ItemList/ItemList";
import { useRouter } from "next/navigation";
import ModalSwitcher from "../components/ModalSwitcher";

const BasicInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const router = useRouter();
  return (
    <div className="flex flex-col  h-full pb-12 min-h-[100vh]">
      <Header title="기본 정보" />

      <Navigator />

      <BasicInputs />

      <ItemList />
      <ModalSwitcher />
    </div>
  );
};

export default BasicInfo;
