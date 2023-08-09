"use client";
import Header from "@/components/Header";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import React, { useEffect } from "react";
import { useGetItemsWithUserInfo } from "../../hooks/query/useGetItemsWithUserInfo";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import { handlingWordiness } from "@/util/handlingWordiness";
import { putColonPrice } from "@/util/putColonPrice";
import Icon from "@/components/Icon/Icon";
import { useChatStore } from "../../hooks/zustand/useChatStore";
import { useProductStore } from "../../hooks/zustand/useProductStore";

interface ProductSelectorProps {
  backFunc: () => void;
}

const ProductSelector = ({ backFunc }: ProductSelectorProps) => {
  const { setState } = useChatStore((state) => ({
    setState: state.setState,
  }));
  const { setProductState } = useProductStore((state) => ({
    setProductState: state.setState,
  }));
  const { data, isLoading } = useGetItemsWithUserInfo();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isLoading || !data) {
    return (
      <PageWrapper>
        <div className="flex flex-col gap-4 items-center justify-center h-full ">
          <LongTimeLoader />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper header={<Header backFunc={backFunc} title="옵션 선택" />}>
      <div className="flex flex-col gap-2 px-3 pt-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex gap-5 py-2"
            onClick={() => {
              setProductState("itemId", item.id);
              setState("selectorType", "");
              setProductState("select", "item");
            }}
          >
            {item.market_item_imgs[0] ? (
              <Image
                src={item.market_item_imgs[0].url}
                alt={item.name}
                width={120}
                height={120}
                className="rounded-2xl min-w-[120px] max-h-[120px]"
              />
            ) : (
              <div className="min-w-[120px] max-h-[120px] rounded-xl bg-monoGray3 flex justify-center items-center">
                <Icon type="camera" />
              </div>
            )}
            <div className="flex flex-col gap-3 w-full py-2">
              <p className="text-monoGray6 text-base font-semibold">
                {handlingWordiness(item.name, 18)}
              </p>
              <p className="text-monoGray6 text-sm">
                {putColonPrice(item.price)}
              </p>
              <p className="text-monoGray6 text-sm">
                {handlingWordiness(item.description, 46)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default ProductSelector;
