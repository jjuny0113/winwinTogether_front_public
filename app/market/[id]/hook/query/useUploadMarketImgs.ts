import { shallow } from "zustand/shallow";
import { useMarketInfoStore } from "../zustand/useMarketInfoStore";
import { useMutation } from "@tanstack/react-query";
import { postMarketInfoImgs } from "@/app/market/hooks/query/postMarketInfoImgs";

export const useUploadMarketImgs = () => {
  const { imgFiles } = useMarketInfoStore(
    (state) => ({
      imgFiles: state.imgFiles,
    }),
    shallow
  );

  const { mutateAsync, isLoading } = useMutation(
    postMarketInfoImgs(imgFiles.map((v) => v.file))
  );

  return {
    uploadMarketImgsMutateAsync: mutateAsync,
    isUploadMarketImgsLoading: isLoading,
  };
};
