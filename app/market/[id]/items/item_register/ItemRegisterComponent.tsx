"use client";

import ResgistorInputs from "@/app/market/[id]/items/components/ResgistorInputs";
import Header from "@/components/Header";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import React from "react";
import { useItemRegisterStore } from "../../../hooks/zustand/useItemRegisterStore";
import ItemImgList from "../../../components/ItemImgList";
import { useRouter } from "next/navigation";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useSearchParams } from "next/navigation";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { shallow } from "zustand/shallow";
import InitLoading from "@/components/InitLoading";
import { useItemRegisterHandler } from "../hooks/handler/useItemRegisterHandler";

const ItemRegisterComponent = () => {
  const { imgUrls } = useItemRegisterStore((state) => ({
    imgUrls: state.imgUrls,
  }));
  const router = useRouter();
  useOffEntireLoading();
  const onEntireLoading = useOnEntireLoading();
  const { isBottomButtonLoading } = useBottomNavStore(
    (state) => ({
      isBottomButtonLoading: state.isBottomButtonLoading,
    }),
    shallow
  );
  const searchParams = useSearchParams();

  const itemRegisterHandler = useItemRegisterHandler();
  if (isBottomButtonLoading) {
    return <InitLoading />;
  }
  return (
    <main className="flex flex-col">
      <div className="flex flex-col  h-full pb-12 min-h-[100vh]">
        <Header
          title="상품 등록"
          backFunc={
            itemRegisterHandler.isLoading
              ? undefined
              : () => {
                  const isFromChat = searchParams.get("chat");

                  if (isFromChat) {
                    router.push("/chat?isFromItemRegister=true");
                    return;
                  }
                  onEntireLoading();
                  router.back();
                }
          }
        />

        {imgUrls.length === 0 ? (
          <div className="h-[200px] w-full bg-monoGray3 flex justify-center items-center flex-col">
            <p>등록된 사진이 없어요</p>
            <p>+ 눌러 사진을 추가해주세요</p>
          </div>
        ) : (
          <ImageCarousel imgUrls={imgUrls} />
        )}
        <ItemImgList />
        <ResgistorInputs {...itemRegisterHandler} />
        <AlertModal />
      </div>
    </main>
  );
};

export default ItemRegisterComponent;
