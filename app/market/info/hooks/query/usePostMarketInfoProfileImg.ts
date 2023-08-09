import { dev, prod } from "@/util/reactQuery/graphQLClient";
import {
  PromiseResult,
  SuccessResponseWithMessage,
} from "@/util/reactQuery/types";
import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";

export const usePostMarketInfoProfileImg = (profileImgFile: File | null) => {
  const result = useCallback(async () => {
    const formData = new FormData();
    if (!profileImgFile) return;

    formData.append("file", profileImgFile);
    const data: AxiosResponse<PromiseResult<SuccessResponseWithMessage>> =
      await axios.post(`${process.env.NODE_ENV === "development" ? dev : prod}/img-upload/profile`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    return data.data;
  }, [profileImgFile]);

  return result;
};
