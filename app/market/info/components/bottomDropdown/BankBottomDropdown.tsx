import BottomModal from "@/components/Modal/BottomModal";
import React from "react";
import { BankListType, ListType, banks } from "../../constants";
import Image from "next/image";

interface IBankBottomDropdown {
  isBottomModalOpen: boolean;
  setIsBottomModalOpen?: (isOpen?: boolean) => void;
  onValueClick: (bank: BankListType) => void;
  selectedValue: BankListType;
  resetValue: () => void;
}

const BankBottomDropdown = ({
  isBottomModalOpen,
  setIsBottomModalOpen,
  onValueClick,
  selectedValue,
  resetValue,
}: IBankBottomDropdown) => {
  return (
    <BottomModal
      isOpen={isBottomModalOpen}
      onClose={() => {
        if (setIsBottomModalOpen) {
          setIsBottomModalOpen(false);
        }
      }}
    >
      <div className="h-[59px] flex items-center px-[30px] justify-between">
        <p className="text-[14px] leading-[20px] text-black">주 거래 은행</p>
        {selectedValue && (
          <p className="text-xs text-purpleMain" onClick={resetValue}>
            초기화
          </p>
        )}
      </div>
      <div className="grid grid-cols-3 overflow-auto border-t px-[11px] py-[13px] border-[#d0d0d0]">
        {banks.map(({ icon, name }) => (
          <div
            key={name}
            className="pl-[10px] flex gap-2 h-[45px] items-center"
            onClick={() => {
              onValueClick(name);
            }}
          >
            <Image
              src={`/bank/${icon}.png`}
              width={20}
              height={20}
              alt={name}
              style={{
                height: "20px",
              }}
            />
            <p className="text-monoGray4 text-[11px]">{name}</p>
          </div>
        ))}
      </div>
    </BottomModal>
  );
};

export default BankBottomDropdown;
