import { useGetUser } from "@/app/common/user/useGetUser";
import { useLogin } from "../zustand/useLogin";
import { useEffect, useState } from "react";

const useCheckContent = () => {
  const { setIsContentModalOpen } = useLogin((state) => ({
    setIsContentModalOpen: state.setIsContentModalOpen,
  }));
  const userInfo = useGetUser();

  useEffect(() => {
    if (!userInfo) return;

    const { privacy_consent, survey_sms_consent } = userInfo;

    if (!(privacy_consent || survey_sms_consent)) {
      setIsContentModalOpen(true);
    }
  }, [userInfo, setIsContentModalOpen]);
};

export default useCheckContent;
