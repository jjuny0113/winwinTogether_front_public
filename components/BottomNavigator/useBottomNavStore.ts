import {
  NestedValueOf,
  PathSplit,
  PropertyStringPath,
} from "@/app/@types/zustand";
import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import lodashSet from "lodash/set";

interface BottomNavStoreInitState {
  isBottomButtonLoading: boolean;
  point: "bottomNavHome" | "idCard" | "instaUrl" | "bottomNavInsta";
}
const initState: BottomNavStoreInitState = {
  isBottomButtonLoading: false,
  point: "bottomNavHome",
};

export const useBottomNavStore = create(
  immer(
    combine(initState, (set, get) => ({
      setState: <Path extends PropertyStringPath<BottomNavStoreInitState>>(
        path: Path,
        value: NestedValueOf<BottomNavStoreInitState, PathSplit<Path>>
      ) => {
        set((state) => {
          lodashSet(state, path, value);
        });
      },
    }))
  )
);

export default createTrackedSelector(useBottomNavStore);
