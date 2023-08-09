"use client";
import React from "react";

import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import PageWrapper from "@/components/PageWrapper";
import { useParams, usePathname, useRouter } from "next/navigation";
import MarketInfoProfile from "../components/MarketInfoProfile";
import { QueryItemSuccessResponse } from "../hooks/query/getItem";
import ItemDetailDescription from "./ItemDetailDescription";
import ItemList from "./ItemList";
import { useIsMarketAdmin } from "../hooks/useIsMarketAdmin";
import { QuerySuccessResponse } from "@/app/market/info/hooks/query/getMarketInfo";
import { useEditItemStore } from "../[itemId]/edit/hook/zustand/useEditItemStore";
import { shallow } from "zustand/shallow";
import SharePortal from "../../components/SharePortal";
import ItemModalSwitcher from "../components/ItemModalSwitcher";
import { useItemsStore } from "../[itemId]/hooks/zustand/useItemsStore";
import CustomToastContainer from "@/components/toastify/CustomToastContainer";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import InitLoading from "@/components/InitLoading";
import DeleteItemButton from "../components/DeleteItemButton";
import { FaPencil } from "react-icons/fa6";
import { useGetItems } from "../hooks/query/useGetItems";
import { writeClipboardText } from "@/util/writeClipboardText";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
interface ItemDetailPageProps {
  martketInfoWithImgs: QuerySuccessResponse["marketInfo"]["result"];
  item: QueryItemSuccessResponse["item"]["result"];
  isUser: boolean;
}
const ItemDetailPage = ({
  martketInfoWithImgs,
  item,
  isUser,
}: ItemDetailPageProps) => {
  const router = useRouter();
  const param = useParams() as {
    id: string;
    itemId: string;
  };
  const { setState, isEdit } = useEditItemStore(
    (state) => ({
      setState: state.setState,

      isEdit: state.isEdit,
    }),
    shallow
  );
  const pathname = usePathname();
  const { modalType, setItemState } = useItemsStore((state) => ({
    modalType: state.modalType,
    setItemState: state.setState,
  }));
  const data = useGetItems();
  const { isBottomButtonLoading, setRouterLoading } = useBottomNavStore(
    (state) => ({
      isBottomButtonLoading: state.isBottomButtonLoading,
      setRouterLoading: state.setState,
    })
  );
  const isMarketAdmin = useIsMarketAdmin(isUser);
  const handleMarketImgEditButtonClick = () => {
    setState("type", "itemImg");
    setState("imgUrls", item.market_item_imgs);
    setState("originImgUrls", item.market_item_imgs);
    setRouterLoading("isBottomButtonLoading", true);
    router.push(`/market/${param.id}/items/${param.itemId}/edit`);
  };
  useOffEntireLoading();

  if (isBottomButtonLoading) {
    return <InitLoading />;
  }
  return (
    <PageWrapper
      isShowBottomNavigator={isMarketAdmin}
      header={
        <Header
          title={item.name}
          backFunc={() => {
            router.push(`/market/${martketInfoWithImgs.id}`);
          }}
          isEdit={isEdit}
          editFunc={
            isMarketAdmin
              ? () => {
                  setState("isEdit", !isEdit);
                }
              : undefined
          }
        />
      }
    >
      <div className="flex flex-col">
        <div className="flex flex-col ">
          <div className="relative">
            <ImageCarousel imgUrls={item.market_item_imgs.map((v) => v.url)} />
            {isEdit && (
              <div
                className="absolute bottom-4 right-4"
                onClick={handleMarketImgEditButtonClick}
              >
                <FaPencil size={16} color="#A75AFF" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <MarketInfoProfile
              profileImgUrl={martketInfoWithImgs.profile_img}
              marketName={martketInfoWithImgs.market_name}
              marketIntroduce={martketInfoWithImgs.marketIntroduction}
              isMarketAdmin={isMarketAdmin}
            />
            <ItemDetailDescription
              detail={item.description.replace(/\n/g, "<br/>")}
              itemName={item.name}
              price={item.price}
              isEdit={isEdit}
            />
            {isEdit && <DeleteItemButton />}
          </div>
        </div>
        {(data?.filter((v) => v.id !== Number(param.itemId)) ?? []).length >
          0 && (
          <div className="flex flex-col gap-6  px-5">
            <div className=" h-[1px]  bg-monoGray2 shadow-sm" />
            <p className="text-xl font-semibold text-monoGray6">
              {martketInfoWithImgs.market_name}님의 다른 판매 상품
            </p>
            <ItemList id={item.id} />
          </div>
        )}

        {!isEdit && item.mall_url && (
          <a
            href={item.mall_url}
            className="sticky py-4 bottom-0 flex justify-center z-10"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="primary"
              size="large"
              className="-z-20"
              onClick={(e) => {
                e.currentTarget.parentNode?.addEventListener("click", () => {});
              }}
            >
              판매 사이트 바로가기
            </Button>
          </a>
        )}
      </div>
      <SharePortal
        onShareIconClick={async () => {
          if (isMarketAdmin) {
            setItemState("modalType", "share");
          } else {
            await writeClipboardText(
              `https://www.winwin-together.com${pathname}`
            );

            toast("url 주소가 복사되었습니다.");
          }
        }}
      />
      <ItemModalSwitcher item={item} />
      <CustomToastContainer />
      <Footer isBottomMargin />
    </PageWrapper>
  );
};

export default ItemDetailPage;
