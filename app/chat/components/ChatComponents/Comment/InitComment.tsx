"use client";
import React from "react";
import ChatWrapper from "../ChatWrapper/ChatWrapper";
import ChatText from "../ChatText";
import Button from "@/components/Button";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import { shallow } from "zustand/shallow";
import { ContentType } from "@/app/market/info/constants";

const InitComment = () => {
  const { contentType, setState, isSelected } = useChatStore(
    (state) => ({
      contentType: state.contentType,
      isSelected: state.showComment.isSelected,
      setState: state.setState,
    }),
    shallow
  );

  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow
      >
        <ChatText
          comment="위너님! 반가워요 <br/>저는 위너님을 도와줄 ‘윈윈'이라고 해요!
        <br/>제가 위너님 마켓을 위한 인스타그램 콘텐츠를 만들어드릴게요!
        <br/>이미 생각해둔 콘텐츠가 있다면 마케팅 대상에 맞게 글을 써드릴깨요!
        <br/>생각해둔 콘텐츠가 없으시면 윈윈이가 추천해 드릴까요?
        "
        />
      </ChatWrapper>
      <ChatWrapper
        avatar={{
          position: "right",
        }}
        isShow
      >
        <Button
          variant={"primary"}
          size={"medium"}
          disable={contentType === ContentType.SELF}
          onClick={() => {
            if (contentType) return;
            setState("showComment.isSelected", true);
          }}
        >
          추천 해주세요!
        </Button>
        <Button
          variant={"primary"}
          size={"medium"}
          disable={isSelected}
          onClick={() => {
            if (contentType) return;
            setState("contentType", ContentType.SELF);
          }}
        >
          생각해둔 콘텐츠가 있어요
        </Button>
      </ChatWrapper>
    </>
  );
};

export default InitComment;
