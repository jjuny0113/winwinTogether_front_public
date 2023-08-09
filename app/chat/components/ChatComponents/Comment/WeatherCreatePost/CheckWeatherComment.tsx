"use client";
import React, { useCallback } from "react";
import ChatWrapper from "../../ChatWrapper/ChatWrapper";
import ChatText from "../../ChatText";
import { useWeatherStore } from "@/app/chat/hooks/zustand/useWeatherStore";
import Button from "@/components/Button";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import { shallow } from "zustand/shallow";
import { useScollDown } from "@/app/chat/hooks/useScollDown";
import CheckComment from "../../CheckComment";

interface CheckCommentProps {
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

const CheckWeatherComment = ({ mutationAsync }: CheckCommentProps) => {
  const { setState, isGenerate, select } = useWeatherStore((state) => ({
    setState: state.setState,
    select: state.select,
    isGenerate: state.isGenerate,
  }));

  const { setChatStoreState, isFailtoGetContent, showComment } = useChatStore(
    (state) => ({
      setChatStoreState: state.setState,
      isFailtoGetContent: state.isFailtoGetContent,
      showComment: state.showComment,
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
  }, [mutationAsync, setChatStoreState]);
  return (
    <CheckComment
      buttonDisable={showComment.isGenerate || isFailtoGetContent}
      isShow={isGenerate}
      className="checkComment"
      onButtonClick={handleButtonClick}
      onReselectButtonClick={() => {
        setState("isGenerate", false);
        if (select === "auto") {
          setState("select", "");
        }
      }}
    />
  );
};

export default CheckWeatherComment;
