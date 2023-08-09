import { Metadata, ResolvingMetadata } from "next";
import ChatPageComponent from "./components/ChatPageComponent";
import { redirectLoginWithoutLogin } from "@/util/redirectLoginWithoutLogin";

export async function generateMetadata(
  params: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "인스타 콘텐츠 만들기",
    description:
      "위너님의 든든한 파트너 윈윈투게더!! 인스타를 콘텐츠를 만들어보세요",
    openGraph: {
      images: [
        "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
        ...previousImages,
      ],
      description: "위너님의 든든한 파트너 윈윈투게더!!",
    },
  };
}

const ChatPage = () => {
  redirectLoginWithoutLogin();
  return <ChatPageComponent />;
};

export default ChatPage;
