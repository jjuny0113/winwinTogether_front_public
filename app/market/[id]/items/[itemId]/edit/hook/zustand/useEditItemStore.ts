import {
  NestedValueOf,
  PathSplit,
  PropertyStringPath,
} from "@/app/@types/zustand";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createTrackedSelector } from "react-tracked";
import lodashSet from "lodash/set";

interface EditItemStoreInitState {
  type: "itemImg" | "" | "list";

  imgUrls: {
    id: number;
    url: string;
  }[];

  imgFiles: {
    url: string;
    file: File;
  }[];
  originImgUrls: {
    id: number;
    url: string;
  }[];
  isEdit: boolean;
}

const initState: EditItemStoreInitState = {
  imgUrls: [],
  imgFiles: [],
  type: "",
  originImgUrls: [],
  isEdit: false,
};

export const useEditItemStore = create(
  immer(
    combine(initState, (set, get) => ({
      setState: <Path extends PropertyStringPath<EditItemStoreInitState>>(
        path: Path,
        value: NestedValueOf<EditItemStoreInitState, PathSplit<Path>>
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

export default createTrackedSelector(useEditItemStore);
