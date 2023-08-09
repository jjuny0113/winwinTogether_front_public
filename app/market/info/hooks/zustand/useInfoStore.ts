import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface IInitState {
  modalValue: "" | "bank" | "operate" | "target" | "address";
  bank: string;
  modal: "" | "finish";
  stage: "basic" | "insta" | "detail" | "finish" | "product" | "market";
  profileImg: string;
  profileImgFile: File | null;
  basic: {
    marketName: string;
    sector: string;
    address: string;
    subAddress: string;
  };
  social: {
    kakaoUrl: string;
    instaUrl: string;
    naverBlogUrl: string;
    shoppingMallUrl: string;
  };
  detail: {
    mainSellingProduct: string;
    mainSellingProductDetail: string;
    operationTime: {
      day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
      isOperate: boolean;
      time: {
        open: string;
        close: string;
      };
    }[];
    bank: string;
    account: string;
    phoneNum: string;
    marketExpress: string[];
    productExpress: string[];
    difference: string;
    marketIntroduction: string;
    mainTarget: string;
  };
}

const initState: IInitState = {
  modalValue: "",
  bank: "",
  modal: "",
  stage: "basic",
  profileImg: "",
  profileImgFile: null,
  basic: {
    marketName: "",
    sector: "",
    address: "",
    subAddress: "",
  },
  social: {
    kakaoUrl: "",
    instaUrl: "",
    naverBlogUrl: "",
    shoppingMallUrl: "",
  },
  detail: {
    mainSellingProduct: "",
    mainSellingProductDetail: "",
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
    bank: "",
    account: "",
    phoneNum: "",
    marketExpress: [],
    productExpress: [],
    difference: "",
    marketIntroduction: "",
    mainTarget: "",
  },
};
export const useInfoStore = create(
  immer(
    combine(initState, (set, get) => ({
      setModalValue: (modalValue: IInitState["modalValue"]) => {
        set((state) => {
          state.modalValue = modalValue;
        });
      },
      setBank: (bank: string) => {
        set((state) => {
          state.bank = bank;
        });
      },

      setStage: (stage: IInitState["stage"]) => {
        set((state) => {
          state.stage = stage;
        });
      },
      setProfileImg: (img: IInitState["profileImg"]) => {
        set((state) => {
          state.profileImg = img;
        });
      },
      setBasicInfo: (info: IInitState["basic"]) => {
        set((state) => {
          state.basic = info;
        });
      },
      setSocialInfo: (info: IInitState["social"]) => {
        set((state) => {
          state.social = info;
        });
      },
      setDetailInfo: <T extends keyof IInitState["detail"]>(
        key: T,
        value: T extends "operationTime"
          ? IInitState["detail"]["operationTime"]
          : T extends "marketExpress"
          ? IInitState["detail"]["marketExpress"]
          : T extends "productExpress"
          ? IInitState["detail"]["productExpress"]
          : string
      ) => {
        set((state) => {
          (state.detail[key] as unknown as any) = value;
        });
      },
      setOperationTime:
        (status: "open" | "close", index: number) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
          set((state) => {
            state.detail.operationTime[index].time[status] = e.target.value;
          });
        },
      setIsOperation: (index: number, isOperation: boolean) => {
        set((state) => {
          state.detail.operationTime[index].isOperate = isOperation;
        });
      },
      setModal: (modal: IInitState["modal"]) => {
        set((state) => {
          state.modal = modal;
        });
      },
      setProfileImgFile: (file: IInitState["profileImgFile"]) => {
        set((state) => {
          state.profileImgFile = file;
        });
      },
    }))
  )
);
