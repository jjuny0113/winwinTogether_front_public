import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ADJECTIVES_Type } from "../../template/AdjectivceSelector/constants";

export interface InstagramInputsStoreInitState {
  mainSellingProduct: string;
  mainSellingProductDetail: string;
  marketExpress: string[];
  productExpress: string[];
  mainTarget: string;
  navValue: keyof ADJECTIVES_Type;
}

const initState: InstagramInputsStoreInitState = {
  mainSellingProduct: "",
  mainSellingProductDetail: "",
  marketExpress: [],
  productExpress: [],
  mainTarget: "",
  navValue: "혁신과 독창성",
};

export const useInstagramInputsStore = create(
  immer(
    combine(initState, (set, get) => ({
      setInstaInputsStore: <T extends keyof InstagramInputsStoreInitState>(
        key: T,
        value: T extends "marketExpress" | "productExpress"
          ? string[]
          : T extends "navValue"
          ? keyof ADJECTIVES_Type
          : string
      ) => {
        set((state) => {
          (state[key] as unknown as any) = value;
        });
      },
    }))
  )
);
