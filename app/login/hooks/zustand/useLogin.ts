import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ILoginInitState {
  sendTextAgree: boolean;
  personalInfoAgree: boolean;
  page: "phoneNum" | "signIn" | "welcome" | "";
  welcome: "intro" | "banner" | "promotional";
  modal: "resend" | "notEqual" | "" | "phoneNumError";
  sideSlidePage: number;
  userPhoneNum: string;
  isContentModalOpen: boolean;
  privacyConsent: boolean;
  surveySmsConsent: boolean;
  isLoading: boolean;
  isOpenConsent: boolean;
  isFromConsent: boolean;
}

const initState: ILoginInitState = {
  sendTextAgree: false,
  personalInfoAgree: false,
  page: "phoneNum",
  welcome: "intro",
  modal: "",
  sideSlidePage: 1,
  userPhoneNum: "",
  isContentModalOpen: false,
  privacyConsent: false,
  surveySmsConsent: false,
  isLoading: false,
  isOpenConsent: false,
  isFromConsent: false,
};

export const useLogin = create(
  immer(
    combine(initState, (set, get) => ({
      setSendTextAgree: () => {
        const isAgree = get().sendTextAgree;
        set((state) => {
          state.sendTextAgree = !isAgree;
        });
      },
      setPersonalInfoAgree: () => {
        const isAgree = get().personalInfoAgree;
        set((state) => {
          state.personalInfoAgree = !isAgree;
        });
      },
      setPage: (page: ILoginInitState["page"]) => {
        set((state) => {
          state.page = page;
        });
      },
      setWelcome: (welcome: ILoginInitState["welcome"]) => {
        set((state) => {
          state.welcome = welcome;
        });
      },
      setModal: (modal: ILoginInitState["modal"]) => {
        set((state) => {
          state.modal = modal;
        });
      },
      setSideSlidePage: (page: ILoginInitState["sideSlidePage"]) => {
        set((state) => {
          state.sideSlidePage = page;
        });
      },
      setUserPhoneNum: (phoneNum: ILoginInitState["userPhoneNum"]) => {
        set((state) => {
          state.userPhoneNum = phoneNum;
        });
      },
      setIsContentModalOpen: (isContentModalOpen: boolean) => {
        set((state) => {
          state.isContentModalOpen = isContentModalOpen;
        });
      },
      setprivacyConsent: (privacyConsent: boolean) => {
        set((state) => {
          state.privacyConsent = privacyConsent;
        });
      },
      setsurveySmsConsent: (surveySmsConsent: boolean) => {
        set((state) => {
          state.surveySmsConsent = surveySmsConsent;
        });
      },
      setIsLoading: (isLoading: boolean) => {
        set((state) => {
          state.isLoading = isLoading;
        });
      },
      setIsOpenConsent: (isOpenConsent: boolean) => {
        set((state) => {
          state.isOpenConsent = isOpenConsent;
        });
      },
      setIsFromConsent: (isFromConsent: boolean) => {
        set((state) => {
          state.isFromConsent = isFromConsent;
        });
      },
      reset: () => {
        set(initState);
      },
    }))
  )
);
