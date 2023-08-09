import { useEffect } from "react";
import { useAlertModalStore } from "../AlertModal/useAlertModalStore";
import { useGetUser } from "@/app/common/user/useGetUser";
import Button from "../Button";
import { useRouter } from "next/navigation";

export const useOpenConsentAlertModal = () => {
  const user = useGetUser();
  const router = useRouter();
  useEffect(() => {
    if (!user?.privacy_consent && !user?.survey_sms_consent) {
      useAlertModalStore.getState().setState("status", "warn");
      useAlertModalStore
        .getState()
        .setState("comment", "필수 동의사항에 동의해주셔야합니다.");
      useAlertModalStore.getState().setState("title", "필수 동의 체크");
      useAlertModalStore.getState().setState(
        "buttonChildren",
        <>
          <Button
            size="small"
            variant="primary"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            확인
          </Button>
        </>
      );
    } else {
      useAlertModalStore.getState().setState("status", "");
    }
  }, [user]);
};
