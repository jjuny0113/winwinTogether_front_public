import SideSlide from "@/components/SideSlide";
import React from "react";
import { useLogin } from "../../hooks/zustand/useLogin";
import { shallow } from "zustand/shallow";

const WelcomSideSlide = () => {
  const { sideSlidePage, setSideSlidePage, setWelcome } = useLogin(
    (state) => ({
      sideSlidePage: state.sideSlidePage,
      setSideSlidePage: state.setSideSlidePage,
      setWelcome: state.setWelcome,
    }),
    shallow
  );
  return (
    <>
      <SideSlide
        totalPages={3}
        currentPage={sideSlidePage}
        onPageChange={(index: number) => {
          const pageMapper = new Map<
            number,
            "intro" | "banner" | "promotional"
          >([
            [3, "promotional"],
            [2, "banner"],
            [1, "intro"],
          ]);

          setWelcome(pageMapper.get(index) ?? "intro");
          setSideSlidePage(index);
        }}
      />
    </>
  );
};

export default WelcomSideSlide;
