import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface ItemResigerStoreInitState {
  imgFiles: File[];
  imgUrls: string[];
}

const initState: ItemResigerStoreInitState = {
  imgFiles: [],
  imgUrls: [],
};

export const useItemRegisterStore = create(
  immer(
    combine(initState, (set, get) => ({
      setImgFiles: (file: File) => {
        if (get().imgFiles.length >= 10) return;
        set((state) => {
          state.imgFiles = state.imgFiles.concat([file]);
        });
      },
      setImgUrls: (url: string) => {
        if (get().imgUrls.length >= 10) return;
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
      reset: () => {
        set(initState);
      },
    }))
  )
);
