"use client"
import { useForm } from "react-hook-form";
import { useInfoStore } from "../zustand/useInfoStore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { useMarketInfoDetailStore } from "../zustand/useMarketInfoDetailStore";

export const useTimeBottonDropdownHandler = () => {
  const { modalValue, setModalValue } = useInfoStore(
    (state) => ({
      modalValue: state.modalValue,
      setModalValue: state.setModalValue,
    }),
    shallow
  );

  const [dupOperationTime, setDupOperationTime] = useState<
    {
      day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
      isOperate: boolean;
      time: {
        open: string;
        close: string;
      };
    }[]
  >([]);

  const {
    operationTime,
    setDetailState,
    setOperationTimeIsOperate,
    setOperationTime,
  } = useMarketInfoDetailStore(
    (state) => ({
      operationTime: state.detail.operationTime,
      setDetailState: state.setDetailState,
      setOperationTimeIsOperate: state.setOperationTimeIsOperate,
      setOperationTime: state.setOperationTime,
    }),
    shallow
  );

  const setOperationTimeStatusAble =
    (openValue: string, closeValue: string) => () => {
      if (
        operationTime.map((operation) => operation.time.open).filter((v) => v)
          .length === 1 &&
        operationTime.map((operation) => operation.time.close).filter((v) => v)
          .length === 1 &&
        openValue &&
        closeValue
      ) {
        Array(operationTime.length)
          .fill(null)
          .map((_, i) => i)
          .forEach((index) => {
            setOperationTime("open", index)(openValue);
            setOperationTime("close", index)(closeValue);
          });
      }
    };

  useEffect(() => {
    setDupOperationTime(operationTime);
  }, []);

  const handleCancelButtonClick = () => {
    setModalValue("");
    setDetailState("operationTime", dupOperationTime);
  };

  const handleCloseModal = () => {
    setModalValue("");
  };
  return {
    handleCloseModal,
    operationTime,
    setOperationTime,
    setOperationTimeIsOperate,
    handleCancelButtonClick,
    setOperationTimeStatusAble,
  };
};
