"use client";
import React, { useEffect, useState } from "react";
import BottomNavigator from "./BottomNavigator/BottomNavigator";

interface PageWrapperProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  isShowBottomNavigator?: boolean;
  isCenter?: boolean;
}

const PageWrapper = ({
  children,
  header,
  isCenter = false,
  isShowBottomNavigator = false,
}: PageWrapperProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <></>;
  }
  return (
    <main className="flex flex-col items-center ">
      {header && header}
      <div
        className={`flex flex-col w-full  h-full pb-12 min-h-[100vh] ${
          isCenter && "justify-center"
        }`}
      >
        {children}
      </div>
      {isShowBottomNavigator && <BottomNavigator />}
    </main>
  );
};

export default PageWrapper;
