import { useForm } from "react-hook-form";
import { useInfoStore } from "../zustand/useInfoStore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { DIRECT_INPUT_REGEX } from "../../constants";
import { useInstagramInputsStore } from "../zustand/useInstagramInputsStore";
import { useAdjCheckButtonClickHandler } from "../../edit/hooks/handler/useAdjCheckButtonClickHandler";

interface DirectInput {
  productExpress: string;
  marketExpress: string;
}
export const useAdjectivceSelectorHandler = (
  type: "marketExpress" | "productExpress",
  isEdit: boolean = false
) => {
  const { setStage } = useInfoStore(
    (state) => ({
      setStage: state.setStage,
    }),
    shallow
  );

  const { express, setInstaInputsStore } = useInstagramInputsStore((state) => ({
    express: state[type],
    setInstaInputsStore: state.setInstaInputsStore,
  }));
  const [initValues, setInitValues] = useState<string[]>([]);

  useEffect(() => {
    setInitValues(express);
  }, []);

  const { handleCheckButtonClick, isLoading } = useAdjCheckButtonClickHandler(
    type,
    isEdit
  );

  const handleSelectorClick = (selector: string) => {
    if (express.includes(selector)) {
      setInstaInputsStore(
        type,
        express.filter((v) => v !== selector)
      );
    } else {
      if (express.length >= 5) {
        return;
      }
      setInstaInputsStore(type, express.concat(selector));
    }
  };

  const handleHeaderBackFuncButtonClick = () => {
    setInstaInputsStore(type, initValues);

    setStage("insta");
  };

  const isDisAbleButton = express.length < 1;

  return {
    isDisAbleButton,
    express,
    handleSelectorClick,
    handleCheckButtonClick,
    handleHeaderBackFuncButtonClick,
    isLoading,
  };
};
