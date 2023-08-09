"use client";
import React from "react";
import { useLogin } from "../../hooks/zustand/useLogin";
import { shallow } from "zustand/shallow";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
import InitLoading from "@/components/InitLoading";

const WelcomeButton = () => {
  const { welcome, setWelcome, setSideSlidePage, setPage } = useLogin(
    (state) => ({
      welcome: state.welcome,
      setWelcome: state.setWelcome,
      setSideSlidePage: state.setSideSlidePage,
      setPage: state.setPage,
    }),
    shallow
  );
  const { isBottomButtonLoading } = useBottomNavStore(
    (state) => ({
      isBottomButtonLoading: state.isBottomButtonLoading,
    }),
    shallow
  );
  const onEntireLoading = useOnEntireLoading();
  const router = useRouter();
  if (isBottomButtonLoading) {
    return <InitLoading />;
  }

  switch (welcome) {
    case "intro":
      return (
        <Button
          size="large"
          variant="primary"
          onClick={() => {
            setWelcome("banner");
            setSideSlidePage(2);
          }}
          className="absolute bottom-0 mb-5"
        >
          다음
        </Button>
      );
    case "banner":
      return (
        <Button
          size="large"
          variant="primary"
          onClick={() => {
            setWelcome("promotional");
            setSideSlidePage(3);
          }}
          className="absolute bottom-0 mb-5"
        >
          다음
        </Button>
      );
    case "promotional":
      return (
        <Button
          size="large"
          variant="primary"
          onClick={() => {
            onEntireLoading();
            setPage("");
            router.push("/market/info");
          }}
          isLoading={useBottomNavStore.getState().isBottomButtonLoading}
          className="absolute bottom-0 mb-5"
        >
          마켓 등록하러 하기
        </Button>
      );
    default:
      <></>;
  }
  return <></>;
};

export default WelcomeButton;
