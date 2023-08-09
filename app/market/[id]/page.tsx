import React from "react";
import MyMarket from "./components/MyMarket";
import { Metadata, ResolvingMetadata } from "next";
import { getMarketInfo } from "../info/hooks/query/getMarketInfo";
import { redirect } from "next/navigation";
import { GetMarketInfoMetaData } from "../util/GetMarketInfoMetaData";
import { QueryErrorResponse, getUser } from "@/app/common/user/getUser";
import { cookies } from "next/headers";

export type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params: { id } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const marketInfo = await getMarketInfo(Number(id));

    const previousImages = (await parent).openGraph?.images || [];

    return GetMarketInfoMetaData.getMetaData(
      marketInfo,
      previousImages as typeof previousImages
    );
  } catch (e) {
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
}

const MarketInfoById = async ({ params: { id } }: Props) => {
  try {
    if (!id) {
      redirect("/market");
    }

    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token");
    let user;

    if (accessToken) {
      user = await getUser();
    }
    const marketInfo = await getMarketInfo(Number(id));

    return <MyMarket marketInfo={marketInfo} isUser={!!user} />;
  } catch (_e) {
    const e = _e as {
      response: QueryErrorResponse;
    };
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token");
    if (e.response.errors[0].message === "Unauthorized") {
      const marketInfo = await getMarketInfo(Number(id));
      if (accessToken) {
        return <MyMarket marketInfo={marketInfo} isUser={true} />;
      } else {
        return <MyMarket marketInfo={marketInfo} isUser={false} />;
      }
    }
    throw new Error("마켓정보를 받아오는데 실패했습니다.");
  }
};

export default MarketInfoById;
