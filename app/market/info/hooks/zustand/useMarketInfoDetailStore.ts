import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { BankListType } from "../../constants";

export interface MarketInfoDetailStore {
  social: {
    kakaoUrl: string;
    instaUrl: string;
    naverUrl: string;
    mallUrl: string;
  };
  detail: {
    bank: BankListType | "";
    accountHolder: string;
    account: string;
    marketIntroduction: string;
    operationTime: {
      day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
      isOperate: boolean;
      time: {
        open: string;
        close: string;
      };
    }[];
    phoneNum: string;
  };
}
const initalState: MarketInfoDetailStore = {
  social: {
    kakaoUrl: "",
    instaUrl: "",
    naverUrl: "",
    mallUrl: "",
  },
  detail: {
    bank: "",
    accountHolder: "",
    account: "",
    marketIntroduction: "",
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
    phoneNum: "",
  },
};

export const useMarketInfoDetailStore = create(
  immer(
    combine(initalState, (set, get) => ({
      setSocialState: (
        key: keyof MarketInfoDetailStore["social"],
        value: string
      ) => {
        set((state) => {
          state.social[key] = value;
        });
      },
      setDetailState: <T extends keyof MarketInfoDetailStore["detail"]>(
        key: T,
        value: T extends "bank"
          ? MarketInfoDetailStore["detail"]["bank"]
          : T extends "operationTime"
          ? MarketInfoDetailStore["detail"]["operationTime"]
          : string
      ) => {
        set((state) => {
          (state.detail[key] as unknown as any) = value;
        });
      },
      setOperationTimeIsOperate: (index: number, operationTime: boolean) => {
        set((state) => {
          state.detail.operationTime[index].isOperate = operationTime;
        });
      },
      setOperationTime:
        (status: "open" | "close", index: number) => (value: string) => {
          set((state) => {
            state.detail.operationTime[index].time[status] = value;
          });
        },
    }))
  )
);
