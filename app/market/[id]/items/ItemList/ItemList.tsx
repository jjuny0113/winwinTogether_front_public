"use client";
import React from "react";
import ItemListUnit from "./ItemListUnit";
import withAsyncError from "@/util/reactQuery/withAsyncError";
import Loader from "@/components/Loader";
import { useGetItems } from "../hooks/query/useGetItems";
import { useParams } from "next/navigation";

interface ItemListProps {
  id?: number;
}

const ItemList = ({ id }: ItemListProps) => {
  const data = useGetItems();

  if (!data) {
    return <></>;
  }
  return (
    <div className="grid grid-cols-2 mt-5">
      {(id ? data.filter((v) => v.id !== id) : data).map((item) => (
        <ItemListUnit
          key={item.id}
          id={item.id}
          imgUrl={item.market_item_imgs[0]?.url}
          price={item.price}
          itemName={item.name}
        />
      ))}
    </div>
  );
};

export default ItemList;

export interface MarketListItems {
  id: number;
  name: string;
  price: number;
  item_img: string;
}
