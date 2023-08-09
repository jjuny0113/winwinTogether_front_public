"use client"; // Error components must be Client Components

import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import Button from "@/components/Button";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    useBottomNavStore.getState().setState("isBottomButtonLoading", false);
  }, []);
  return (
    <PageWrapper header={<Header title="콘텐츠 보관함" />}>
      <div className="flex flex-col gap-2 items-center justify-center h-full">
        <p className="text-monoGray6 text-lg">데이터를 받오는데</p>
        <p className="text-monoGray6 text-lg">
          일시적으로 문제가 발생했어요 😱
        </p>
      </div>
      <div className="h-16 w-1"/>
    </PageWrapper>
  );
}
