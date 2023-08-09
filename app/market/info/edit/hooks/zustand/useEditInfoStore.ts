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
import { BankListType } from "../../../constants";

export interface EditInfoStoreInitState {
  editType:
    | "list"
    | "profileImg"
    | "marketName"
    | "section"
    | "introduction"
    | "address"
    | "mainProduct"
    | "adjMarket"
    | "adjProduct"
    | "mainTarget"
    | "kakaoUrl"
    | "instaUrl"
    | "naverUrl"
    | "shoppingMallUrl"
    | "bankInfo"
    | "operationTime"
    | "phoneNum"
    | "adjMarketSetter"
    | "adjProductSetter";
  adjProduct: string[];
  adjMarket: string[];
  operationTime: {
    day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
    isOperate: boolean;
    time: {
      open: string;
      close: string;
    };
  }[];
  modalType:
    | ""
    | "operationTimeSetter"
    | "mainTargetSetter"
    | "bankSetter"
    | "addressSetter";
  bank: BankListType | "";
  mainTarget: string;
  profileImgFile: File | null;
  profileImgUrl: string;
  isEditLoading: boolean;
  mainAddress: string;
}

const initState: EditInfoStoreInitState = {
  editType: "list",
  adjProduct: [],
  adjMarket: [],
  operationTime: [
    {
      day: "월",
      isOperate: true,
      time: {
        open: "",
        close: "",
      },
    },
    {
      day: "화",
      isOperate: true,
      time: {
        open: "",
        close: "",
      },
    },
    {
      day: "수",
      isOperate: true,
      time: {
        open: "",
        close: "",
      },
    },
    {
      day: "목",
      isOperate: true,
      time: {
        open: "",
        close: "",
      },
    },
    {
      day: "금",
      isOperate: true,
      time: {
        open: "",
        close: "",
      },
    },
    {
      day: "토",
      isOperate: true,
      time: {
        open: "",
        close: "",
      },
    },
    {
      day: "일",
      isOperate: true,
      time: {
        open: "",
        close: "",
      },
    },
  ],
  modalType: "",
  bank: "",
  mainTarget: "",
  profileImgFile: null,
  profileImgUrl: "",
  isEditLoading: false,
  mainAddress: "",
};

export const useEditInfoStore = create(
  immer(
    combine(initState, (set, get) => ({
      setState: <Path extends PropertyStringPath<EditInfoStoreInitState>>(
        path: Path,
        value: NestedValueOf<EditInfoStoreInitState, PathSplit<Path>>
      ) => {
        set((state) => {
          lodashSet(state, path, value);
        });
      },
      setOperationTime:
        (status: "open" | "close", index: number) => (value: string) => {
          set((state) => {
            state.operationTime[index].time[status] = value;
          });
        },
      setOperationTimeIsOperate: (index: number, operationTime: boolean) => {
        set((state) => {
          state.operationTime[index].isOperate = operationTime;
        });
      },
    }))
  )
);

export default createTrackedSelector(useEditInfoStore);
