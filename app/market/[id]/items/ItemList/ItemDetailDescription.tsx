"use client";
import React from "react";
import { putColonPrice } from "@/util/putColonPrice";
import { useParams, useRouter } from "next/navigation";
import { useEditItemStore } from "../[itemId]/edit/hook/zustand/useEditItemStore";
import { FaPencil } from "react-icons/fa6";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
interface ItemDetailDescriptionProps {
  itemName: string;
  price: number;

  detail: string;
  isEdit: boolean;
}

const ItemDetailDescription = ({
  itemName,
  price,

  detail,
  isEdit,
}: ItemDetailDescriptionProps) => {
  const router = useRouter();
  const param = useParams() as {
    id: string;
    itemId: string;
  };
  const onEntireLoading = useOnEntireLoading();
  return (
    <section className="bg-white  mb-5 px-5">
      <div className="flex flex-col gap-5">
        <header className="flex gap-3 relative">
          <h1 className="text-[21px] leading-6 font-medium text-monoGray6">
            {itemName}
          </h1>
          {isEdit && (
            <div
              className="absolute top-2 right-4"
              onClick={() => {
                useEditItemStore.getState().setState("type", "list");
                onEntireLoading();
                router.push(`/market/${param.id}/items/${param.itemId}/edit`);
              }}
            >
              <FaPencil size={16} color="#A75AFF"/>
            </div>
          )}
        </header>
        <p className="text-[16px] leading-5 font-bold text-monoGray6">
          {putColonPrice(price)}원
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-lg text-monoGray6 font-medium">상품설명</p>
          <p
            className="text-base font-normal text-monoGray6"
            dangerouslySetInnerHTML={{ __html: detail }}
          ></p>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailDescription;
