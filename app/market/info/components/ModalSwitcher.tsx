import React from "react";
import { useInfoStore } from "../hooks/zustand/useInfoStore";
import BankBottomDropdown from "./bottomDropdown/BankBottomDropdown";
import TimeBottomDropdown from "./bottomDropdown/TimeBottomDropdown";
import MainTargetBottomDropdown from "./bottomDropdown/MainTargetBottomDropdown";
import { useInstagramInputsStore } from "../hooks/zustand/useInstagramInputsStore";
import { useMarketInfoDetailStore } from "../hooks/zustand/useMarketInfoDetailStore";
import { BankListType } from "../constants";
import { useBasicStore } from "../hooks/zustand/useBasicStore";
import AddressModal from "./bottomDropdown/AddressModal";

const ModalSwitcher = () => {
  const { modalValue, setModalValue } = useInfoStore((state) => ({
    modalValue: state.modalValue,
    setModalValue: state.setModalValue,
  }));
  const { setDetailState, bank } = useMarketInfoDetailStore((state) => ({
    setDetailState: state.setDetailState,
    bank: state.detail.bank,
  }));
  const { setInstaInputsStore, mainTarget } = useInstagramInputsStore(
    (state) => ({
      setInstaInputsStore: state.setInstaInputsStore,
      mainTarget: state.mainTarget,
    })
  );
  const { setBasicStoreState } = useBasicStore((state) => ({
    setBasicStoreState: state.setBasicStoreState,
  }));
  switch (modalValue) {
    case "bank":
      return (
        <BankBottomDropdown
          isBottomModalOpen={modalValue === "bank"}
          onValueClick={(bank: BankListType) => {
            setDetailState("bank", bank);
            setModalValue("");
          }}
          setIsBottomModalOpen={() => {
            setModalValue("");
          }}
          selectedValue={bank as BankListType}
          resetValue={() => {
            setDetailState("bank", "");
            setModalValue("");
          }}
        />
      );
    case "operate":
      return (
        <TimeBottomDropdown
          isBottomModalOpen={modalValue === "operate"}
          setIsBottomModalOpen={() => {
            setModalValue("");
          }}
        />
      );
    case "target":
      return (
        <MainTargetBottomDropdown
          isBottomModalOpen={modalValue === "target"}
          setIsBottomModalOpen={() => {
            setModalValue("");
          }}
          handleSubmit={(value) => {
            setInstaInputsStore("mainTarget", value);
          }}
          mainTarget={mainTarget}
        />
      );
    case "address":
      return (
        <AddressModal
          isBottomModalOpen={modalValue === "address"}
          mainAddressSetter={(data: string) => {
            setBasicStoreState("address", data);
            setModalValue("");
          }}
          setIsBottomModalOpen={() => {
            setModalValue("");
          }}
        />
      );
    default:
      return <></>;
  }
};

export default ModalSwitcher;
