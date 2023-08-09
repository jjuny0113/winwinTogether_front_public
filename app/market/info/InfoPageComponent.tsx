"use client";
import React, { useEffect } from "react";

import TemplateSwitcher from "./template/TemplateSwitcher";
import ModalController from "./components/modal/ModalController";
import { useRouteMain } from "@/util/useRouteMain";
import { useScrollTop } from "@/util/useScrollTop";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import ContentModal from "@/app/login/components/Welcome/ContentModal";
import AlertModal from "@/components/AlertModal/AlertModal";

const InfoPageComponent = () => {
  useScrollTop();
  useOffEntireLoading();
  return (
    <main>
      <TemplateSwitcher />
      <ModalController />
      <AlertModal />
    </main>
  );
};

export default InfoPageComponent;
