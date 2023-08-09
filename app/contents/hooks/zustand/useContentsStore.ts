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
import moment from "moment";

interface contentsStoreinitState {
  curretSetTimestamp: number;
}

const initState: contentsStoreinitState = {
  curretSetTimestamp: moment().local().valueOf(),
};

export const useContentsStore = create(
  immer(
    combine(initState, (set, get) => ({
      setState: <Path extends PropertyStringPath<contentsStoreinitState>>(
        path: Path,
        value: NestedValueOf<contentsStoreinitState, PathSplit<Path>>
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

export default createTrackedSelector(useContentsStore);
