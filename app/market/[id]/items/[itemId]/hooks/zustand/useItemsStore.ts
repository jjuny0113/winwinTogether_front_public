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

interface ItemsStoreInitState {
  modalType: "" | "share";
}
const initState: ItemsStoreInitState = {
  modalType: "",
};

export const useItemsStore = create(
  immer(
    combine(initState, (set, get) => ({
      setState: <Path extends PropertyStringPath<ItemsStoreInitState>>(
        path: Path,
        value: NestedValueOf<ItemsStoreInitState, PathSplit<Path>>
      ) => {
        set((state) => {
          lodashSet(state, path, value);
        });
      },
    }))
  )
);

export default createTrackedSelector(useItemsStore);
