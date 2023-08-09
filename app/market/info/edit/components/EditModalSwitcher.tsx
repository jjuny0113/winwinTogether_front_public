import React from "react";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import BankBottomDropdown from "../../components/bottomDropdown/BankBottomDropdown";
import { BankListType } from "../../constants";
import MainTargetBottomDropdown from "../../components/bottomDropdown/MainTargetBottomDropdown";
import TimeBottomDropdown from "../../components/bottomDropdown/TimeBottomDropdown";
import EditTimeBottomDropdown from "./EditTimeBottomDropdown";
import AddressModal from "../../components/bottomDropdown/AddressModal";

const EditModalSwitcher = () => {
  const { modalType, setState, mainTarget, bank } = useEditInfoStore(
    (state) => ({
      modalType: state.modalType,
      mainTarget: state.mainTarget,
      setState: state.setState,
      bank: state.bank,
    })
  );
  switch (modalType) {
    case "mainTargetSetter":
      return (
        <MainTargetBottomDropdown
          isBottomModalOpen={modalType === "mainTargetSetter"}
          setIsBottomModalOpen={() => {
            setState("modalType", "");
          }}
          handleSubmit={(value) => {
            setState("mainTarget", value);
          }}
          mainTarget={mainTarget}
        />
      );
    case "operationTimeSetter":
      return (
        <EditTimeBottomDropdown
          isBottomModalOpen={modalType === "operationTimeSetter"}
          setIsBottomModalOpen={() => {
            setState("modalType", "");
          }}
        />
      );
    case "bankSetter":
      return (
        <BankBottomDropdown
          isBottomModalOpen={modalType === "bankSetter"}
          onValueClick={(bank: BankListType) => {
            setState("bank", bank);
            setState("modalType", "");
          }}
          setIsBottomModalOpen={() => {
            setState("modalType", "");
          }}
          selectedValue={bank as BankListType}
          resetValue={() => {
            setState("bank", "");
            setState("modalType", "");
          }}
        />
      );
    case "addressSetter":
      return (
        <AddressModal
          isBottomModalOpen={modalType === "addressSetter"}
          setIsBottomModalOpen={() => {
            setState("modalType", "");
          }}
          mainAddressSetter={(value: string) => {
            setState("mainAddress", value);
          }}
        />
      );
    default:
      return <></>;
  }
};

export default EditModalSwitcher;
