import { useMemo } from "react";
import { create } from "zustand";

interface SideSlideStore {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export interface ISideSlide {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: React.ComponentProps<"button">["className"];
}

const SideSlide = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  ...props
}: ISideSlide) => {
  const handlePageClick = (index: number): void => {
    onPageChange(index + 1);
  };

  return (
    <div className="flex items-center justify-between w-[54px] h-[7.2px]">
      {[...Array(totalPages)].map((_, index) => (
        <div
          key={index}
          onClick={() => handlePageClick(index)}
          className={`h-[7.2px] ${
            currentPage === index + 1
              ? "bg-purpleMain transition-all"
              : "bg-monoGray2 transition-all"
          } rounded-full w-[10px] h-[10px] transition-all duration-200`}
        />
      ))}
    </div>
  );
};

SideSlide.displayName = "SideSlide";

export default SideSlide;
