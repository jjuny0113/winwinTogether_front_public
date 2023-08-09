"use client";
import React from "react";
import SelfComment from "./SelfComment";
import CheckComment from "../CheckComment";
import GenerateComment from "../GenerateComment";
import { useCreateCustomPost } from "@/app/chat/hooks/query/useCreateCustomPost";

const CustomCreatePost = () => {
  const { isCreateCustomPostLoading, mutationCreateCustomPostAsync } =
    useCreateCustomPost();
  return (
    <>
      <SelfComment />
      <CheckComment mutationAsync={mutationCreateCustomPostAsync} />
      <GenerateComment
        isLoading={isCreateCustomPostLoading}
        onRegenerateButtonClick={async () => {
          await mutationCreateCustomPostAsync();
        }}
      />
    </>
  );
};

export default CustomCreatePost;
