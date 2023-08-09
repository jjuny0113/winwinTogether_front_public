"use client";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
import { useRouter } from "next/navigation";
import React from "react";

interface FooterProps {
  isAbsolute?: boolean;
  isBottomMargin?: boolean;
}

const Footer = ({ isAbsolute = true, isBottomMargin = false }: FooterProps) => {
  const router = useRouter();
  const onEntireLoading = useOnEntireLoading();
  return (
    <footer
      className={`flex flex-col gap-2 ${
        isAbsolute
          ? isBottomMargin
            ? "absolute bottom-0 mb-12"
            : "absolute bottom-0"
          : ""
      } p-6 w-full`}
    >
      <div className="flex gap-3">
        <p className="text-monoGray3 text-sm">1:1 문의</p>
        <a
          href={"https://open.kakao.com/o/sdSg7uyf"}
          target="_blank"
          rel="noreferrer"
          className="text-monoGray3 text-sm underline"
        >
          카카오톡 연결
        </a>
      </div>
      <div className="flex gap-3">
        <p className="text-monoGray3 text-sm">email 문의</p>
        <p className="text-monoGray3 text-sm">junnyletsgo@gmail.com</p>
      </div>
      <div className="flex gap-3">
        <p className="text-monoGray3 text-sm">이용약관</p>
        <p
          className="text-monoGray3 text-sm underline"
          onClick={() => {
            onEntireLoading();
            router.push("/consent/personal");
          }}
        >
          개인정보처리동의서
        </p>
      </div>
    </footer>
  );
};

export default Footer;
