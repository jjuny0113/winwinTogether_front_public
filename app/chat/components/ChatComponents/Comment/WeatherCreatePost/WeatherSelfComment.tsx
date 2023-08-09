"use client";
import React from "react";
import ChatTextArea from "../../ChatTextArea";
import { useWeatherStore } from "@/app/chat/hooks/zustand/useWeatherStore";
import { useForm } from "react-hook-form";
import { shallow } from "zustand/shallow";

import { UseMutateAsyncFunction } from "@tanstack/react-query";
import useChatStore from "@/app/chat/hooks/zustand/useChatStore";
import { useScollDown } from "@/app/chat/hooks/useScollDown";

interface SelfCommentForm {
  content: string;
}

const WeatherSelfComment = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SelfCommentForm>();
  const { select, setState, isCheck, isGenerate } = useWeatherStore(
    (state) => ({
      select: state.select,
      isCheck: state.isCheck,
      isGenerate: state.isGenerate,
      setState: state.setState,
    }),
    shallow
  );
  useScollDown(select === "self", "weatherSelfComment");
  const onSubmit = async (value: SelfCommentForm) => {
    if (value.content.length > 500) {
      setError("content", {
        message: "500자 이하로 입력해주세요.",
      });
      return;
    }
    setState("customValue", value.content);
    setState("isGenerate", true);
  };
  return (
    <ChatTextArea
      isShow={select === "self"}
      register={register("content")}
      comment={"오늘 날씨에 대해서 상세히 설명해 주세요!"}
      disable={isGenerate}
      errorMessage={errors.content?.message}
      onButtonClick={handleSubmit(onSubmit)}
      className="weatherSelfComment"
      isShowReselectButton={!isGenerate}
      onReselectButton={() => {
        setState("select", "");
        reset();
      }}
    />
  );
};

export default WeatherSelfComment;
