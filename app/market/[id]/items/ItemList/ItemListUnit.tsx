"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { putColonPrice } from "@/util/putColonPrice";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import Icon from "@/components/Icon/Icon";
import { FaRegImage } from "react-icons/fa6";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

interface ItemListUnitProps {
  id: number;
  imgUrl: string;
  itemName: string;
  price: number;
}

const ItemListUnit = ({ id, imgUrl, itemName, price }: ItemListUnitProps) => {
  const router = useRouter();

  const param = useParams() as {
    id: string;
  };
  const onEntireLoading = useOnEntireLoading();
  return (
    <section
      className="flex flex-col items-center"
      onClick={() => {
        onEntireLoading();
        router.push(`market/${param.id}/items/${id}`);
      }}
    >
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={itemName}
          width={140}
          height={140}
          className="w-[140px] h-[140px] rounded-xl"
          priority={false}
        />
      ) : (
        <div className="w-[140px] h-[140px] rounded-xl bg-monoGray3 flex justify-center items-center">
          <FaRegImage size={30} />
        </div>
      )}

      <summary className="flex flex-col px-5  py-3 w-full">
        <p className="text-[12px] leading-[14px] text-monoGray6">{itemName}</p>
        <p className="text-[14px] leading-[20px] font-bold text-monoGray6">
          {putColonPrice(price)}
        </p>
      </summary>
    </section>
  );
};

export default ItemListUnit;
