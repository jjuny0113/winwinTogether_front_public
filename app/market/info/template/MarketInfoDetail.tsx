import React, { useEffect } from "react";
import ModalSwitcher from "../components/ModalSwitcher";
import Navigator from "@/components/Navigator/Navigator";
import Header from "@/components/Header";
import { useInfoStore } from "../hooks/zustand/useInfoStore";
import MarketInfoDetailInputs from "../components/MarketInfoDetailInputs/MarketInfoDetailInputs";

const MarketInfoDetail = () => {
  const { setStage } = useInfoStore((state) => ({
    setStage: state.setStage,
  }));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col  h-full pb-12 min-h-[100vh]">
      <Header
        title="마켓 세부내용 등록"
        backFunc={() => {
          setStage("insta");
        }}
      />
      <Navigator step={3} />

      <MarketInfoDetailInputs />
      <ModalSwitcher />
    </div>
  );
};

export default MarketInfoDetail;
