import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";

export const useOnEntireLoading = () => {
  const onEntireLoading = () => {
    useBottomNavStore.getState().setState("isBottomButtonLoading", true);
  };
  return onEntireLoading;
};
