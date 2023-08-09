"use client";
import { useGetUser } from "@/app/common/user/useGetUser";
import { useMarketInfoStore } from "@/app/market/[id]/hook/zustand/useMarketInfoStore";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
import { useRouter } from "next/navigation";
import React from "react";

const MileStone = () => {
  const router = useRouter();
  const { point, setState } = useBottomNavStore((state) => ({
    point: state.point,
    setState: state.setState,
  }));
  const user = useGetUser();
  const onEntireLoading = useOnEntireLoading();
  return (
    <section className="flex flex-col gap-2 items-center px-4">
      <div className="flex flex-col gap-2 p-5 rounded-2xl w-full bg-gradient-to-r shadow-middleShadow">
        <h2 className="text-monoGray6 text-lg font-semibold">바로가기</h2>
        <p className="text-monoGray4 text-xs"></p>
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          {[
            {
              title: "콘텐츠 만들기",
              desc: "인스타 콘텐츠를 만들어보세요",
              onClick: () => {
                setState("point", "instaUrl");
                onEntireLoading();
                router.push(`/chat`);
              },
            },
            {
              title: "콘텐츠 보관함",
              desc: "그동안 만든 콘텐츠를 확인하세요",
              onClick: () => {
                setState("point", "bottomNavInsta");
                onEntireLoading();
                router.push("/contents");
              },
            },
            {
              title: "내 마켓 명함",
              desc: "내가 등록한 마켓 정보를 url을 통해 알려보세요",
              onClick: () => {
                setState("point", "idCard");
                onEntireLoading();
                if (user?.market_id) {
                  router.push(`/market/${user?.market_id}`);
                  useMarketInfoStore.getState().setState("tab", "홈");
                } else {
                  router.push("/market");
                }
              },
            },
            {
              title: "내 상품 홍보",
              desc: "내가 등록한 상품을 url을 통해 알려보세요",
              onClick: () => {
                onEntireLoading();
                if (user?.market_id) {
                  router.push(`/market/${user?.market_id}`);

                  useMarketInfoStore.getState().setState("tab", "상품");
                } else {
                  router.push("/market");
                }
              },
            },
          ].map((val) => (
            <div
              key={val.title}
              className="shadow-buttonShadow flex p-4 rounded-xl flex-col h-32 gap-4"
              onClick={() => {
                val.onClick();
              }}
            >
              <p className="text-purpleMain font-semibold text-base">
                {val.title}
              </p>
              <p className="text-monoGray6 font-normal text-xs">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MileStone;
