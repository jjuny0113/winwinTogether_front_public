import { shallow } from "zustand/shallow";
import { useMarketInfoStore } from "../zustand/useMarketInfoStore";
import { gql } from "graphql-request";
import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation } from "@tanstack/react-query";

export const useUpdateMarketImgs = () => {
  const { imgUrls, imgFiles, originImgUrls } = useMarketInfoStore(
    (state) => ({
      imgUrls: state.imgUrls,
      imgFiles: state.imgFiles,
      originImgUrls: state.originImgUrls,
    }),
    shallow
  );

  const updateMarketImg = async () => {
    const data = originImgUrls.filter(
      (url) => !imgUrls.map((v) => v.url).includes(url.url)
    );

    const query = gql`
      mutation deleteMarketImgs($ids: [Int]!) {
        deleteMarketImgs(ids: $ids) {
          status
          message
        }
      }
    `;
    const variables = {
      ids: data.map((v) => v.id),
    };
    const result: SuccessUpdateMarketImgs | ErrorUpdateMarketImgs =
      await getGraphQLClient.request(query, variables);
    return result;
  };

  const { mutateAsync, isLoading } = useMutation(updateMarketImg);
  return {
    updateMarketImgsAsyncMutation: mutateAsync,
    isMarketImgsLoading: isLoading,
  };
};

interface SuccessUpdateMarketImgs {
  deleteMarketImgs: {
    status: "ok";
    message: string;
  };
}

interface ErrorUpdateMarketImgs {
  deleteMarketImgs: {
    status: "error";
    message: string;
  };
}
