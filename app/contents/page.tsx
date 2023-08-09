import React from "react";
import ContentsComponent from "./ContentsComponent";
import { Metadata, ResolvingMetadata } from "next";
import { redirectLoginWithoutLogin } from "@/util/redirectLoginWithoutLogin";

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "콘텐츠 보관함",
    description:
      "위너님의 든든한 파트너 윈윈투게더!! 그동안 만들었던 콘텐츠를 확인해보세요",
    openGraph: {
      images: [
        "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
        ...previousImages,
      ],
      description: "위너님의 든든한 파트너 윈윈투게더!!",
    },
  };
}

const page = () => {
  redirectLoginWithoutLogin();
  return <ContentsComponent />;
};

export default page;
