import { useEffect } from "react";
import AdjectiveSelector from "../../components/AdjectiveSelector";
import { ADJECTIVES_PRODUCT } from "../../constants";
import { useAdjectivceSelectorHandler } from "../../hooks/handler/useAdjectivceSelectorHandler";
import { useInstagramInputsStore } from "../../hooks/zustand/useInstagramInputsStore";
import AdjectiveSelectorNav from "./AdjectiveSelectorNav";
import AdjectiveSelectorTemplate from "./AdjectiveSelectorTemplate";
import { ADJECTIVES } from "./constants";

interface ProductAdjectivceSelectorProps {
  isShowHeader?: boolean;
  buttonName?: "확인" | "수정";
  isEdit?: boolean;
}

const ProductAdjectivceSelector = ({
  isShowHeader = true,
  buttonName = "확인",
  isEdit = false,
}: ProductAdjectivceSelectorProps) => {
  const {
    isDisAbleButton,
    express,
    handleSelectorClick,
    handleCheckButtonClick,
    handleHeaderBackFuncButtonClick,
  } = useAdjectivceSelectorHandler("productExpress", isEdit);
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
      mode="product"
      onClick={handleCheckButtonClick}
      onHeaderBackFuncButtonClick={handleHeaderBackFuncButtonClick}
      isShowHeader={isShowHeader}
      buttonName={buttonName}
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

export default ProductAdjectivceSelector;
