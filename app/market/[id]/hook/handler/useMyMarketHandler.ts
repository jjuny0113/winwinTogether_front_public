"use client";
import { shallow } from "zustand/shallow";

import { useParams, usePathname, useRouter } from "next/navigation";
import { QuerySuccessResponse } from "@/app/market/info/hooks/query/getMarketInfo";
import { useEffect, useState } from "react";

import { BankListType } from "@/app/market/info/constants";
import { HomeIntroduceProps } from "@/app/market/components/HomeIntroduce";
import { MarketDetailTabProps } from "@/app/market/components/MarketDetailTab";
import { MarketThumbnailProps } from "@/app/market/components/MarketThumbnail";
import { MarketImgViewerProps } from "../../items/components/MarketImgViewer";
import { useIsMarketAdmin } from "../../items/hooks/useIsMarketAdmin";
import {
  MarketInfoStoreState,
  useMarketInfoStore,
} from "../zustand/useMarketInfoStore";
import { ModalSwitcherProps } from "../../components/ModalSwitcher";
import { handlingWordiness } from "@/util/handlingWordiness";
import { writeClipboardText } from "@/util/writeClipboardText";
import { toast } from "react-toastify";

export const useMyMarketHandler = (
  marketInfo: QuerySuccessResponse["marketInfo"]["result"],
  isUser: boolean
) => {
  const isMarketAdmin = useIsMarketAdmin(isUser);

  const { tab, setState, reset, isEditLoading } = useMarketInfoStore(
    (state) => ({
      tab: state.tab,
      setState: state.setState,
      reset: state.reset,
      isEditLoading: state.isEditLoading,
    }),
    shallow
  );
  const pathname = usePathname();
  const router = useRouter();
  const param = useParams() as {
    id: string;
  };

  const handleMarketImgEditButtonClick = () => {
    setState("type", "marketImg");
    setState("imgUrls", marketInfo.market_imgs);
    setState("originImgUrls", marketInfo.market_imgs);
    setState("isEditLoading", true);
    router.push(`/market/${param.id}/edit`);
  };

  const marketImgViewerProps: MarketImgViewerProps = {
    marketImgs: marketInfo?.market_imgs,
    editButtonClick: handleMarketImgEditButtonClick,
    isEdit: isMarketAdmin,
  };
  const headerProps = {
    title: isMarketAdmin
      ? "내 마켓 명함"
      : `${handlingWordiness(marketInfo?.market_name ?? "", 10)}`,
  };

  const marketThumbnailProps: MarketThumbnailProps = {
    marketName: marketInfo?.market_name ?? "",
    profileImgUrl: marketInfo?.profile_img,
    marketIntroduce: marketInfo?.marketIntroduction,
    isMarketAdmin: isMarketAdmin,
  };

  const marketDetailTabProps: MarketDetailTabProps = {
    tabs: [
      {
        displayName: "홈",
      },
      {
        displayName: "프로필 링크",
      },
      {
        displayName: "상품",
      },
    ],
    selectedTab: tab,
    onTabClick: (tab: MarketInfoStoreState["tab"]) => {
      setState("tab", tab);
    },
  };

  const homeIntroduceProps: HomeIntroduceProps = {
    coordinate_latitude: marketInfo?.coordinate_latitude,
    coordinate_longitude: marketInfo?.coordinate_longitude,
    address: marketInfo?.address,
    addressDetail: marketInfo?.address_detail,
    bank: marketInfo?.bank as BankListType,
    accountHolder: marketInfo?.accountHolder,
    account: marketInfo?.account,
    operatingTime: marketInfo?.operating_time,
  };

  const modalSwitcherProps: ModalSwitcherProps = {
    marketImgs: marketInfo?.market_imgs,
    marketDescription: marketInfo?.marketIntroduction,
    marketName: marketInfo?.market_name,
  };

  const onShareIconClick = async () => {
    if (isMarketAdmin) {
      setState("modalType", "marketUrl");
    } else {
      await writeClipboardText(`https://www.winwin-together.com${pathname}`);
      toast("url 주소가 복사되었습니다.");
    }
  };
  return {
    tab,
    isMarketAdmin,
    headerProps,
    marketImgViewerProps,
    marketThumbnailProps,
    marketDetailTabProps,
    homeIntroduceProps,
    modalSwitcherProps,
    onShareIconClick,
    isEditLoading,
  };
};
