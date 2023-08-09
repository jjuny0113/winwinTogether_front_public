"use client";
import React from "react";
import ChatWrapper from "../../ChatWrapper/ChatWrapper";
import ChatText from "../../ChatText";
import { useForm } from "react-hook-form";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import { shallow } from "zustand/shallow";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea/Textarea";
import { ContentType } from "@/app/market/info/constants";
import ChatTextArea from "../../ChatTextArea";
import { useScollDown } from "@/app/chat/hooks/useScollDown";

interface SelfCommentForm {
  content: string;
}
const SelfComment = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SelfCommentForm>();
  const { contentType, setOptionValue, isFinish, setShowComment, setState } =
    useChatStore(
      (state) => ({
        isFinish: state.showComment.isFinish,
        contentType: state.contentType,
        setOptionValue: state.setOptionValue,

        setShowComment: state.setShowComment,
        setState: state.setState,
      }),
      shallow
    );
  useScollDown(contentType === ContentType.SELF, "selfComment");
  const onSubmit = (value: SelfCommentForm) => {
    if (value.content.length > 500) {
      setError("content", {
        message: "500자 이하로 입력해주세요.",
      });
      return;
    }
    setShowComment("isFinish", true);
    setOptionValue("SELF", value.content);
  };

  return (
    <ChatTextArea
      isShow={contentType === ContentType.SELF}
      register={register("content")}
      comment={"어떤 콘텐츠를 생각해 두셨나요?<br/>(구체적으로 써줄 수록 좋은 글을 써드릴 수 있어요)<br/>예) 오늘은 철원에서 갓 도정한 햅쌀을 가져왔음. 보다 맛있는 밥을 제공 가능"}
      disable={isFinish}
      errorMessage={errors.content?.message}
      onButtonClick={handleSubmit(onSubmit)}
      className="selfComment"
      isShowReselectButton={!isFinish}
      onReselectButton={() => {
        setState("contentType", "");
        reset();
      }}
    />
  );
};

export default SelfComment;
