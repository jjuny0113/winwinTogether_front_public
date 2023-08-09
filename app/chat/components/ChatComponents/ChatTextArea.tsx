"use client";
import React from "react";
import ChatWrapper from "./ChatWrapper/ChatWrapper";
import Textarea from "@/components/Textarea/Textarea";
import { UseFormRegisterReturn } from "react-hook-form";
import ChatText from "./ChatText";
import Button from "@/components/Button";
import ReSelectorButton from "./ReSelectorButton";

interface ChatTextAreaProps {
  isShow: boolean;
  register: UseFormRegisterReturn;
  comment: string;
  onButtonClick: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  onReselectButton: () => void;
  isShowReselectButton: boolean;
  disable: boolean;
  errorMessage?: string;
  className: React.ComponentProps<"div">["className"];
}

const ChatTextArea = ({
  isShow,
  register,
  comment,
  onButtonClick,
  disable,
  errorMessage,
  className,
  onReselectButton,
  isShowReselectButton,
}: ChatTextAreaProps) => {
  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow={isShow}
        className={className}
      >
        <ChatText comment={comment} />
      </ChatWrapper>
      <div className="flex flex-col">
        <ChatWrapper
          avatar={{
            position: "right",
          }}
          isShow={isShow}
        >
          <div className="flex flex-col gap-3">
            <Textarea
              register={register}
              placeholder="(최대 500자 이내)"
              width="chat"
              disable={disable}
              errorMessage={errorMessage}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="primary"
                size="x-small"
                disable={disable}
                onClick={onButtonClick}
              >
                확인
              </Button>
              {isShowReselectButton && (
                <ReSelectorButton
                  onClick={() => {
                    onReselectButton();
                  }}
                />
              )}
            </div>
          </div>
        </ChatWrapper>
      </div>
    </>
  );
};

export default ChatTextArea;
