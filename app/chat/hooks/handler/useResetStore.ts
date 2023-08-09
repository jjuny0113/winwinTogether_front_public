import { useEffect } from "react";
import { useChatStore } from "../zustand/useChatStore";
import { useProductStore } from "../zustand/useProductStore";
import { useWeatherStore } from "../zustand/useWeatherStore";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import { useSearchParams } from "next/navigation";

export const useResetStore = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const isFromChat = searchParams.get("isFromItemRegister");
    useBottomNavStore.getState().setState("isBottomButtonLoading", false);
    if (!isFromChat) {
      useChatStore.getState().reset();
      useProductStore.getState().reset();
      useWeatherStore.getState().reset();
    }
  }, []);
};
