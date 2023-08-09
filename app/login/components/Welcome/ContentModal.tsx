import BottomModal from "@/components/Modal/BottomModal";
import React, { useState } from "react";
import { useLogin } from "../../hooks/zustand/useLogin";
import ContentChecker from "@/components/Icon/svg/contentChecker.svg";
import CheckBox from "@/components/CheckBox";
import { shallow } from "zustand/shallow";
import Button from "@/components/Button";
import { useContentModalHandler } from "../../hooks/handler/useContentModalHandler";

const ContentModal = () => {
  const {
    isContentModalOpen,
    contents,
    handleOkButtonClick,
    isActiveButton,
    handleCloseModal,
  } = useContentModalHandler();

  return (
    <BottomModal isOpen={isContentModalOpen} onClose={handleCloseModal}>
      <div className="flex flex-col items-center gap-[34px] px-14 pt-[60px] pb-[24px] ">
        <div className="flex flex-col gap-[53px] items-center ">
          <ContentChecker />
          <div className="flex flex-col gap-3 items-center">
            <p className="text-[33px] text-purpleMain font-extrabold">
              필수 동의 체크
            </p>
            <p className="text-center text-[16px] font-medium text-black">
              더 나은 서비스를 위해
              <br />
              필수 동의 사항을 체크해주세요!
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {contents.map(({ isCheck, onClick, contentValue, onPtagClick }) => (
            <div className="flex items-center gap-3" key={contentValue[0]}>
              <CheckBox isCheck={isCheck} onClick={onClick} />
              <div>
                {contentValue.map((v) => (
                  <p
                    className="text-monoGray3 text-[12px] leading-[14px]"
                    onClick={() => {
                      if (onPtagClick) {
                        onPtagClick();
                      }
                    }}
                    key={`2-${v}`}
                  >
                    {v}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="primary"
          size="small"
          isLoading={false}
          onClick={handleOkButtonClick}
          disable={!isActiveButton}
        >
          확인
        </Button>
      </div>
    </BottomModal>
  );
};

export default ContentModal;
