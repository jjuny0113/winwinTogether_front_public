"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import EmptyValue from "./EmptyValue";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

const AddProduct = () => {
  const router = useRouter();
  const pathname = usePathname();
  const onEntireLoading = useOnEntireLoading();
  return (
    <EmptyValue
      title="물품을 등록해보세요"
      descArr={[
        "인스타 문구를 만들 때 사용돼요!!",
        "url을 통해서 가게를 홍보할 때 사용돼요!!",
      ]}
      buttonName="🖋️ 물품 등록하러 가기"
      onButtonClick={() => {
        onEntireLoading();
        router.push(`${pathname}/items/item_register`);
      }}
    />
  );
};

export default AddProduct;
