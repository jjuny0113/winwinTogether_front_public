import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface BasicStoreInitState {
  marketName: string;
  sector: string;
  address: string;
  subAddress: string;
  profileImg: string;
  profileImgFile: File | null;
}
const initalState: BasicStoreInitState = {
  marketName: "",
  sector: "",
  address: "",
  subAddress: "",
  profileImg: "",
  profileImgFile: null,
};

export const useBasicStore = create(
  immer(
    combine(initalState, (set, get) => ({
      setBasicStoreState: <T extends keyof BasicStoreInitState>(
        key: T,
        value: T extends "profileImgFile" ? File | null : string
      ) => {
        set((state) => {
          (state[key] as unknown as any) = value;
        });
      },
    }))
  )
);
