import {
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IBasicInputs } from "../handler/useBasicInputsHandler";
import { useEffect } from "react";
import { useBasicStore } from "../zustand/useBasicStore";
import { shallow } from "zustand/shallow";
import { checkOverImgSize } from "@/util/checkImgFiles";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";
import { useAlertModalStore } from "@/components/AlertModal/useAlertModalStore";

interface useBasicSetDataParams {
  watch: UseFormWatch<IBasicInputs>;
  setValue: UseFormSetValue<IBasicInputs>;
  clearErrors: UseFormClearErrors<IBasicInputs>;
  errors: FieldErrors<IBasicInputs>;
}

export const useBasicSetData = ({
  watch,
  setValue,
  clearErrors,
  errors,
}: useBasicSetDataParams) => {
  const {
    setBasicStoreState,
    stateAddress,
    stateSubAddress,
    stateMarketName,
    stateSector,
  } = useBasicStore(
    (state) => ({
      setBasicStoreState: state.setBasicStoreState,
      stateAddress: state.address,
      stateSubAddress: state.subAddress,
      stateMarketName: state.marketName,
      stateSector: state.sector,
    }),
    shallow
  );

  const image = watch("image");
  const address = watch("address");
  const marketName = watch("marketName");
  const sector = watch("sector");
  const setAlertModalData = useAlertModalSetting();
  useEffect(() => {
    setValue("address", stateAddress);
    setValue("subAddress", stateSubAddress);
    setValue("marketName", stateMarketName);
    setValue("sector", stateSector);
  }, []);

  useEffect(() => {
    if (errors.address?.message && address) {
      clearErrors("address");
    }
  }, [address, clearErrors, errors.address?.message]);
  useEffect(() => {
    if (errors.marketName?.message && marketName) {
      clearErrors("marketName");
    }
  }, [clearErrors, errors.marketName?.message, marketName]);
  useEffect(() => {
    if (errors.address?.message && sector) {
      clearErrors("sector");
    }
  }, [clearErrors, errors.address?.message, sector]);
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      if (checkOverImgSize(file.size)) {
        setAlertModalData({
          status: "error",
          title: "이미지 용량 초과",
          comment: "최대 50MB까지 올릴 수 있습니다.",
          onButtonClick: () => {
            useAlertModalStore.getState().setState("status", "");
          },
        });
        return;
      }
      setBasicStoreState("profileImg", URL.createObjectURL(file));
    }
  }, [image]);

  useEffect(() => {
    if (stateAddress) {
      setValue("address", stateAddress);
    }
  }, [stateAddress]);
};
