import React from "react";
import ProductSelector from "./ProductSelector";
import SelectItemChecker from "./SelectItemChecker";
import CheckProductComment from "./CheckProductComment";
import { useCreateProductPost } from "@/app/chat/hooks/query/useCreateProductPost";
import GenerateComment from "../GenerateComment";
import { useProductStore } from "@/app/chat/hooks/zustand/useProductStore";

const ProductCreatePost = () => {
  const { mutateAsync, isLoading } = useCreateProductPost();
  const { select, setState } = useProductStore((state) => ({
    select: state.select,
    setState: state.setState,
  }));
  return (
    <>
      {select === "item" ? <SelectItemChecker /> : <ProductSelector />}

      <CheckProductComment mutationAsync={mutateAsync} />
      <GenerateComment
        isLoading={isLoading}
        onRegenerateButtonClick={async () => {
          await mutateAsync();
        }}
      />
    </>
  );
};

export default ProductCreatePost;
