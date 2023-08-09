"use client";
import Icon from "@/components/Icon/Icon";
import React, { useEffect, useState } from "react";
import { Portal } from "react-portal";
import { useMarketInfoStore } from "../hook/zustand/useMarketInfoStore";
import { shallow } from "zustand/shallow";
interface SharePortalProps {
  onShareIconClick: () => void;
}

const SharePortal = ({ onShareIconClick }: SharePortalProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { modalType, setState } = useMarketInfoStore(
    (state) => ({
      modalType: state.modalType,
      setState: state.setState,
    }),
    shallow
  );
  return (
    <>
      {mounted && typeof window !== "undefined" && (
        <Portal node={document?.querySelector(".header-right")}>
          <div
            onClick={onShareIconClick}
          >
            <Icon type="share" />
          </div>
        </Portal>
      )}
    </>
  );
};

export default SharePortal;
