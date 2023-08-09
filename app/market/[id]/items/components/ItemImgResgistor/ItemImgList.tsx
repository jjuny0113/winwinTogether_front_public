"use client"
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useItemImgResigerStore } from "../../hooks/zustand/useItemImgResigerStore";
import Image from "next/image";
import { useDraggable } from "react-use-draggable-scroll";
import ImgList from "@/components/ImgList/ImgList";
import { shallow } from "zustand/shallow";
import ItemRegistorComponent from "@/components/ImgList/ImgRegistor";
import { useForm } from "react-hook-form";
interface ItemImgResgistorForm {
  img: FileList;
}
const ItemImgList = () => {
  const { register, watch, setValue } = useForm<ItemImgResgistorForm>();
  const { imgUrls, setImgUrls, setImgFiles } = useItemImgResigerStore(
    (state) => ({
      imgUrls: state.imgUrls,
      setImgUrls: state.setImgUrls,
      setImgFiles: state.setImgFiles,
    }),
    shallow
  );
  const image = watch("img");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImgUrls(URL.createObjectURL(file));
      setImgFiles(file);
    }
  }, [image, setImgFiles, setImgUrls, setValue]);

  return (
    <ImgList imgUrls={imgUrls} handleDeleteIconClick={() => {}}>
      <ItemRegistorComponent
        register={register("img")}
        imgUrls={imgUrls}
        maxRegistImg={5}
      />
    </ImgList>
  );
};

export default ItemImgList;
