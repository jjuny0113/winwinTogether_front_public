import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface MarketImgRegistorStoreInitState {
  imgFiles: File[];
  imgUrls: string[];
}

const initState: MarketImgRegistorStoreInitState = {
  imgFiles: [],
  imgUrls: [],
};

export const useMarketImgRegistorStore = create(
  immer(
    combine(initState, (set, get) => ({
      setImgFiles: (file: File) => {
        if (get().imgFiles.length >= 5) return;
        set((state) => {
          state.imgFiles = state.imgFiles.concat([file]);
        });
      },
      setImgUrls: (url: string) => {
        if (get().imgUrls.length >= 5) return;
        set((state) => {
          state.imgUrls = state.imgUrls.concat([url]);
        });
      },
      deleteImgFile: (fileIndex: number) => {
        set((state) => {
          state.imgFiles = state.imgFiles.filter((v, i) => i !== fileIndex);
        });
      },
      deleteImgUrl: (fileUrlIndex: number) => {
        set((state) => {
          state.imgUrls = state.imgUrls.filter((v, i) => i !== fileUrlIndex);
        });
      },
    }))
  )
);
