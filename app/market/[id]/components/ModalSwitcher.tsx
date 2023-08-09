"use client";
import React from "react";
import { useMarketInfoStore } from "../hook/zustand/useMarketInfoStore";
import { shallow } from "zustand/shallow";
import ShareBottomModal from "./ShareBottomModal";
import { writeClipboardText } from "@/util/writeClipboardText";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

export interface ModalSwitcherProps {
  marketImgs: {
    id: number;
    url: string;
  }[];
  marketDescription?: string;
  marketName?: string;
}

const ModalSwitcher = ({
  marketImgs,
  marketDescription,
  marketName,
}: ModalSwitcherProps) => {
  const pathname = usePathname();
  const { modalType, setState } = useMarketInfoStore(
    (state) => ({
      modalType: state.modalType,
      setState: state.setState,
    }),
    shallow
  );
  const modalControl = (() => {
    const mapper = new Map<typeof modalType, JSX.Element>([
      [
        "marketUrl",
        <ShareBottomModal
          key="marketUrl"
          imgUrls={marketImgs.map((v) => v.url)}
          isBottomModalOpen={modalType === "marketUrl"}
          onClose={() => {
            setState("modalType", "");
          }}
          marketDescription={marketDescription}
          marketName={marketName}
          title="url을 공유해서 마켓을 홍보해보세요"
          onShareButtonClick={async () => {
            await writeClipboardText(
              `https://www.winwin-together.com${pathname}`
            );
            useMarketInfoStore.getState().setState("modalType", "");
            toast("url 주소가 복사되었습니다.");
          }}
        />,
      ],
    ]);
    return mapper.get(modalType) ?? <></>;
  })();
  return <>{modalControl}</>;
};

export default ModalSwitcher;
