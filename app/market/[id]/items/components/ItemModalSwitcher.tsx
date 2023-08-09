import React, { useCallback } from "react";
import { useItemsStore } from "../[itemId]/hooks/zustand/useItemsStore";
import { QueryItemSuccessResponse } from "../hooks/query/getItem";
import ShareBottomModal from "../../components/ShareBottomModal";
import { writeClipboardText } from "@/util/writeClipboardText";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

export interface ItemModalSwitcherProps {
  item: QueryItemSuccessResponse["item"]["result"];
}
const ItemModalSwitcher = ({ item }: ItemModalSwitcherProps) => {
  const { modalType, setState } = useItemsStore((state) => ({
    modalType: state.modalType,
    setState: state.setState,
  }));
  const pathname = usePathname();

  const handleShareButtonClick = useCallback(async () => {
    await writeClipboardText(`https://www.winwin-together.com${pathname}`);
    setState("modalType", "");
    toast("url 주소가 복사되었습니다.");
  }, [pathname, setState]);
  const modalControl = (() => {
    const mapper = new Map<typeof modalType, JSX.Element>([
      [
        "share",
        <ShareBottomModal
          key="marketUrl"
          imgUrls={item.market_item_imgs.map((v) => v.url)}
          isBottomModalOpen={modalType === "share"}
          onClose={() => {
            setState("modalType", "");
          }}
          marketDescription={item.description}
          marketName={item.name}
          title="url을 공유해서 마켓을 홍보해보세요"
          onShareButtonClick={handleShareButtonClick}
        />,
      ],
    ]);
    return mapper.get(modalType) ?? <></>;
  })();
  return <>{modalControl}</>;
};

export default ItemModalSwitcher;
