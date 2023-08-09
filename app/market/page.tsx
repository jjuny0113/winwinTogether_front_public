import EmptyMarketInfo from "@/components/EmptyMarketInfo";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    openGraph: {
      images: [
        "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
        ...previousImages,
      ],
      description: "위너님의 든든한 파트너 윈윈투게더!!",
    },
  };
}

const EmptyMarketInfoPage = () => {
  return (
    <PageWrapper header={<Header title="내 마켓 명함" />} isShowBottomNavigator>
      <EmptyMarketInfo />
    </PageWrapper>
  );
};

export default EmptyMarketInfoPage;
