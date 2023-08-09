"use client"; // Error components must be Client Components

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
  return (
    <PageWrapper header={<Header title="마켓 명함" />}>
      <div className="flex flex-col gap-4 items-center justify-center h-full ">
        <p className="text-monoGray6 text-lg">등록되지 않은 마켓입니다 😱</p>
      </div>
    </PageWrapper>
  );
}
