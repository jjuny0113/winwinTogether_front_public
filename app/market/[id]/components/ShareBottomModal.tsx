"use client";
import BottomModal from "@/components/Modal/BottomModal";
import React from "react";
import ShareUrlExampleComponent from "../../components/ShareUrlExampleComponent";
import Button from "@/components/Button";


interface ShareBottomModalProps {
  isBottomModalOpen: boolean;
  onClose: () => void;
  onShareButtonClick: () => void;
  imgUrls: string[];
  marketName?: string;
  marketDescription?: string;
  title: string;
}

const ShareBottomModal = ({
  isBottomModalOpen,
  onClose,
  imgUrls,
  marketName = "마켓이름",
  marketDescription = "마켓소개",
  onShareButtonClick,
  title,
}: ShareBottomModalProps) => {
  return (
    <BottomModal isOpen={isBottomModalOpen} onClose={onClose}>
      <div className="pt-10">
        <p className="text-lg text-purpleMain font-semibold pl-5">{title}</p>
        <ShareUrlExampleComponent
          message={""}
          mainImg={imgUrls[0]}
          title={marketName}
          subTitle={marketDescription}
        >
          <div className="pb-6">
            <Button variant="primary" size="large" onClick={onShareButtonClick}>
              url 복사
            </Button>
          </div>
        </ShareUrlExampleComponent>
      </div>
    </BottomModal>
  );
};

export default ShareBottomModal;
