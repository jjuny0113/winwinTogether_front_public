import {
  MarketInfoDetailStore,
  useMarketInfoDetailStore,
} from "../zustand/useMarketInfoDetailStore";
import { useForm } from "react-hook-form";
import { BankListType, ListType } from "../../constants";
import { useInfoStore } from "../zustand/useInfoStore";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { PHONE_NUM_REGEX, TEL_REGEX, URL_REGEX } from "@/app/constants";

export interface MarketInfoDetailForm {
  kakaoUrl: string;
  instaUrl: string;
  naverUrl: string;
  mallUrl: string;
  bank: BankListType | "";
  account: string;
  marketIntroduction: string;
  operatingTime: string;
  phoneNum: string;
  accountHolder: string;
}
export const useMarketInfoDetailHandler = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<MarketInfoDetailForm>();
  const {
    operationTime,
    bank,
    detail,
    social,
    setDetailState,
    setSocialState,
  } = useMarketInfoDetailStore(
    (state) => ({
      operationTime: state.detail.operationTime,
      bank: state.detail.bank,
      detail: state.detail,
      social: state.social,
      setDetailState: state.setDetailState,
      setSocialState: state.setSocialState,
    }),
    shallow
  );
  const { modalValue, setStage } = useInfoStore(
    (state) => ({
      modalValue: state.modalValue,
      setStage: state.setStage,
    }),
    shallow
  );

  useEffect(() => {
    if (bank || bank === "") {
      setValue("bank", bank);
    }
  }, [bank, setValue]);

  useEffect(() => {
    setValue("account", detail.account);
    setValue("bank", detail.bank);
    setValue("marketIntroduction", detail.marketIntroduction);
    setValue("phoneNum", detail.phoneNum);
    setValue("instaUrl", social.instaUrl);
    setValue("kakaoUrl", social.kakaoUrl);
    setValue("mallUrl", social.mallUrl);
    setValue("naverUrl", social.naverUrl);
  }, []);
  const isActiveOperationTimeValue =
    modalValue === "" &&
    operationTime
      .map((v) => [v.time.open, v.time.close])
      .flat()
      .some((v) => v !== "");

  const onSubmit = (values: MarketInfoDetailForm) => {
    const isValidatePhoneNum = !(
      PHONE_NUM_REGEX.test(values.phoneNum) ||
      TEL_REGEX.test(values.phoneNum) ||
      values.phoneNum === ""
    );

    const isAllValueEmpty =
      !values.account && !values.accountHolder && !values.bank;
    const isAllValue = values.account && values.accountHolder && values.bank;
    const isValidateUrl = (key: keyof MarketInfoDetailForm) =>
      URL_REGEX.test(values[key]) || values[key] === "";
    if (isValidatePhoneNum) {
      setError("phoneNum", {
        message: "올바른 전화번호를 입력해주세요",
      });
    }
    if (!isValidateUrl("instaUrl")) {
      setError("instaUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
    }
    if (!isValidateUrl("kakaoUrl")) {
      setError("kakaoUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
    }
    if (!isValidateUrl("naverUrl")) {
      setError("naverUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
    }
    if (!isValidateUrl("mallUrl")) {
      setError("mallUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
    }

    if (!(isAllValue || isAllValueEmpty)) {
      setError("bank", {
        message:
          "은행을 입력하셔야해요!(은행, 예금주, 계좌번호는 같이 입력해야해요.)",
      });
      setError("accountHolder", {
        message:
          "예금주를 입력하셔야해요!(은행, 예금주, 계좌번호는 같이 입력해야해요.)",
      });
      setError("account", {
        message:
          "계좌번호를 입력하셔야해요!(은행, 예금주, 계좌번호는 같이 입력해야해요.)",
      });
    }

    if (
      [
        isValidatePhoneNum,
        !isValidateUrl("instaUrl"),
        !isValidateUrl("kakaoUrl"),
        !isValidateUrl("naverUrl"),
        !isValidateUrl("mallUrl"),
        !(isAllValue || isAllValueEmpty),
      ].some((v) => v)
    ) {
      return;
    }
    setDetailState("account", values.account);
    setDetailState("bank", values.bank);
    setDetailState("accountHolder", values.accountHolder);
    setDetailState("marketIntroduction", values.marketIntroduction);
    setDetailState("phoneNum", values.phoneNum);
    setSocialState("instaUrl", values.instaUrl);
    setSocialState("kakaoUrl", values.kakaoUrl);
    setSocialState("mallUrl", values.mallUrl);
    setSocialState("naverUrl", values.naverUrl);
    setStage("finish");
  };
  return {
    register,
    isActiveOperationTimeValue,
    watch,
    bank,
    submit: handleSubmit(onSubmit),
    errors,
  };
};
