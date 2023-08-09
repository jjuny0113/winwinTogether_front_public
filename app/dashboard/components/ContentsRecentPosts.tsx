import React, { useState } from "react";
import moment from "moment";
import Icon from "@/components/Icon/Icon";
import { useGetRecentPosts } from "../hooks/handler/useGetRecentPosts";
import Image from "next/image";

interface ContentsRecentPosts {
  recentPosts: {
    isExist: boolean;
    date: number;
  }[];
  registrationDate: number;
}
const checkToday = (timestamp: number) =>
  moment().utc().format("MM/DD") === moment(timestamp).utc().format("MM/DD");
const ContentsRecentPosts = ({
  recentPosts,
  registrationDate,
}: ContentsRecentPosts) => {
  const {
    isShowExtendButton,
    recentPostsData,
    handleMoreButtonClick,
    buttonName,
  } = useGetRecentPosts({
    recentPosts,
    registrationDate,
  });

  return (
    <section className="flex flex-col gap-2 items-center px-4">
      <div className="flex flex-col gap-2 pb-3 pt-5 px-4 rounded-2xl w-full shadow-middleShadow">
        <div className=" flex items-center justify-between">
          <h2 className="text-monoGray6 text-lg font-semibold">
            최근 2주일간 콘텐츠 현황
          </h2>
        </div>
        <div className="flex gap-2">
          <p className="text-monoGray6">
            꾸준히 올려야 인스타 노출 빈도가 높아져요!
          </p>
        </div>
        <div className="grid grid-cols-2">
          {[
            recentPostsData.map((post) => (
              <div key={post.date} className="flex items-center p-2 gap-3">
                <div className="flex flex-col gap-3 w-full">
                  {checkToday(post.date) ? (
                    <p className="text-base font-medium text-purpleMain">
                      Today
                    </p>
                  ) : (
                    <p className="text-base font-medium text-monoGray6">
                      {moment(post.date).format("MM/DD")}
                    </p>
                  )}

                  <div className="flex flex-col gap-3 items-center">
                    <div className="rounded-3xl border-2 border-purpleMain w-20 h-20 flex justify-center items-center">
                      {post.isExist ? (
                        <Image
                          src={"/paw_full.png"}
                          alt="exist"
                          width={76}
                          height={76}
                        />
                      ) : (
                        <Image
                          src={"/paw_line.png"}
                          alt="empty"
                          width={76}
                          height={76}
                        />
                      )}
                    </div>
                    <p className="text-monoGray6 text-xs">
                      {post.isExist
                        ? "콘텐츠를 올렸어요!"
                        : checkToday(post.date)
                        ? "콘텐츠를 만들어보세요!"
                        : "콘텐츠가 비었어요"}
                    </p>
                  </div>
                </div>
              </div>
            )),
          ]}
        </div>
        <div className="flex justify-center">
          {isShowExtendButton && (
            <p
              className="text-purpleMain text-sm"
              onClick={handleMoreButtonClick}
            >
              {buttonName}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentsRecentPosts;
