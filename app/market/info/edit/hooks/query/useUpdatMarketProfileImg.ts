import { useMutation } from "@tanstack/react-query";
import { usePostMarketInfoProfileImg } from "../../../hooks/query/usePostMarketInfoProfileImg";
import { useEditInfoStore } from "../zustand/useEditInfoStore";

export const useUpdatMarketProfileImg = () => {
  const { profileImgFile } = useEditInfoStore((state) => ({
    profileImgFile: state.profileImgFile,
  }));
  const postMartImg = usePostMarketInfoProfileImg(profileImgFile);

  const { mutateAsync, isLoading } = useMutation(postMartImg);
  return {
    mutateAsync,
    isLoading,
  };
};
