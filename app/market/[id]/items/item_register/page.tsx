import { redirectLoginWithoutLogin } from "@/util/redirectLoginWithoutLogin";
import ItemRegisterComponent from "./ItemRegisterComponent";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "마켓 상품등록",
    description:
      "위너님의 든든한 파트너 윈윈투게더!! 상품을 등록해서 마켓 상품을 홍보해보세요!",
    openGraph: {
      images: [
        "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
        ...previousImages,
      ],
      description: "위너님의 든든한 파트너 윈윈투게더!!",
    },
  };
}

const ItemRegister = () => {
  redirectLoginWithoutLogin();
  return <ItemRegisterComponent />;
};

export default ItemRegister;
