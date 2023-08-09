import { shallow } from "zustand/shallow";
import { useInfoStore } from "../../../hooks/zustand/useInfoStore";
import { useInstagramInputsStore } from "../../../hooks/zustand/useInstagramInputsStore";
import { useUpdateMarketInfo } from "../query/useUpdateMarketInfo";
import { useEditInfoStore } from "../zustand/useEditInfoStore";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

export const useAdjCheckButtonClickHandler = (
  type: "marketExpress" | "productExpress",
  isEdit: boolean = false
) => {
  const { express, setInstaInputsStore } = useInstagramInputsStore((state) => ({
    express: state[type],
    setInstaInputsStore: state.setInstaInputsStore,
  }));
  const { setStage } = useInfoStore(
    (state) => ({
      setStage: state.setStage,
    }),
    shallow
  );

  const { isLoading, mutateAsync } =
    useUpdateMarketInfo<"adj_market_express">();
  const invalidateQueries = useInvalidateQueries();

  const handleCheckButtonClick = async () => {
    setInstaInputsStore(type, express);
    if (isEdit) {
      if (isLoading) {
        return;
      }

      await mutateAsync({
        [type === "marketExpress"
          ? "adj_market_express"
          : "adj_product_express"]: express,
      });
      await invalidateQueries([QUERY_KEYS.MARKET_INFO]);
      useEditInfoStore.getState().setState("editType", "list");
    } else {
      setStage("insta");
    }
  };
  return {
    handleCheckButtonClick,
    isLoading,
  };
};
