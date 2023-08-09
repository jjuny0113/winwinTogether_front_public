"use client";
import React, { useEffect, useState } from "react";
import { useGetTotalInfo } from "./hooks/query/useGetToalInfo";
import MarketSummary from "./components/MarketSummary";
import ContentsRecentPosts from "./components/ContentsRecentPosts";

import { useGetUser } from "../common/user/useGetUser";
import SummaryTags from "./components/SummaryTags";
import EmptyMarketInfo from "@/components/EmptyMarketInfo";
import MileStone from "./components/MileStone";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { shallow } from "zustand/shallow";
import { useScrollTop } from "@/util/useScrollTop";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import InitLoading from "@/components/InitLoading";
import { useLogin } from "../login/hooks/zustand/useLogin";
import ContentModal from "../login/components/Welcome/ContentModal";
import Footer from "@/components/Footer";

const DashboardComponent = () => {
  const { data, isLoading } = useGetTotalInfo();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const user = useGetUser();

  const { isBottomButtonLoading } = useBottomNavStore(
    (state) => ({
      isBottomButtonLoading: state.isBottomButtonLoading,
    }),
    shallow
  );
  useScrollTop();
  useOffEntireLoading();
  useEffect(() => {
    if (!user) return;
    if (!user?.privacy_consent && !user?.survey_sms_consent) {
      useLogin.getState().setIsContentModalOpen(true);
    }
  }, [user]);

  if (!mounted || (isLoading && user?.market_id) || isBottomButtonLoading) {
    return <InitLoading />;
  }

  return (
    <>
      {user?.market_id ? (
        <div className="flex flex-col gap-10">
          <MarketSummary
            profileImg={data?.marketInfo?.profile_img ?? ""}
            marketName={data?.marketInfo?.market_name ?? ""}
            sector={data?.marketInfo?.sector ?? ""}
          />
          <MileStone />
          <ContentsRecentPosts
            recentPosts={data?.recentPosts ?? []}
            registrationDate={user.create_at}
          />

          {/* <VisitorCount /> */}
          <SummaryTags tags={data?.tags ?? []} />
          <ContentModal />

          <Footer isAbsolute={false}/>
        </div>
      ) : (
        <>
          <EmptyMarketInfo />
          <ContentModal />
          <Footer isAbsolute={false}/>
        </>
      )}
    </>
  );
};

export default DashboardComponent;
