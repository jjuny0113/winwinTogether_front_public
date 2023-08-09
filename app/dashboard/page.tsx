import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import React from "react";
import MainComponent from "./DashboardComponent";

import { redirectLoginWithoutLogin } from "@/util/redirectLoginWithoutLogin";
import { Metadata, ResolvingMetadata } from "next";
import Footer from "@/components/Footer";

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "대시보드",
    openGraph: {
      images: [
        "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
        ...previousImages,
      ],
      description: "위너님의 든든한 파트너 윈윈투게더!!",
    },
  };
}

const Main = () => {
  redirectLoginWithoutLogin();
  return (
    <PageWrapper isShowBottomNavigator header={<Header title="대시보드" />}>
      <MainComponent />
    </PageWrapper>
  );
};

export default Main;
