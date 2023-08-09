import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import React from "react";
import { useForm } from "react-hook-form";
import { shallow } from "zustand/shallow";
import ChatWrapper from "../../ChatWrapper/ChatWrapper";
import ChatText from "../../ChatText";
import Input from "@/components/Input/Input";
import { useProductStore } from "@/app/chat/hooks/zustand/useProductStore";
import { useScollDown } from "@/app/chat/hooks/useScollDown";
import { useGetItems } from "@/app/market/[id]/items/hooks/query/useGetItems";
import { useGetItemsWithUserInfo } from "@/app/chat/hooks/query/useGetItemsWithUserInfo";
import Button from "@/components/Button";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/app/common/user/useGetUser";
import { useMarketInfoStore } from "@/app/market/[id]/hook/zustand/useMarketInfoStore";
import ReSelectorButton from "../../ReSelectorButton";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

const ProductSelector = () => {
  const { contentType, setState } = useChatStore(
    (state) => ({
      contentType: state.contentType,
      setState: state.setState,
    }),
    shallow
  );

  const { itemId } = useProductStore((state) => ({
    itemId: state.itemId,
  }));
  const router = useRouter();
  const { register, watch } = useForm<{
    product: string;
  }>();
  const user = useGetUser();
  const { data, isLoading } = useGetItemsWithUserInfo();
  useScollDown(contentType === "PRODUCT", "productSelector");
  const onEntireLoading = useOnEntireLoading();
  const product = watch("product");
  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow={contentType === "PRODUCT"}
        className="productSelector"
      >
        {isLoading ? (
          <LongTimeLoader />
        ) : data?.length === 0 ? (
          <>
            <ChatText comment="등록된 상품이 없어요. 상품을 등록해주세요" />
          </>
        ) : (
          <ChatText comment="등록된 상품을 선택해주세요" />
        )}
      </ChatWrapper>
      <ChatWrapper
        avatar={{
          position: "right",
        }}
        isShow={contentType === "PRODUCT"}
      >
        {data?.length === 0 ? (
          <Button
            size="medium"
            variant="primary"
            onClick={() => {
              if (!user?.market_id) return; //에러처리
              onEntireLoading();
              router.push(
                `/market/${user?.market_id}/items/item_register?chat=true`
              );
            }}
          >
            상품 등록하러 가기
          </Button>
        ) : (
          <Input
            placeholder="상품을 선택해주세요."
            register={register("product")}
            disable
            onClick={() => {
              if (itemId) {
                return;
              }
              setState("selectorType", "product");
            }}
            mode={product ? "input" : "dropdown"}
            width="220"
            height="46"
          />
        )}
        <ReSelectorButton
          onClick={() => {
            setState("contentType", "");
          }}
        />
      </ChatWrapper>
    </>
  );
};

export default ProductSelector;
