import { useForm } from "react-hook-form";
import { useInstagramInputsStore } from "../zustand/useInstagramInputsStore";
import { shallow } from "zustand/shallow";
import { useInfoStore } from "../zustand/useInfoStore";
import { useEffect } from "react";

export interface InstagramInputsForm {
  mainSellingProduct: string;
  mainSellingProductDetail: string;
  adjMarketExpress: string;
  adjProductExpress: string;
  mainTarget: string;
}

export const useInstagramInputsHandler = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<InstagramInputsForm>();

  const {
    mainSellingProduct,
    mainSellingProductDetail,
    marketExpress,
    productExpress,
    mainTarget,
    setInstaInputsStore,
  } = useInstagramInputsStore(
    (state) => ({
      mainSellingProduct: state.mainSellingProduct,
      mainSellingProductDetail: state.mainSellingProductDetail,
      marketExpress: state.marketExpress,
      productExpress: state.productExpress,
      mainTarget: state.mainTarget,
      setInstaInputsStore: state.setInstaInputsStore,
    }),
    shallow
  );

  const { setStage, setModalValue } = useInfoStore(
    (state) => ({
      setStage: state.setStage,
      setModalValue: state.setModalValue,
    }),
    shallow
  );
  useEffect(() => {
    setValue("mainSellingProduct", mainSellingProduct);
    setValue("mainSellingProductDetail", mainSellingProductDetail);
    setValue("mainTarget", mainTarget);
  }, []);

  useEffect(() => {
    if (mainTarget !== "") {
      setValue("mainTarget", mainTarget);
    }
  }, [mainTarget, setValue]);

  useEffect(() => {
    if (errors.mainTarget?.message && mainTarget) {
      clearErrors("mainTarget");
    }
  }, [clearErrors, errors.mainTarget?.message, mainTarget]);

  const onSubmit = (value: InstagramInputsForm) => {
    handleErrorMessage(value);
    if (checkEmptyValues(value)) {
      return;
    }
    setValues(value);
  };

  const handleAdjProductExpressButtonClick = () => {
    handleSubmit((value: InstagramInputsForm) => {
      setInstaInputsStore("mainSellingProduct", value.mainSellingProduct);
      setInstaInputsStore(
        "mainSellingProductDetail",
        value.mainSellingProductDetail
      );
    })();
    setStage("product");
  };

  const handleAdjMarketExpressButtonClick = () => {
    handleSubmit((value: InstagramInputsForm) => {
      setInstaInputsStore("mainSellingProduct", value.mainSellingProduct);
      setInstaInputsStore(
        "mainSellingProductDetail",
        value.mainSellingProductDetail
      );
    })();
    setStage("market");
  };
  const handleErrorMessage = (value: InstagramInputsForm) => {
    if (!value.mainSellingProduct) {
      setError("mainSellingProduct", {
        message: "주력 판매 상품은 필수 입력입니다.",
      });
    }
    if (!value.mainSellingProductDetail) {
      setError("mainSellingProductDetail", {
        message: "주력 판매 상품에 대해서 설명은 필수 입력입니다.",
      });
    }
    if (marketExpress.length === 0) {
      setError("adjMarketExpress", {
        message: "마켓 주요 분위기, 특화/차별점은 필수 입력입니다.",
      });
    }
    if (productExpress.length === 0) {
      setError("adjProductExpress", {
        message: "상품 특화/차별점은 필수 입력입니다.",
      });
    }

    if (!value.mainTarget) {
      setError("mainTarget", {
        message: "마켓 주요 고객층은 필수 입력입니다.",
      });
    }
  };

  const checkEmptyValues = (value: InstagramInputsForm) =>
    [
      value.mainSellingProduct,
      value.mainSellingProductDetail,
      value.mainTarget,
    ].some((v) => !v) ||
    marketExpress.length === 0 ||
    productExpress.length === 0;

  const setValues = (value: InstagramInputsForm) => {
    setInstaInputsStore("mainSellingProduct", value.mainSellingProduct);
    setInstaInputsStore(
      "mainSellingProductDetail",
      value.mainSellingProductDetail
    );
    setStage("detail");
  };
  return {
    register,
    submit: handleSubmit(onSubmit),
    watch,
    setModalValue,
    errors,
    marketExpress,
    productExpress,
    mainTarget,
    handleAdjProductExpressButtonClick,
    handleAdjMarketExpressButtonClick,
  };
};
