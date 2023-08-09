import BottomModal from "@/components/Modal/BottomModal";
import React, { useRef } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { useEditInfoStore } from "../../edit/hooks/zustand/useEditInfoStore";
import { useOutsideAlerter } from "@/util/useOutsideAlerter";

interface AddressModalProps {
  isBottomModalOpen: boolean;
  setIsBottomModalOpen: () => void;
  mainAddressSetter: (value: string) => void;
}

const AddressModal = ({
  isBottomModalOpen,
  setIsBottomModalOpen,
  mainAddressSetter,
}: AddressModalProps) => {
  const ref = useRef(null);
  const handleAddress1Click = (data: Address) => {
    if (data.addressType === "R") {
      let fullAddress = data.address;
      let extraAddress = "";

      if (data.bname !== "") {
        extraAddress += data.bname;
      }

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      mainAddressSetter(fullAddress);
      useEditInfoStore.getState().setState("modalType", "");
      return;
    }
    if (data.addressType === "J") {
      let fullAddress =
        data.autoRoadAddress === "" ? data.roadAddress : data.autoRoadAddress;
      let extraAddress = "";

      if (data.bname !== "") {
        extraAddress += data.bname;
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        mainAddressSetter(fullAddress);
        useEditInfoStore.getState().setState("modalType", "");
        return;
      }
    }
  };
  useOutsideAlerter(ref, () => {
    setIsBottomModalOpen();
  });
  return (
    <BottomModal
      isOpen={isBottomModalOpen}
      onClose={() => {
        setIsBottomModalOpen();
      }}
    >
      <div className="pt-3" ref={ref}>
        <DaumPostcodeEmbed onComplete={handleAddress1Click} />
      </div>
    </BottomModal>
  );
};

export default AddressModal;
