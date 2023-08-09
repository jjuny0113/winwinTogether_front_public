import React from "react";
import ItemDetailPage from "../ItemList/ItemDetailPage";
import { Metadata, ResolvingMetadata } from "next";
import { getItem } from "../hooks/query/getItem";
import { getMarketInfo } from "@/app/market/info/hooks/query/getMarketInfo";
import { GetItemMetaData } from "../util/GetMetaData";
import { QueryErrorResponse, getUser } from "@/app/common/user/getUser";
import { cookies } from "next/headers";

export async function generateMetadata(
  {
    params: { id, itemId },
  }: {
    params: {
      id: string;
      itemId: string;
    };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const [marketInfo, item] = await Promise.all([
      getMarketInfo(Number(id)),
      getItem(Number(itemId)),
    ]);

    const previousImages = (await parent).openGraph?.images || [];
    const metaData = GetItemMetaData.getMetaData(
      marketInfo,
      item,
      previousImages as typeof previousImages
    );
    return metaData;
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
const ItemDetail = async ({
  params: { id, itemId },
}: {
  params: {
    id: string;
    itemId: string;
  };
}) => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token");
    let user;
    if (accessToken) {
      user = await getUser();
    }
    const [marketInfo, item] = await Promise.all([
      getMarketInfo(Number(id)),
      getItem(Number(itemId)),
    ]);

    return (
      <ItemDetailPage
        martketInfoWithImgs={marketInfo}
        item={item}
        isUser={!!user}
      />
    );
  } catch (_e) {
    const e = _e as {
      response: QueryErrorResponse;
    };
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token");
    const [marketInfo, item] = await Promise.all([
      getMarketInfo(Number(id)),
      getItem(Number(itemId)),
    ]);
    if (e.response.errors[0].message === "Unauthorized") {
      if (accessToken) {
        return (
          <ItemDetailPage
            martketInfoWithImgs={marketInfo}
            item={item}
            isUser={true}
          />
        );
      } else {
        return (
          <ItemDetailPage
            martketInfoWithImgs={marketInfo}
            item={item}
            isUser={false}
          />
        );
      }
    }
    throw new Error("아이템 정보를 받아오는데 실패했습니다.");
  }
};

export default ItemDetail;
