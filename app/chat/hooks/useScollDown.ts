import { useEffect } from "react";

export const useScollDown = (
  isShow: boolean,
  className: React.ComponentProps<"div">["className"]
) => {
  useEffect(() => {
    const chatWrapper = document.querySelector(`.${className}`);
    const rect = chatWrapper?.getBoundingClientRect();
    if (rect && isShow) {
      const scolldown = window.scrollTo(0, rect.top / 2);

      return scolldown;
    }
  }, [className, isShow]);
};
