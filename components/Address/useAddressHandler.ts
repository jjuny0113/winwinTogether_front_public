import { useState } from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { IAddress } from "./Address";

export const useAddressHandler = ({
  mainAddressSetter,
}: {
  mainAddressSetter: (value: string) => void;
}) => {
  const open = useDaumPostcodePopup();
  const handleAddress1Click = () => {
    open({
      onComplete: (data: Address) => {
        if (data.addressType === "R") {
          let fullAddress = data.address;
          let extraAddress = "";

          if (data.bname !== "") {
            extraAddress += data.bname;
          }

          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
          mainAddressSetter(fullAddress);
          return;
        }
        if (data.addressType === "J") {
          let fullAddress =
            data.autoRoadAddress === ""
              ? data.roadAddress
              : data.autoRoadAddress;
          let extraAddress = "";

          if (data.bname !== "") {
            extraAddress += data.bname;
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
            mainAddressSetter(fullAddress);
            return;
          }
        }
      },
    });
  };

  return {
    handleAddress1Click,
  };
};
