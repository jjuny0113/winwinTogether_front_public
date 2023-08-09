import React, { useEffect } from "react";
import InstagramInputs from "../components/InstagramInputs";
import Header from "@/components/Header";
import Navigator from "@/components/Navigator/Navigator";
import { useInfoStore } from "../hooks/zustand/useInfoStore";
import ModalSwitcher from "../components/ModalSwitcher";

const InstaInfo = () => {
  const { setStage } = useInfoStore((state) => ({
    setStage: state.setStage,
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col  h-full pb-12 min-h-[100vh]">
      <Header
        title="필수 정보 등록"
        backFunc={() => {
          setStage("basic");
        }}
      />
      <Navigator step={2} />

      <InstagramInputs />
      <ModalSwitcher />
    </div>
  );
};

export default InstaInfo;
