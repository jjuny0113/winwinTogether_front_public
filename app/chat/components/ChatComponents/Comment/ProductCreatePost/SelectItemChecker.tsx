import React, { useMemo } from "react";
import ChatWrapper from "../../ChatWrapper/ChatWrapper";
import { useGetItemsWithUserInfo } from "@/app/chat/hooks/query/useGetItemsWithUserInfo";
import ChatText from "../../ChatText";
import { useProductStore } from "@/app/chat/hooks/zustand/useProductStore";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import Image from "next/image";
import Button from "@/components/Button";
import Icon from "@/components/Icon/Icon";
import { handlingWordiness } from "@/util/handlingWordiness";
import { putColonPrice } from "@/util/putColonPrice";
import { useCreateProductPost } from "@/app/chat/hooks/query/useCreateProductPost";
import ReSelectorButton from "../../ReSelectorButton";

const SelectItemChecker = () => {
  const { data, isLoading } = useGetItemsWithUserInfo();
  const { select, setState, itemId, isGenerate } = useProductStore((state) => ({
    select: state.select,
    setState: state.setState,
    itemId: state.itemId,
    isGenerate: state.isGenerate,
  }));

  const itemInfo = useMemo(() => {
    if (!itemId || !data) return;
    return data.find((v) => v.id === itemId);
  }, [data, itemId]);
  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow={select === "item"}
        className="descriptionProduce"
      >
        {isLoading && !itemInfo && select === "item" ? (
          <LongTimeLoader />
        ) : (
          <>
            <ChatText comment="이 상품으로 콘텐츠를 생성할까요?" />
            <div className="flex gap-3 shadow-2xl rounded-2xl p-2">
              {itemInfo?.market_item_imgs[0].url ? (
                <Image
                  src={itemInfo?.market_item_imgs[0].url ?? ""}
                  alt={itemInfo?.name ?? ""}
                  width={72}
                  height={72}
                  className="min-w-[72px] h-[72px] rounded-2xl"
                />
              ) : (
                <div className="min-w-[72px] h-[72px] bg-monoGray4 flex justify-center items-center rounded-2xl">
                  <Icon type="camera" />
                </div>
              )}
              <div className="flex flex-col gap-1 py-1 ">
                <p className="text-sm text-monoGray6 font-semibold">
                  {handlingWordiness(itemInfo?.name ?? "", 15)}
                </p>
                <p className="text-xs text-monoGray6">
                  {putColonPrice(itemInfo?.price ?? 0)}
                </p>
                <p className="text-xs text-monoGray6">
                  {handlingWordiness(itemInfo?.description ?? "", 18)}
                </p>
              </div>
            </div>
          </>
        )}
      </ChatWrapper>
      <ChatWrapper
        avatar={{
          position: "right",
        }}
        isShow={select === "item"}
      >
        <Button
          size="medium"
          variant="primary"
          onClick={(e) => {
            if (isGenerate) {
              return;
            }
            setState("isGenerate", true);
          }}
        >
          네! 만들어주세요
        </Button>
        <Button
          size="medium"
          variant="primary"
          disable={isGenerate}
          onClick={(e) => {
            setState("itemId", null);
            setState("select", "");
          }}
        >
          아니요! 다시 선택할께요
        </Button>
      </ChatWrapper>
    </>
  );
};

export default SelectItemChecker;
