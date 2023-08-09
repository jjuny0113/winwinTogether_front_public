import { useEffect } from "react";

export const useScrollTop = (condition: boolean = true) => {
  useEffect(() => {
    if (condition) {
      window.scrollTo(0, 0);
    }
  }, []);
};
