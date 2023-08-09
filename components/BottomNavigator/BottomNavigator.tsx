"use client";
import React, { useEffect, useMemo, useState } from "react";
import Icon, { IIconProps } from "../Icon/Icon";
import { useGetUser } from "@/app/common/user/useGetUser";
import { usePathname, useRouter } from "next/navigation";
import { GrInstagram } from "react-icons/gr";

import { useMarketInfoStore } from "@/app/market/[id]/hook/zustand/useMarketInfoStore";
import "./style.css";
import { useBottomNavStore } from "./useBottomNavStore";
import { shallow } from "zustand/shallow";
import { FaRightFromBracket } from "react-icons/fa6";

const BottomNavigator = () => {
  const user = useGetUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { point, setState, isBottomButtonLoading } = useBottomNavStore(
    (state) => ({
      point: state.point,
      setState: state.setState,
      isBottomButtonLoading: state.isBottomButtonLoading,
    }),
    shallow
  );
  const navWidth = mounted && window.innerWidth > 420 ? "w-[420px]" : "w-full";

  const pathname = usePathname();
  useEffect(() => {
    if (/dashboard/.exec(pathname)) {
      setState("point", "bottomNavHome");
      return;
    }
    if (/market/.exec(pathname)) {
      setState("point", "idCard");
      return;
    }
    if (/chat/.exec(pathname)) {
      setState("point", "instaUrl");
      return;
    }
    if (/contents/.exec(pathname)) {
      setState("point", "bottomNavInsta");
      return;
    }
  }, [pathname]);
  if (!user || !mounted) {
    return <></>;
  }

  return (
    <nav
      className={`fixed ${navWidth} bottom-0 flex justify-evenly items-center z-20`}
    >
      {(
        [
          {
            name: "홈",
            icon: "bottomNavHome",
            onNavClick: () => {
              if (isBottomButtonLoading) {
                return;
              }
              setState("point", "bottomNavHome");
              router.push("/dashboard");
              setState("isBottomButtonLoading", true);
            },
          },
          {
            name: "내 마켓 명함",
            icon: "idCard",
            onNavClick: () => {
              if (isBottomButtonLoading) {
                return;
              }
              setState("point", "idCard");
              if (user?.market_id) {
                router.push(`/market/${user?.market_id}`);
                useMarketInfoStore.getState().setState("tab", "홈");
              } else {
                router.push("/market");
              }
              setState("isBottomButtonLoading", true);
            },
          },

          {
            name: "콘텐츠 만들기",
            icon: "instaUrl",
            onNavClick: () => {
              if (isBottomButtonLoading) {
                return;
              }
              setState("point", "instaUrl");
              router.push(`/chat`);
              setState("isBottomButtonLoading", true);
            },
          },
          {
            name: "콘텐츠 보관함",
            icon: "bottomNavInsta",
            onNavClick: () => {
              if (isBottomButtonLoading) {
                return;
              }
              setState("point", "bottomNavInsta");
              router.push("/contents");
              setState("isBottomButtonLoading", true);
            },
          },
        ] as {
          name: string;
          icon: IIconProps["type"];
          onNavClick: () => void;
        }[]
      ).map(({ name, icon, onNavClick }) => (
        <div
          key={name}
          onClick={() => {
            onNavClick();
          }}
          className={`flex flex-col justify-center items-center gap-3 flex-[1] h-14  ${
            point === icon ? "bg-purpleMain bottomNav-active" : "bg-monoGray1"
          } `}
        >
          {icon === "bottomNavPerson" ? (
            <FaRightFromBracket
              fill="#A75AFF"
              width={40}
              height={40}
              className="logout"
            />
          ) : icon === "instaUrl" ? (
            <GrInstagram fill="#A75AFF" className="instaUrl" />
          ) : (
            <Icon type={icon} />
          )}

          {/* <p className="text-sm text-purpleMainHover">{name}</p> */}
        </div>
      ))}
    </nav>
  );
};

export default BottomNavigator;
