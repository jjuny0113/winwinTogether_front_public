"use client";
import React, { useCallback } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";

import MarketImgList from "../../components/MarketImgList/MarketImgList";
import { shallow } from "zustand/shallow";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import { useMarketImgRegistorStore } from "../../hooks/zustand/useMarketImgRegistorStore";
import { usePostMarketInfoImgs } from "../../hooks/query/usePostMarketInfoImgs";
import { useParams, useRouter } from "next/navigation";
import ShareUrlExampleComponent from "../../components/ShareUrlExampleComponent";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useAlertModalStore } from "@/components/AlertModal/useAlertModalStore";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import InitLoading from "@/components/InitLoading";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

const ImgUploadComponent = () => {
  const { imgUrls } = useMarketImgRegistorStore(
    (state) => ({
      imgUrls: state.imgUrls,
    }),
    shallow
  );

  const { isMarketImgsLoading, marketImgsMutateAsync } =
    usePostMarketInfoImgs();

  const { isBottomButtonLoading } = useBottomNavStore(
    (state) => ({
      isBottomButtonLoading: state.isBottomButtonLoading,
    }),
    shallow
  );
  const param = useParams() as {
    id: string;
  };
  const router = useRouter();
  useOffEntireLoading();
  const setAlertModalData = useAlertModalSetting();

  const handleRegisterButtonClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (isMarketImgsLoading) return;
      const result = await marketImgsMutateAsync(Number(param.id));
      if (result.status === "error") {
        setAlertModalData({
          status: "error",
          comment: <>한번에 용량 50MB 이상은 업로드 할 수 없어요</>,
          title: "업데이트 에러",
          onButtonClick: () => {
            useAlertModalStore.getState().setState("status", "");
          },
        });
        return;
      }
      router.refresh();
      router.push(`/market/${param.id}`);
    },
    [
      isMarketImgsLoading,
      marketImgsMutateAsync,
      param.id,
      router,
      setAlertModalData,
    ]
  );
  const onEntireLoading = useOnEntireLoading();
  if (isBottomButtonLoading) {
    return <InitLoading />;
  }
  return (
    <main>
      <div className="flex flex-col  h-full pb-12 min-h-[100vh]">
        <Header
          title="마켓 사진 업로드"
          backFunc={() => {
            onEntireLoading();
            router.push(`/market/${param.id}`);
          }}
        />

        {imgUrls.length === 0 ? (
          <div className="h-[200px] w-full bg-monoGray3 flex justify-center items-center flex-col">
            <p>등록된 사진이 없어요</p>
            <p>+ 눌러 사진을 추가해주세요</p>
          </div>
        ) : (
          <ImageCarousel imgUrls={imgUrls} />
        )}

        <MarketImgList />
        <ShareUrlExampleComponent
          message="마켓사진을 등록해서 홍보페이지와 url로 전달할 때 정보에 사진을 나오게 해보세요!"
          mainImg={imgUrls[0]}
          title="마켓명"
          subTitle="마켓 소개"
        >
          <Button
            variant="primary"
            size="large"
            onClick={handleRegisterButtonClick}
            isLoading={isMarketImgsLoading}
          >
            등록
          </Button>
        </ShareUrlExampleComponent>
      </div>
      <AlertModal />
    </main>
  );
};

export default ImgUploadComponent;
