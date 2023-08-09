"use client";
import React from "react";
import PageWrapper from "@/components/PageWrapper";
import { useEditItemStore } from "./hook/zustand/useEditItemStore";
import { shallow } from "zustand/shallow";
import ItemImgUpload from "./components/ItemImgUpload";
import EditMarketItemInfo from "./components/EditMarketInfo";
const ItemEditComponent = () => {
  const { type } = useEditItemStore(
    (state) => ({
      type: state.type,
    }),
    shallow
  );
  const showComponent = (() => {
    switch (type) {
      case "itemImg":
        return <ItemImgUpload />;
      case "list":
        return <EditMarketItemInfo />;
      default:
        return <EditMarketItemInfo />;
    }
  })();
  return <PageWrapper>{showComponent}</PageWrapper>;
};

export default ItemEditComponent;
