import React from "react";
import InfoPageComponent from "./InfoPageComponent";
import { getUser } from "@/app/common/user/getUser";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import { redirectLoginWithoutLogin } from "@/util/redirectLoginWithoutLogin";

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "마켓 정보 등록하기",
    description:
      "위너님의 든든한 파트너 윈윈투게더!! 마켓을 등록해보세요!",
    openGraph: {
      images: [
        "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
        ...previousImages,
      ],
      description: "위너님의 든든한 파트너 윈윈투게더!!",
    },
  };
}

const InfoPage = async () => {
  redirectLoginWithoutLogin();
  return <InfoPageComponent />;
};

export default InfoPage;
