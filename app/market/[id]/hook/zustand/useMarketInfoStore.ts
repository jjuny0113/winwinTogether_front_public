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

export interface MarketInfoStoreState {
  type: "marketImg" | "" | "list";

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
  tab: "홈" | "상품"|"프로필 링크";
  modalType: "" | "marketUrl";
  isEditLoading: boolean;
}

const initState: MarketInfoStoreState = {
  imgUrls: [],
  imgFiles: [],
  type: "",
  originImgUrls: [],
  tab: "홈",
  modalType: "",
  isEditLoading: false,
};

export const useMarketInfoStore = create(
  immer(
    combine(initState, (set, get) => ({
      setState: <Path extends PropertyStringPath<MarketInfoStoreState>>(
        path: Path,
        value: NestedValueOf<MarketInfoStoreState, PathSplit<Path>>
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

export default createTrackedSelector(useMarketInfoStore);
