import React from "react";
import { useInfoStore } from "../hooks/zustand/useInfoStore";
import Image from "next/image";
import { useBasicStore } from "../hooks/zustand/useBasicStore";
import Icon from "@/components/Icon/Icon";

const MarketProfileImg = () => {
  const { profileImg } = useBasicStore((state) => ({
    profileImg: state.profileImg,
  }));

  return profileImg ? (
    <Image
      src={profileImg}
      alt="image"
      width={96}
      height={96}
      className="rounded-full w-[96px] h-[96px]"
    />
  ) : (
    <Icon type="iconProfile" />
  );
};

export default MarketProfileImg;
