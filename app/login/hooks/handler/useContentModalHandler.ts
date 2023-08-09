import { useState } from "react";
import { useRequestContent } from "../query/useRequestContent";
import { useLogin } from "../zustand/useLogin";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/navigation";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

export const useContentModalHandler = () => {
  const {
    isContentModalOpen,
    isOpenConsent,
    setIsContentModalOpen,
    privacyConsent,
    surveySmsConsent,
    setPrivacyConsent,
    setSurveySmsConsent,
    setIsOpenConsent,
  } = useLogin(
    (state) => ({
      isContentModalOpen: state.isContentModalOpen,

      isOpenConsent: state.isOpenConsent,
      setIsContentModalOpen: state.setIsContentModalOpen,
      privacyConsent: state.privacyConsent,
      surveySmsConsent: state.surveySmsConsent,
      setPrivacyConsent: state.setprivacyConsent,
      setSurveySmsConsent: state.setsurveySmsConsent,
      setIsOpenConsent: state.setIsOpenConsent,
    }),
    shallow
  );
  const onEntireLoading = useOnEntireLoading();
  const router = useRouter();
  const contents = [
    {
      isCheck: privacyConsent,
      onClick: () => {
        setPrivacyConsent(!privacyConsent);
      },
      contentValue: [
        `[필수] 추후 만족도 조사 문자 발송의 동의`,
        "(여러분의 목소리를 적극적으로 반영하겠습니다.)",
        "‣ 8월 10일에 발송 예정입니다.",
        "‣ 8월 10일 이후 선택사항으로 변경됩니다",
      ],
    },
    {
      isCheck: surveySmsConsent,
      onClick: () => {
        if (isOpenConsent) {
          setSurveySmsConsent(!surveySmsConsent);
          return;
        }
        onEntireLoading();
        router.push("/consent/personal");
        setIsOpenConsent(true);
      },
      contentValue: ["[필수] 개인정보 보호 동의"],
      onPtagClick: () => {
        router.push("/consent/personal");
      },
    },
  ];
  const isActiveButton = privacyConsent && surveySmsConsent;

  const { mutateAsync, isLoading } = useRequestContent();
  const invalidateQueries = useInvalidateQueries();
  const handleOkButtonClick = async () => {
    if (isLoading || !isActiveButton) return;

    await mutateAsync({
      privacyConsent,
      surveySmsConsent,
    });
    setIsContentModalOpen(false);
    invalidateQueries([QUERY_KEYS.USER]);
  };

  const handleCloseModal = () => {
    setIsContentModalOpen(false);
  };

  return {
    isContentModalOpen,
    contents,
    handleOkButtonClick,
    isActiveButton,
    handleCloseModal,
  };
};
