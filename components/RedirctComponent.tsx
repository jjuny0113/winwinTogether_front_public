"use client";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface RedirctComponentProps {
  isExistCookie: boolean;
}

const RedirctComponent = ({ isExistCookie }: RedirctComponentProps) => {
  const router = useRouter();
  const onEntireLoading = useOnEntireLoading();
  useEffect(() => {
    if (isExistCookie) {
      onEntireLoading();
      router.push("/dashboard");
    } else {
      onEntireLoading();
      router.push("/login");
    }
  }, []);
  return <></>;
};

export default RedirctComponent;
