"use client";

import Button from "@/components/Button";
import React from "react";

interface MarketEditWrapperProps {
  children: React.ReactNode;
  handleSumbit: () => void;
  isLoading?: boolean;
}

const MarketEditWrapper = ({
  children,
  handleSumbit,
  isLoading = false,
}: MarketEditWrapperProps) => {
  return (
    <>
      <form
        className={`flex flex-col items-center justify-center gap-[60px] pt-[95px]`}
      >
        {children}
      </form>
      <div className="absolute bottom-24 w-full">
        <div className="flex justify-center items-center">
          <Button
            size="large"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              handleSumbit();
            }}
            isLoading={isLoading}
          >
            수정
          </Button>
        </div>
      </div>
    </>
  );
};

export default MarketEditWrapper;
