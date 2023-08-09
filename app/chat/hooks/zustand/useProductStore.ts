import {
  NestedValueOf,
  PathSplit,
  PropertyStringPath,
} from "@/app/@types/zustand";
import lodashSet from "lodash/set";
import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ProductStoreInitState {
  select: "item" | "" | "check";
  itemId: number | null;
  isGenerate: boolean;
}
const initState: ProductStoreInitState = {
  select: "",
  itemId: null,
  isGenerate: false,
};

export const useProductStore = create(
  immer(
    combine(initState, (set, get) => ({
      setState: <Path extends PropertyStringPath<ProductStoreInitState>>(
        path: Path,
        value: NestedValueOf<ProductStoreInitState, PathSplit<Path>>
      ) => {
        set((state) => {
          lodashSet(state, path, value);
        });
      },
      reset: () => {
        set(initState);
      },
    }))
  )
);

export default createTrackedSelector(useProductStore);
