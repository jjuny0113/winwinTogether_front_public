import React, { useEffect, useState } from "react";
import AdjectiveSelectorTemplate from "./AdjectiveSelectorTemplate";
import AdjectiveSelector from "../../components/AdjectiveSelector";
import { ADJECTIVES_ATOMSPOERE } from "../../constants";
import { useAdjectivceSelectorHandler } from "../../hooks/handler/useAdjectivceSelectorHandler";
import { ADJECTIVES, ADJECTIVES_Type } from "./constants";
import { useInstagramInputsStore } from "../../hooks/zustand/useInstagramInputsStore";
import AdjectiveSelectorNav from "./AdjectiveSelectorNav";

interface MarketAdjectivceSelectorProps {
  isShowHeader?: boolean;
  buttonName?: "확인" | "수정";
  isEdit?: boolean;
}

const MarketAdjectivceSelector = ({
  isShowHeader = true,
  buttonName = "확인",
  isEdit = false,
}: MarketAdjectivceSelectorProps) => {
  const {
    isDisAbleButton,
    express,
    handleSelectorClick,
    handleCheckButtonClick,
    handleHeaderBackFuncButtonClick,
    isLoading,
  } = useAdjectivceSelectorHandler("marketExpress", isEdit);
  const { navValue } = useInstagramInputsStore((state) => ({
    navValue: state.navValue,
  }));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AdjectiveSelectorTemplate
      express={express}
      disable={isDisAbleButton}
      mode="market"
      onClick={handleCheckButtonClick}
      onHeaderBackFuncButtonClick={handleHeaderBackFuncButtonClick}
      buttonName={buttonName}
      isShowHeader={isShowHeader}
      isLoading={isLoading}
    >
      <AdjectiveSelectorNav />
      <AdjectiveSelector
        selectors={Object.keys(ADJECTIVES[navValue])}
        selectedArr={express}
        onClick={handleSelectorClick}
      />
    </AdjectiveSelectorTemplate>
  );
};

export default MarketAdjectivceSelector;
