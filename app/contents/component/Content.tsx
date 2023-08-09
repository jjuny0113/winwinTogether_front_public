"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useGetInstaPostByTimeStamp } from "../hooks/query/useGetInstaPostByTimeStamp";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import { useContentsStore } from "../hooks/zustand/useContentsStore";
import { shallow } from "zustand/shallow";
import DaySelector from "@/components/DaySelector/DaySelector";
import InstaViewer from "./InstaViewer";
import { useGetUser } from "@/app/common/user/useGetUser";
import CopyButtons from "./CopyButtons";
import EmptyMarketInfo from "@/components/EmptyMarketInfo";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";

const Content = () => {
  const { setState, curretSetTimestamp } = useContentsStore(
    (state) => ({
      setState: state.setState,
      curretSetTimestamp: state.curretSetTimestamp,
    }),
    shallow
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { isBottomButtonLoading } = useBottomNavStore(
    (state) => ({
      isBottomButtonLoading: state.isBottomButtonLoading,
    }),
    shallow
  );

  useOffEntireLoading();

  const { data, isLoading } = useGetInstaPostByTimeStamp();
  const user = useGetUser();

  const content = useMemo(() => data?.[0], [data]);

  if (!mounted || (isLoading && user?.market_id) || isBottomButtonLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full ">
        <LongTimeLoader />
      </div>
    );
  }

  if (!user?.market_id) {
    return <EmptyMarketInfo />;
  }

  return (
    <>
      <DaySelector
        onClick={(timestamp: number) => {
          setState("curretSetTimestamp", timestamp);
        }}
        baseDate={curretSetTimestamp}
        userRegistationDate={user.create_at}
      />
      {content ? (
        <div className="h-full">
          <div className="pt-6">
            <InstaViewer
              profileImgUrl={user?.profile_img ?? null}
              marketName={user?.market_name ?? ""}
              createAt={content.create_at}
              content={content.content}
              tags={content.tags}
              instaPostOptions={content.instaPostOptions}
            />
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center flex-col gap-4">
          <p className="font-normal text-monoGray5 text-lg font-pretendard">
            만들어진 콘텐츠가 없어요. 🥺
          </p>
        </div>
      )}
      {content && <CopyButtons content={content.content} tags={content.tags} />}
    </>
  );
};

export default Content;
