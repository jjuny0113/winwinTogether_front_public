"use client";

import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import React from "react";
import Content from "./component/Content";
import CustomToastContainer from "@/components/toastify/CustomToastContainer";
import { useOpenConsentAlertModal } from "@/components/Modal/useOpenConsentAlertModal";
import AlertModal from "@/components/AlertModal/AlertModal";
import Footer from "@/components/Footer";

const ContentsComponent = () => {
  useOpenConsentAlertModal();
  return (
    <PageWrapper
      header={<Header title="콘텐츠 보관함" />}
      isShowBottomNavigator
    >
      <Content />
      <CustomToastContainer />
      <AlertModal />
      <Footer isAbsolute={false}/>
    </PageWrapper>
  );
};

export default ContentsComponent;
