"use client";
import Button from "@/components/Button";
import BottomModal from "@/components/Modal/BottomModal";
import React, { useEffect, useState } from "react";

type TargetAgeType =
  | "10대 ~ 20대"
  | "20대 ~ 30대"
  | "30대 ~ 40대"
  | "40대 ~ 50대"
  | "60대 이상";
interface IMainTargetBottomDropdown {
  isBottomModalOpen: boolean;
  mainTarget: string;
  setIsBottomModalOpen?: (isOpen?: boolean) => void;
  handleSubmit: (value: string) => void;
}

const MainTargetBottomDropdown = ({
  isBottomModalOpen,
  mainTarget,
  setIsBottomModalOpen,
  handleSubmit,
}: IMainTargetBottomDropdown) => {
  const [selectedSex, setSelectedSex] = useState<("남성" | "여성")[]>([]);
  const [selcetedAges, setSelectedAges] = useState<TargetAgeType[]>([]);
  const handleCheckButtonClick = () => {
    if (selectedSex.length === 0 && selcetedAges.length === 0) {
      return;
    }
    const sortedSelectedAges = selcetedAges.sort(
      (a, b) => Number(a.substring(0, 2)) - Number(b.substring(0, 2))
    );
    handleSubmit(`${selectedSex.join(", ")} - ${sortedSelectedAges.join(", ")}`);
    if (setIsBottomModalOpen) {
      setIsBottomModalOpen(false);
    }
  };
  useEffect(() => {
    const [sex, age] = mainTarget.split("-");

    setSelectedSex(
      sex
        ? selectedSex.concat(
            sex.split(",").map((v) => v.trim()) as ("남성" | "여성")[]
          )
        : []
    );
    setSelectedAges(
      age
        ? selcetedAges.concat(
            age.split(",").map((v) => v.trim()) as TargetAgeType[]
          )
        : []
    );
  }, [mainTarget]);

  return (
    <BottomModal
      isOpen={isBottomModalOpen}
      onClose={() => {
        if (setIsBottomModalOpen) {
          setIsBottomModalOpen(false);
        }
      }}
    >
      <div className="flex flex-col gap-3 pt-12 pb-6 px-6">
        <div className="flex gap-[6px]">
          {(["남성", "여성"] as ("남성" | "여성")[]).map((v) => (
            <div
              key={v}
              className={`${
                selectedSex.includes(v)
                  ? "bg-purpleLightActive border border-purpleMain"
                  : "bg-monoGray2"
              } flex-[1]  rounded-2xl flex justify-center items-center h-[48px]`}
              onClick={() => {
                if (selectedSex.includes(v)) {
                  setSelectedSex(selectedSex.filter((sex) => sex !== v));
                } else {
                  setSelectedSex(selectedSex.concat([v]));
                }
              }}
            >
              <p className="text-[14px] leading-[20px] text-black">{v}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col  rounded-2xl bg-monoGray2">
          {(
            [
              "10대 ~ 20대",
              "20대 ~ 30대",
              "30대 ~ 40대",
              "40대 ~ 50대",
              "60대 이상",
            ] as TargetAgeType[]
          ).map((v) => (
            <div
              key={v}
              className={`${
                selcetedAges.includes(v)
                  ? "bg-purpleLightActive"
                  : "bg-monoGray2"
              } flex justify-center border-b border-monoGray3 last:border-none py-[15px] px-[48px] first:rounded-t-2xl last:rounded-b-2xl`}
              onClick={() => {
                if (selcetedAges.includes(v)) {
                  setSelectedAges(selcetedAges.filter((age) => age !== v));
                } else {
                  setSelectedAges(selcetedAges.concat(v));
                }
              }}
            >
              <p className="text-center text-[14px] leading-[17px] text-black flex-[1]">
                {v}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-6 justify-end h-[62px] items-center pr-[46px]">
          <Button
            size="x-small"
            variant="primary"
            onClick={() => {
              if (setIsBottomModalOpen) {
                setIsBottomModalOpen(false);
              }
            }}
          >
            취소
          </Button>
          <Button
            size="x-small"
            variant="primary"
            onClick={handleCheckButtonClick}
            disable={!(selectedSex.length > 0 && selcetedAges.length > 0)}
          >
            확인
          </Button>
        </div>
      </div>
    </BottomModal>
  );
};

export default MainTargetBottomDropdown;
