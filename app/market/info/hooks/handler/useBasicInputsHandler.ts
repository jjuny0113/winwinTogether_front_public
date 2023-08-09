"use client";
import { useForm } from "react-hook-form";
import { useInfoStore } from "../zustand/useInfoStore";
import { BasicStoreInitState, useBasicStore } from "../zustand/useBasicStore";
import { useBasicSetData } from "../controller/useControlBasicData";
export interface IBasicInputs {
  image: FileList;
  marketName: string;
  sector: string;
  address: string;
  subAddress: string;
}

export const useBasicInputsHandler = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IBasicInputs>();

  useBasicSetData({
    watch,
    setValue,
    clearErrors,
    errors,
  });

  const { setStage, setModalValue } = useInfoStore((state) => ({
    setStage: state.setStage,
    setModalValue: state.setModalValue,
  }));
  const { setBasicStoreState, profileImg } = useBasicStore((state) => ({
    setBasicStoreState: state.setBasicStoreState,
    profileImg: state.profileImg,
  }));

  const onSubmit = async (validForm: IBasicInputs) => {
    if (!validForm.address) {
      setError("address", {
        message: "주소입력은 필수 입력입니다.",
      });
    }
    if (!validForm.marketName) {
      setError("marketName", {
        message: "마켓명은 필수 입력입니다.",
      });
    }

    if (!validForm.sector) {
      setError("sector", {
        message: "업종은 필수 입력입니다.",
      });
    }
    if (
      [validForm.address, validForm.marketName, validForm.sector].some(
        (v) => !v
      )
    ) {
      return;
    }
    const { image, ...rest } = validForm;

    Object.keys(rest).forEach((_key) => {
      const key = _key as keyof Omit<
        BasicStoreInitState,
        "profileImgFile" | "profileImg"
      >;
      setBasicStoreState(key, rest[key]);
    });
    setBasicStoreState("profileImgFile", image[0]);
    setStage("insta");
  };

  const handleAddressButtonClick = () => {
    setModalValue("address");
  };

  return {
    register,
    profileImg,
    submit: handleSubmit(onSubmit),
    errors,
    watch,
    handleAddressButtonClick
  };
};
