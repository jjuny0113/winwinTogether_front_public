import Button from "@/components/Button";
import React, { useCallback } from "react";
import { useDeleteItem } from "../hooks/query/useDeleteItem";
import { useParams, useRouter } from "next/navigation";
import { useMarketInfoStore } from "../../hook/zustand/useMarketInfoStore";
import { useQueryClient } from "@tanstack/react-query";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
const DeleteItemButton = () => {
  const { isLoading, mutateAsync } = useDeleteItem();
  const param = useParams() as {
    id: string;
    itemId: string;
  };
  const router = useRouter();
  const invalidateQueries = useInvalidateQueries();
  const onEntireLoading = useOnEntireLoading();
  const handleDeleteButtonClick = useCallback(async () => {
    onEntireLoading();
    await mutateAsync(Number(param.itemId));
    await invalidateQueries([QUERY_KEYS.ITEMS, QUERY_KEYS.ITEM_WITH_USER_INFO]);
    router.push(`/market/${param.id}`);
    router.refresh();
    useMarketInfoStore.getState().setState("tab", "상품");
  }, [
    invalidateQueries,
    mutateAsync,
    onEntireLoading,
    param.id,
    param.itemId,
    router,
  ]);
  return (
    <div className="px-5 pb-5 flex justify-center">
      <Button
        variant="danger"
        size="small"
        isLoading={isLoading}
        onClick={handleDeleteButtonClick}
      >
        아이템 삭제
      </Button>
    </div>
  );
};

export default DeleteItemButton;
