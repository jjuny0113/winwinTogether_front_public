import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useEditItemStore } from "../../edit/hook/zustand/useEditItemStore";
import { shallow } from "zustand/shallow";
import { gql } from "graphql-request";
import { useMutation } from "@tanstack/react-query";
export const useDeleteItemImgs = () => {
  const { imgUrls, imgFiles, originImgUrls } = useEditItemStore(
    (state) => ({
      imgUrls: state.imgUrls,
      imgFiles: state.imgFiles,
      originImgUrls: state.originImgUrls,
    }),
    shallow
  );

  const deleteItemImgs = async () => {
    const data = originImgUrls.filter(
      (url) => !imgUrls.map((v) => v.url).includes(url.url)
    );

    const query = gql`
      mutation deleteItemImgs($ids: [Int]!) {
        deleteItemImgs(ids: $ids) {
          status
          message
        }
      }
    `;
    const variables = {
      ids: data.map((v) => v.id),
    };
    return await getGraphQLClient.request(query, variables);
  };

  const { mutateAsync, isLoading } = useMutation(deleteItemImgs);
  return {
    deleteItemImgsAsyncMutation: mutateAsync,
    isItemImgLoading: isLoading,
  };
};
