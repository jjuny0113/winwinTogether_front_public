import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface ItemImgResigerStoreInitState {
  imgFiles: File[];
  imgUrls: string[];
}

const initState: ItemImgResigerStoreInitState = {
  imgFiles: [],
  imgUrls: [],
};

export const useItemImgResigerStore = create(
  immer(
    combine(initState, (set, get) => ({
      setImgFiles: (file: File) => {
        set((state) => {
          state.imgFiles = state.imgFiles.concat([file]);
        });
      },
      setImgUrls: (url: string) => {
        set((state) => {
          state.imgUrls = state.imgUrls.concat([url]);
        });
      },
    }))
  )
);
