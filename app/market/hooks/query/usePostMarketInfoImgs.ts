import { useMarketImgRegistorStore } from "../zustand/useMarketImgRegistorStore";
import { useMutation } from "@tanstack/react-query";
import { postMarketInfoImgs } from "./postMarketInfoImgs";

export const usePostMarketInfoImgs = () => {
  const { imgFiles } = useMarketImgRegistorStore((state) => ({
    imgFiles: state.imgFiles,
  }));

  const { mutateAsync, isLoading } = useMutation(postMarketInfoImgs(imgFiles));

  return {
    marketImgsMutateAsync: mutateAsync,
    isMarketImgsLoading: isLoading,
  };
};
