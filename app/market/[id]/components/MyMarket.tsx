"use client";

import React, { useEffect } from "react";
import { Portal } from "react-portal";
import MarketThumbnail from "../../components/MarketThumbnail";
import MarketDetailTab from "../../components/MarketDetailTab";
import HomeIntroduce from "../../components/HomeIntroduce";
import ItemList from "@/app/market/[id]/items/ItemList/ItemList";
import AddProduct from "../../components/AddProduct";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";

import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import { QuerySuccessResponse } from "../../info/hooks/query/getMarketInfo";

import MarketImgViewer from "../items/components/MarketImgViewer";
import CustomToastContainer from "@/components/toastify/CustomToastContainer";
import Icon from "@/components/Icon/Icon";
import { useMyMarketHandler } from "../hook/handler/useMyMarketHandler";
import SharePortal from "./SharePortal";
import ModalSwitcher from "./ModalSwitcher";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { shallow } from "zustand/shallow";
import InitLoading from "@/components/InitLoading";
import { useScrollTop } from "@/util/useScrollTop";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import ProfileLink from "./ProfileLink";
import Footer from "@/components/Footer";

interface MyMarketProps {
  marketInfo: QuerySuccessResponse["marketInfo"]["result"];
  isUser: boolean;
}

const MyMarket = ({ marketInfo, isUser }: MyMarketProps) => {
  const {
    tab,
    isMarketAdmin,
    headerProps,
    marketImgViewerProps,
    marketThumbnailProps,
    marketDetailTabProps,
    homeIntroduceProps,
    onShareIconClick,
    isEditLoading,
  } = useMyMarketHandler(marketInfo, isUser);

  const { isBottomButtonLoading, setState } = useBottomNavStore(
    (state) => ({
      isBottomButtonLoading: state.isBottomButtonLoading,
      setState: state.setState,
    }),
    shallow
  );
  useScrollTop();
  useOffEntireLoading();

  if (!marketInfo || isBottomButtonLoading || isEditLoading) {
    return <InitLoading />;
  }

  return (
    <PageWrapper
      isShowBottomNavigator={isMarketAdmin}
      header={<Header {...headerProps} />}
    >
      <MarketImgViewer {...marketImgViewerProps} />
      <MarketThumbnail {...marketThumbnailProps} />
      <MarketDetailTab {...marketDetailTabProps} />
      {tab === "홈" ? (
        <HomeIntroduce {...homeIntroduceProps} />
      ) : tab === "프로필 링크" ? (
        <ProfileLink
          instaUrl={marketInfo.instagram_url}
          kakaoOpenProfileUrl={marketInfo.kakao_open_profile_url}
          naverBlogUrl={marketInfo.naver_blog_url}
          shoppingmallUrl={marketInfo.shoppingmall_url}
          isMarketAdmin={isMarketAdmin}
        />
      ) : (
        <div className="flex flex-col w-full py-6 overflow-auto scrollbar-hide">
          {isMarketAdmin && <AddProduct />}
          <ItemList />
        </div>
      )}
      <CustomToastContainer />
      <SharePortal onShareIconClick={onShareIconClick} />
      <ModalSwitcher
        marketImgs={marketInfo.market_imgs}
        marketDescription={marketInfo.marketIntroduction}
        marketName={marketInfo.market_name}
      />
      <Footer isAbsolute={false}/>
    </PageWrapper>
  );
};

export default MyMarket;
