"use client";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";

import React, { useEffect, useMemo, useState } from "react";

import { useGetInstaPostByTimeStamp } from "@/app/contents/hooks/query/useGetInstaPostByTimeStamp";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import FinishGenerateComponent from "./FinishGenerateComponent";
import ChatCompoent from "./ChatComponents/ChatCompoent";

import { useChatStore } from "../hooks/zustand/useChatStore";
import ProductSelector from "./ModalSwitcher/ProductSelector";
import { useGetUser } from "@/app/common/user/useGetUser";
import EmptyMarketInfo from "@/components/EmptyMarketInfo";
import { useResetStore } from "../hooks/handler/useResetStore";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { shallow } from "zustand/shallow";
import { useScrollTop } from "@/util/useScrollTop";
import InitLoading from "@/components/InitLoading";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useOpenConsentAlertModal } from "@/components/Modal/useOpenConsentAlertModal";
import Footer from "@/components/Footer";

const ChatPageComponent = () => {
  const user = useGetUser();
  const { data, isLoading } = useGetInstaPostByTimeStamp();
  const { selectorType, contentType, setState } = useChatStore(
    (state) => ({
      selectorType: state.selectorType,
      contentType: state.contentType,
      setState: state.setState,
    }),
    shallow
  );
  const { isBottomButtonLoading } = useBottomNavStore(
    (state) => ({
      isBottomButtonLoading: state.isBottomButtonLoading,
    }),
    shallow
  );

  useResetStore();
  useScrollTop(contentType === "" || selectorType === "");
  useOpenConsentAlertModal();
  const content = useMemo(() => data?.[0], [data]);

  if (isLoading || isBottomButtonLoading) {
    return <InitLoading />;
  }
  if (!user?.market_id) {
    return (
      <PageWrapper
        header={<Header title="인스타 문구 만들기" />}
        isShowBottomNavigator
      >
        <EmptyMarketInfo />
      </PageWrapper>
    );
  }
  return (
    <>
      {selectorType === "product" ? (
        <ProductSelector
          backFunc={() => {
            setState("selectorType", "");
          }}
        />
      ) : (
        <PageWrapper
          header={<Header title="인스타 문구 만들기" />}
          isShowBottomNavigator
        >
          {!contentType && content ? (
            <FinishGenerateComponent />
          ) : (
            <ChatCompoent />
          )}
        </PageWrapper>
      )}
      <AlertModal />
    </>
  );
};

export default ChatPageComponent;
