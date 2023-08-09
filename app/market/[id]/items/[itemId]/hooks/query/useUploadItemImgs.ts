import { useMutation } from "@tanstack/react-query";
import { useEditItemStore } from "../../edit/hook/zustand/useEditItemStore";
import { shallow } from "zustand/shallow";
import { postItemImgs } from "../../../hooks/query/postItemImgs";
export const useUploadItemImgs = () => {
  const { imgFiles } = useEditItemStore(
    (state) => ({
      imgFiles: state.imgFiles,
    }),
    shallow
  );

  const { mutateAsync, isLoading } = useMutation(
    postItemImgs(imgFiles.map((v) => v.file))
  );

  return {
    uploadItemImgsMutateAsync: mutateAsync,
    isUploadItemImgsLoading: isLoading,
  };
};
