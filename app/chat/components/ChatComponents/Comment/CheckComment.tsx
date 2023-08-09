"use client";
import React, { useCallback } from "react";
import ChatWrapper from "../ChatWrapper/ChatWrapper";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import { shallow } from "zustand/shallow";
import ChatText from "../ChatText";
import Button from "@/components/Button";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useScollDown } from "@/app/chat/hooks/useScollDown";

interface CheckCommetProps {
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

const CheckComment = ({ mutationAsync }: CheckCommetProps) => {
  const { isFinish, setState, isGenerate } = useChatStore(
    (state) => ({
      isFinish: state.showComment.isFinish,
      isGenerate: state.showComment.isGenerate,
      setState: state.setState,
    }),
    shallow
  );
  useScollDown(isFinish, "checkComment");
  const handleCheckButtonClick = useCallback(async () => {
    setState("showComment.isGenerate", true);
    const data = await mutationAsync();
    if (!data) {
      setState("isFailtoGetContent", true);
      return;
    }
    setState("contentId", data.id);
  }, [mutationAsync, setState]);
  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow={isFinish}
        className="checkComment"
      >
        <ChatText comment="하루에 한번만 만들 수 있어요! 위의 내용을 다시한번 확인해 주세요." />
      </ChatWrapper>
      <div className="flex flex-col">
        <ChatWrapper
          avatar={{
            position: "right",
          }}
          isShow={isFinish}
        >
          <Button
            variant={"primary"}
            size={"medium"}
            disable={isGenerate}
            onClick={handleCheckButtonClick}
          >
            확인 했어요!
          </Button>
          <Button
            variant={"primary"}
            size={"medium"}
            onClick={() => {
              setState("showComment.isFinish", false);
            }}
          >
            다시 작성할께요
          </Button>
        </ChatWrapper>
      </div>
    </>
  );
};

export default CheckComment;
