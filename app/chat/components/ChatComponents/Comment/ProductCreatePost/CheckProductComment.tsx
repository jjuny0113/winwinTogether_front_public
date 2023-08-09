import React, { useCallback } from "react";
import CheckComment from "../../CheckComment";
import { useScollDown } from "@/app/chat/hooks/useScollDown";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import { shallow } from "zustand/shallow";
import { useProductStore } from "@/app/chat/hooks/zustand/useProductStore";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

interface CheckProductCommentProps {
  mutationAsync: UseMutateAsyncFunction<
    | {
        id: number;
      }
    | undefined,
    unknown,
    void,
    unknown
  >;
}

const CheckProductComment = ({ mutationAsync }: CheckProductCommentProps) => {
  const { setChatStoreState, isFailtoGetContent, showComment } = useChatStore(
    (state) => ({
      setChatStoreState: state.setState,
      isFailtoGetContent: state.isFailtoGetContent,
      showComment: state.showComment,
    }),
    shallow
  );
  const { setState, isGenerate } = useProductStore(
    (state) => ({
      setState: state.setState,
      isGenerate: state.isGenerate,
    }),
    shallow
  );

  useScollDown(isGenerate, "checkComment");
  const handleButtonClick = useCallback(async () => {
    setChatStoreState("showComment.isGenerate", true);
    const data = await mutationAsync();
    if (!data) {
      setChatStoreState("isFailtoGetContent", true);
      return;
    }
    setChatStoreState("contentId", data.id);
  }, []);
  return (
    <CheckComment
      buttonDisable={showComment.isGenerate || isFailtoGetContent}
      isShow={isGenerate}
      className="checkComment"
      onButtonClick={handleButtonClick}
      onReselectButtonClick={() => {
        setState("isGenerate", false);
        setState("select", "");
        setState("itemId", null);
      }}
    />
  );
};

export default CheckProductComment;
