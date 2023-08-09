import { useMutation } from "@tanstack/react-query";
import { deleteItem } from "./deleteItem";

export const useDeleteItem = () => {
  const { mutateAsync, isLoading } = useMutation(deleteItem);
  return {
    mutateAsync,
    isLoading,
  };
};
