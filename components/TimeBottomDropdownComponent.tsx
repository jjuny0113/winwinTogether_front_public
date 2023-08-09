"use client";
import React, { useEffect, useRef } from "react";
import BottomModal from "./Modal/BottomModal";
import { TimeBottomDropdownProps } from "@/app/market/info/components/bottomDropdown/TimeBottomDropdown";
import Toggle from "./Toggle";
import Button from "./Button";
import useOutsideAlerter from "@/util/useOutsideAlerter";
import Dot from "@/components/Icon/svg/dot.svg";
import { EditInfoStoreInitState } from "@/app/market/info/edit/hooks/zustand/useEditInfoStore";

interface TimeBottomDropdownComponentProps extends TimeBottomDropdownProps {
  handleCloseModal: () => void;
  operationTime: {
    day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
    isOperate: boolean;
    time: {
      open: string;
      close: string;
    };
  }[];
  setOperationTime: (
    status: "open" | "close",
    index: number
  ) => (value: string) => void;
  setOperationTimeIsOperate: (index: number, operationTime: boolean) => void;
  handleCancelButtonClick: () => void;
  setOperationTimeStatusAble: (
    openValue: string,
    closeValue: string
  ) => () => void;
}

const TimeBottomDropdownComponent = ({
  handleCloseModal,
  operationTime,
  setOperationTime,
  setOperationTimeIsOperate,
  handleCancelButtonClick,
  setOperationTimeStatusAble,
  isBottomModalOpen,
  setIsBottomModalOpen,
}: TimeBottomDropdownComponentProps) => {
  return (
    <BottomModal
      isOpen={isBottomModalOpen}
      onClose={() => {
        if (setIsBottomModalOpen) {
          setIsBottomModalOpen(false);
        }
      }}
    >
      <div className="h-[59px] flex items-center text-monoGray5 justify-center">
        <div className="w-[68px] h-[56px] flex justify-center items-center">
          요일
        </div>
        <div className="w-[94px] h-[56px] flex justify-center items-center">
          휴무/영업
        </div>
        <div className="w-[180px] h-[56px] flex justify-center items-center">
          영업시간
        </div>
      </div>
      <div className="flex flex-col border-t border-[#d0d0d0] text-monoGray5 justify-center">
        {operationTime.map(
          ({ day, isOperate, time: { open, close } }, index) => (
            <div key={day} className="flex text-monoGray5 justify-center">
              <div className="w-[68px] h-[56px] flex justify-center items-center text-monoGray5 text-[14px]">
                {day}
              </div>
              <div className="w-[94px] h-[56px] flex justify-center items-center text-monoGray5">
                <Toggle
                  isOn={isOperate}
                  onClick={() => {
                    setOperationTimeIsOperate(index, !isOperate);
                  }}
                />
              </div>

              <TimeSelector
                openValue={open}
                closeValue={close}
                onOpenChange={setOperationTime("open", index)}
                onCloseChange={setOperationTime("close", index)}
                disable={!isOperate}
                setOperationTimeStatusAble={setOperationTimeStatusAble(
                  open,
                  close
                )}
              />
            </div>
          )
        )}
        <div className="flex gap-6 justify-center h-[62px] items-center">
          <Button
            size="x-small"
            variant="primary"
            onClick={() => {
              handleCancelButtonClick();
            }}
          >
            취소
          </Button>
          <Button
            size="x-small"
            variant="primary"
            onClick={handleCloseModal}
            disable={
              operationTime
                .map((operation) => operation.time.open)
                .filter((v) => v).length === 0 ||
              operationTime
                .map((operation) => operation.time.close)
                .filter((v) => v).length === 0
            }
          >
            확인
          </Button>
        </div>
      </div>
    </BottomModal>
  );
};

function TimeSelector({
  openValue,
  closeValue,
  onOpenChange,
  onCloseChange,
  disable,
  setOperationTimeStatusAble,
}: {
  openValue: string;
  closeValue: string;
  onOpenChange: (value: string) => void;
  onCloseChange: (value: string) => void;
  disable: boolean;
  setOperationTimeStatusAble: () => void;
}) {
  // 전부 value가 없을 때 openvalue, closevalue 가 다 차면 disable 제외하고 value를 채운다

  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    setOperationTimeStatusAble();
  });
  useEffect(() => {
    if (disable) {
      onOpenChange("");
      onCloseChange("");
    }
  }, [disable, onCloseChange, onOpenChange]);

  return (
    <form
      className="w-[180px] h-[56px] flex justify-center items-center text-monoGray5 gap-1"
      ref={ref}
    >
      <input
        value={openValue}
        onChange={(e) => {
          onOpenChange(e.target.value);
        }}
        className={`w-[77px] h-[28px] text-[14px] text-center ${
          disable ? "text-monoGray2" : "text-monoGray5 "
        }`}
        type="time"
        disabled={disable}
      />
      <Dot />
      <input
        value={closeValue}
        onChange={(e) => {
          onCloseChange(e.target.value);
        }}
        className={`w-[77px] h-[28px] text-[14px] text-center ${
          disable ? "text-monoGray2" : "text-monoGray5 "
        }`}
        type="time"
        disabled={disable}
      />
    </form>
  );
}

export default TimeBottomDropdownComponent;
