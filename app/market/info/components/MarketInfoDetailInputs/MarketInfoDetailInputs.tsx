import React from "react";
import { useMarketInfoDetailHandler } from "../../hooks/handler/useMarketInfoDetailHandler";
import MarketInfoDetailInputsComponent from "@/components/InfoInputs/MarketInfoDetailInputsComponent";

const MarketInfoDetailInputs = () => {
  const marketInfoDetailHandler = useMarketInfoDetailHandler();
  return <MarketInfoDetailInputsComponent {...marketInfoDetailHandler} />;
};

export default MarketInfoDetailInputs;
