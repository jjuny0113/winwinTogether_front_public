import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import lodashSet from "lodash/set";
import {
  NestedValueOf,
  PathSplit,
  PropertyStringPath,
} from "@/app/@types/zustand";

export interface AlertModalStoreInitState {
  status: "" | "error" | "warn";
  title: string;
  comment: React.ReactNode;
  buttonChildren: React.ReactNode;
}

const initState: AlertModalStoreInitState = {
  status: "",
  title: "",
  comment: "",
  buttonChildren: "",
};
export const useAlertModalStore = create(
  immer(
    combine(initState, (set, get) => ({
      setState: <Path extends PropertyStringPath<AlertModalStoreInitState>>(
        path: Path,
        value: NestedValueOf<AlertModalStoreInitState, PathSplit<Path>>
      ) => {
        set((state) => {
          lodashSet(state, path, value);
        });
      },
    }))
  )
);

export default createTrackedSelector(useAlertModalStore);
