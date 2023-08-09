"use client";
import React, { useEffect } from "react";
import { useMarketInfoStore } from "../hook/zustand/useMarketInfoStore";
import { shallow } from "zustand/shallow";
import MarketImgUpload from "./components/MarketImgUpload";

import ModalSwitcher from "../../info/components/ModalSwitcher";
import PageWrapper from "@/components/PageWrapper";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import AlertModal from "@/components/AlertModal/AlertModal";

const EditMarketInfoComponent = () => {
  const { type, isEditLoading, setState } = useMarketInfoStore(
    (state) => ({
      type: state.type,
      isEditLoading: state.isEditLoading,
      setState: state.setState,
    }),
    shallow
  );

  useEffect(() => {
    setState("isEditLoading", false);
  }, []);

  if (isEditLoading) {
    return (
      <PageWrapper>
        <div className="flex flex-col gap-4 items-center justify-center h-full ">
          <LongTimeLoader />
        </div>
      </PageWrapper>
    );
  }

  const showComponent = (() => {
    switch (type) {
      case "marketImg":
        return <MarketImgUpload />;

      default:
        return <></>;
    }
  })();
  return (
    <PageWrapper>
      {showComponent}
      <ModalSwitcher />
      <AlertModal />
    </PageWrapper>
  );
};

export default EditMarketInfoComponent;
