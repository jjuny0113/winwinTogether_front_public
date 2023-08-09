import PageWrapper from "@/components/PageWrapper";
import MainComponent from "./dashboard/DashboardComponent";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import LoginComponents from "./login/LoginComponents";
import RedirctComponent from "@/components/RedirctComponent";

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

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  // if (!accessToken || !accessToken.value) {
  //   redirect("/login");
  // } else {
  //   redirect("/dashboard");
  // }
  return <RedirctComponent isExistCookie={!!accessToken} />;
}
