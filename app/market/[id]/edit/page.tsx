import React from "react";
import EditMarketInfoComponent from "./EditMarketInfoComponent";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "마켓 정보 수정",
    openGraph: {
      images: [
        "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
        ...previousImages,
      ],
      description: "위너님의 든든한 파트너 윈윈투게더!!",
    },
  };
}

const EditMarketInfo = () => {
  return <EditMarketInfoComponent />;
};

export default EditMarketInfo;
