import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useEffect } from "react";

export const useOffEntireLoading = () => {
  useEffect(() => {
    useBottomNavStore.getState().setState("isBottomButtonLoading", false);
  }, []);
};
