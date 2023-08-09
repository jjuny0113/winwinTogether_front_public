import { useEffect, useState } from "react";
import { useEditInfoStore } from "../zustand/useEditInfoStore";

export const useEditTimeBottonDropdownHandler = () => {
  const {
    modalType,
    setState,
    setOperationTimeIsOperate,
    operationTime,
    setOperationTime,
  } = useEditInfoStore((state) => ({
    modalType: state.modalType,
    operationTime: state.operationTime,
    setOperationTime: state.setOperationTime,
    setOperationTimeIsOperate: state.setOperationTimeIsOperate,
    setState: state.setState,
  }));

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
    setState("modalType", "");
    setState("editType", "list");
    setState("operationTime", dupOperationTime);
  };

  const handleCloseModal = () => {
    setState("modalType", "");
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
