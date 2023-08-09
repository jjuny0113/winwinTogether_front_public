"use client";
import Header from "@/components/Header";
import ImgList from "@/components/ImgList/ImgList";
import { useParams, useRouter } from "next/navigation";
import ItemRegistorComponent from "@/components/ImgList/ImgRegistor";
import React, { useCallback, useEffect } from "react";
import { useMarketInfoStore } from "../../hook/zustand/useMarketInfoStore";
import { useForm } from "react-hook-form";
import ShareUrlExampleComponent from "@/app/market/components/ShareUrlExampleComponent";
import Button from "@/components/Button";
import { shallow } from "zustand/shallow";
import { useUpdateMarketImgs } from "../../hook/query/useUpdateMarketImgs";
import { useUploadMarketImgs } from "../../hook/query/useUploadMarketImgs";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";
import { useAlertModalStore } from "@/components/AlertModal/useAlertModalStore";
import { useHandleImg } from "../../hook/handler/useHandleImg";

interface ItemImgResgistorForm {
  img: FileList;
}
const MarketImgUpload = () => {
  const { register, watch } = useForm<ItemImgResgistorForm>();
  const param = useParams() as {
    id: string;
  };
  const router = useRouter();
  const { imgUrls, setState, imgFiles } = useMarketInfoStore(
    (state) => ({
      imgUrls: state.imgUrls,
      imgFiles: state.imgFiles,
      setState: state.setState,
    }),
    shallow
  );
  const setAlertModalData = useAlertModalSetting();

  const { isMarketImgsLoading, updateMarketImgsAsyncMutation } =
    useUpdateMarketImgs();
  const { uploadMarketImgsMutateAsync, isUploadMarketImgsLoading } =
    useUploadMarketImgs();
  // 파일에 있는것을 파일 업데이트
  // 파일 있는거 제외하고 imgurls graphql mutation
  const image = watch("img");
  useHandleImg(image);

  const handleEditButtonClick = useCallback(async () => {
    if (isMarketImgsLoading || isUploadMarketImgsLoading) {
      return;
    }

    const [updateMarketImgs, uploadMarketImgs] = await Promise.all([
      updateMarketImgsAsyncMutation(),
      uploadMarketImgsMutateAsync(Number(param.id)),
    ]);
    if (
      updateMarketImgs.deleteMarketImgs.status === "error" ||
      uploadMarketImgs.status === "error"
    ) {
      setAlertModalData({
        status: "error",
        comment: "마켓 이미지 등록에 일시적으로 문제가 발생했어요",
        title: "업데이트 에러",
        onButtonClick: () => {
          useAlertModalStore.getState().setState("status", "");
        },
      });
      return;
    }

    router.refresh();
    router.back();
  }, [
    isMarketImgsLoading,
    isUploadMarketImgsLoading,
    param.id,
    router,
    setAlertModalData,
    updateMarketImgsAsyncMutation,
    uploadMarketImgsMutateAsync,
  ]);
  return (
    <>
      <Header
        title="마켓 사진 수정"
        backFunc={() => {
          router.push(`/market/${param.id}`);
        }}
      />
      <ImgList
        imgUrls={imgUrls.map((v) => v.url)}
        handleDeleteIconClick={(url: string, index: number) => {
          setState(
            "imgUrls",
            imgUrls.filter((v) => v.url !== url)
          );
          setState(
            "imgFiles",
            imgFiles.filter((v) => v.url !== url)
          );
        }}
      >
        <ItemRegistorComponent
          register={register("img")}
          imgUrls={imgUrls.map((v) => v.url)}
          maxRegistImg={10}
        />
      </ImgList>
      <ShareUrlExampleComponent
        message="마켓사진을 등록해서 홍보페이지와 url로 전달할 때 정보에 사진을 나오게
       해보세요!"
        mainImg={imgUrls[0]?.url}
        title="마켓명"
        subTitle="마켓 소개"
      >
        <Button
          variant="primary"
          size="large"
          onClick={handleEditButtonClick}
          isLoading={isMarketImgsLoading || isUploadMarketImgsLoading}
        >
          수정
        </Button>
      </ShareUrlExampleComponent>
    </>
  );
};

export default MarketImgUpload;
