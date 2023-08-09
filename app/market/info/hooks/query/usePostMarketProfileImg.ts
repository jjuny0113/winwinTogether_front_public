import { useMutation } from "@tanstack/react-query";
import { useBasicStore } from "../zustand/useBasicStore";
import { usePostMarketInfoProfileImg } from "./usePostMarketInfoProfileImg";

export const usePostMarketProfileImg = () => {
  const { profileImgFile } = useBasicStore((state) => ({
    profileImgFile: state.profileImgFile,
  }));
  const postMartImg = usePostMarketInfoProfileImg(profileImgFile);

  const { mutateAsync, isLoading } = useMutation(postMartImg);
  return {
    mutateAsync,
    isLoading,
  };
};
