import { useMutation } from "@tanstack/react-query";
import { useItemRegisterStore } from "@/app/market/hooks/zustand/useItemRegisterStore";
import { postItemImgs } from "./postItemImgs";

export const usePostItemImgs = () => {
  const { imgFiles } = useItemRegisterStore((state) => ({
    imgFiles: state.imgFiles,
  }));

  const { mutateAsync, isLoading } = useMutation(postItemImgs(imgFiles));

  return {
    itemImgsMutateAsync: mutateAsync,
    isItemImgsLoading: isLoading,
  };
};
