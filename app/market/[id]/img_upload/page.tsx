import { redirectLoginWithoutLogin } from "@/util/redirectLoginWithoutLogin";
import ImgUploadComponent from "./ImgUploadComponent";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "마켓 사진 등록하기",
    description:
      "마켓 사진을 등록해서 온라인 명함과 검색엔진 최적화에 이용해보세요",
    openGraph: {
      images: [
        "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
        ...previousImages,
      ],
      description: "위너님의 든든한 파트너 윈윈투게더!!",
    },
  };
}

const MarketInfoImgUpload = () => {
  redirectLoginWithoutLogin();
  return <ImgUploadComponent />;
};

export default MarketInfoImgUpload;
