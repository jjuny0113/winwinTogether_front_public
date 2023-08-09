import axios, { AxiosResponse } from "axios";
import {
  PromiseResult,
  SuccessResponseWithMessage,
} from "@/util/reactQuery/types";
import { dev, prod } from "@/util/reactQuery/graphQLClient";
export const postMarketInfoImgs =
  (imgFiles: File[]) => async (marketId: number) => {
    const formData = new FormData();

    imgFiles.forEach((file) => {
      formData.append("files", file);
    });

    const data: AxiosResponse<PromiseResult<SuccessResponseWithMessage>> =
      await axios.post(
        `${process.env.NODE_ENV === "development" ? dev : prod}/img-upload/market_imgs/${marketId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    return data.data;
  };
