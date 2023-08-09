import React, { useEffect } from "react";
import { useMarketImgRegistorStore } from "../../hooks/zustand/useMarketImgRegistorStore";
import ImgList from "@/components/ImgList/ImgList";

import ItemRegistorComponent from "@/components/ImgList/ImgRegistor";
import { useForm } from "react-hook-form";
import { shallow } from "zustand/shallow";
import { checkOverImgSize } from "@/util/checkImgFiles";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";
import { useAlertModalStore } from "@/components/AlertModal/useAlertModalStore";

interface MarketImgResgistorForm {
  img: FileList;
}

const MarketImgList = () => {
  const { register, watch, setValue } = useForm<MarketImgResgistorForm>();
  const { imgUrls, setImgUrls, setImgFiles, deleteImgFile, deleteImgUrl } =
    useMarketImgRegistorStore(
      (state) => ({
        imgUrls: state.imgUrls,
        setImgUrls: state.setImgUrls,
        setImgFiles: state.setImgFiles,
        deleteImgFile: state.deleteImgFile,
        deleteImgUrl: state.deleteImgUrl,
      }),
      shallow
    );
  const image = watch("img");
  const setAlertModalData = useAlertModalSetting();
  useEffect(() => {
    if (image && image.length > 0) {
      const imgSize = Array.from(image)
        .slice(0, 10)
        .map((img) => img.size)
        .reduce((acc, cur) => acc + cur, 0);
      if (checkOverImgSize(imgSize)) {
        setAlertModalData({
          status: "error",
          title: "이미지 용량 초과",
          comment: "최대 50MB까지 올릴 수 있습니다. 나눠서 올려주세요!",
          onButtonClick: () => {
            useAlertModalStore.getState().setState("status", "");
          },
        });
        return;
      }
      Array.from(image)
        .slice(0, 10)
        .forEach((file) => {
          setImgUrls(URL.createObjectURL(file));
          setImgFiles(file);
        });
    }
  }, [image]);
  return (
    <ImgList
      imgUrls={imgUrls}
      handleDeleteIconClick={(url: string, index: number) => {
        deleteImgFile(index);
        deleteImgUrl(index);
      }}
    >
      <ItemRegistorComponent
        register={register("img")}
        imgUrls={imgUrls}
        maxRegistImg={10}
      />
    </ImgList>
  );
};

export default MarketImgList;
