import { ValueOf } from "./../../../@types/ValueOf";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import lodashSet from "lodash/set";
import { immer } from "zustand/middleware/immer";
import { ContentType } from "@/app/market/info/constants";
import { createTrackedSelector } from "react-tracked";
import {
  NestedValueOf,
  PathSplit,
  PropertyStringPath,
} from "@/app/@types/zustand";
interface ChatStoreInitState {
  contentType: ValueOf<typeof ContentType> | "";
  selectorType: "" | "product";
  showComment: {
    isFinish: boolean;
    isGenerate: boolean;
    isSelected: boolean;
  };
  isFailtoGetContent: boolean;
  optionValue: {
    [ContentType.SELF]: string;
  };
  contentId: number | null;
  isNotGenerageTags: boolean;
}

const initState: ChatStoreInitState = {
  contentType: "",
  selectorType: "",
  showComment: {
    isFinish: false,
    isGenerate: false,
    isSelected: false,
  },
  isFailtoGetContent: false,
  optionValue: {
    [ContentType.SELF]: "",
  },
  contentId: null,
  isNotGenerageTags: false,
};

export const useChatStore = create(
  immer(
    combine(initState, (set, get) => ({
      setContentType: (contentType: ChatStoreInitState["contentType"]) => {
        set((state) => {
          state.contentType = contentType;
        });
      },
      setState: <Path extends PropertyStringPath<ChatStoreInitState>>(
        path: Path,
        value: NestedValueOf<ChatStoreInitState, PathSplit<Path>>
      ) => {
        set((state) => {
          lodashSet(state, path, value);
        });
      },
      setShowComment: (
        key: keyof ChatStoreInitState["showComment"],
        isShow: boolean
      ) => {
        set((state) => {
          state.showComment[key] = isShow;
        });
      },
      setOptionValue: (
        key: keyof ChatStoreInitState["optionValue"],
        value: string
      ) => {
        set((state) => {
          state.optionValue[key] = value;
        });
      },
      reset: () => {
        set(initState);
      },
    }))
  )
);

export default createTrackedSelector(useChatStore);
