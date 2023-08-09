"use client";
import Header from "@/components/Header";
import ImgList from "@/components/ImgList/ImgList";
import { useParams, useRouter } from "next/navigation";
import ItemRegistorComponent from "@/components/ImgList/ImgRegistor";
import React, { useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";
import ShareUrlExampleComponent from "@/app/market/components/ShareUrlExampleComponent";
import Button from "@/components/Button";
import { shallow } from "zustand/shallow";
import { useEditItemStore } from "../hook/zustand/useEditItemStore";
import { useUploadItemImgs } from "../../hooks/query/useUploadItemImgs";
import { useDeleteItemImgs } from "../../hooks/query/useDeleteItemImgs";

import { useItemImgHandler } from "../hook/handler/useItemImgHandler";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface ItemImgResgistorForm {
  img: FileList;
}
const ItemImgUpload = () => {
  const { register, watch } = useForm<ItemImgResgistorForm>();
  const param = useParams() as {
    id: string;
    itemId: string;
  };
  const router = useRouter();
  const { imgUrls, setState, imgFiles, reset } = useEditItemStore(
    (state) => ({
      imgUrls: state.imgUrls,
      imgFiles: state.imgFiles,
      setState: state.setState,
      reset: state.reset,
    }),
    shallow
  );

  const { isItemImgLoading, deleteItemImgsAsyncMutation } = useDeleteItemImgs();
  const { isUploadItemImgsLoading, uploadItemImgsMutateAsync } =
    useUploadItemImgs();
  const invalidateQueries = useInvalidateQueries();
  // 파일에 있는것을 파일 업데이트
  // 파일 있는거 제외하고 imgurls graphql mutation
  const image = watch("img");
  useItemImgHandler(image);

  const handleDeleteIconClick = (url: string, index: number) => {
    setState(
      "imgUrls",
      imgUrls.filter((v) => v.url !== url)
    );
    setState(
      "imgFiles",
      imgFiles.filter((v) => v.url !== url)
    );
  };

  const handleModifyButtonClick = useCallback(async () => {
    if (isItemImgLoading || isUploadItemImgsLoading) {
      return;
    }

    await Promise.all([
      deleteItemImgsAsyncMutation(),
      uploadItemImgsMutateAsync(Number(param.itemId)),
    ]);
    await invalidateQueries([QUERY_KEYS.ITEMS]);
    reset();
    router.refresh();
    router.back();
  }, [
    deleteItemImgsAsyncMutation,
    invalidateQueries,
    isItemImgLoading,
    isUploadItemImgsLoading,
    param.itemId,
    reset,
    router,
    uploadItemImgsMutateAsync,
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
        handleDeleteIconClick={handleDeleteIconClick}
      >
        <ItemRegistorComponent
          register={register("img")}
          imgUrls={imgUrls.map((v) => v.url)}
          maxRegistImg={5}
        />
      </ImgList>
      <ShareUrlExampleComponent
        message="마켓사진을 등록해서 홍보페이지와 url로 전달할 때 정보에 사진을 나오게 해보세요!"
        mainImg={imgUrls[0]?.url}
        title="마켓명"
        subTitle="마켓 소개"
      >
        <Button
          variant="primary"
          size="large"
          onClick={handleModifyButtonClick}
          isLoading={isItemImgLoading || isUploadItemImgsLoading}
        >
          수정
        </Button>
      </ShareUrlExampleComponent>
    </>
  );
};

export default ItemImgUpload;
