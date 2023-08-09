"use client";
import { useEffect } from "react";
import { useGetUser } from "@/app/common/user/useGetUser";
import { useRouter } from "next/navigation";
export const useRouteMain = () => {
  const router = useRouter();
  const data = useGetUser();
  useEffect(() => {
    if (data?.market_id) {
      router.push(`/main`);
    }
  }, [data?.market_id, router]);
};
