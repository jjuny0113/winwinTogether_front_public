"use client";
import React from "react";
import ChatWrapper from "../ChatWrapper/ChatWrapper";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import { shallow } from "zustand/shallow";
import ChatText from "../ChatText";

import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useScollDown } from "@/app/chat/hooks/useScollDown";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

interface GenerateCommentProps {
  isLoading: boolean;
  onRegenerateButtonClick: () => Promise<void>;
}

const GenerateComment = ({
  isLoading,
  onRegenerateButtonClick,
}: GenerateCommentProps) => {
  const { isGenerate, isFailtoGetContent, contentId, isNotGenerageTags } =
    useChatStore(
      (state) => ({
        isGenerate: state.showComment.isGenerate,
        isFailtoGetContent: state.isFailtoGetContent,
        contentId: state.contentId,
        isNotGenerageTags: state.isNotGenerageTags,
      }),
      shallow
    );
  const onEntireLoading = useOnEntireLoading();
  useScollDown(isGenerate, "generate");

  const router = useRouter();
  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow={isGenerate}
        className="generate"
      >
        {isLoading && (
          <>
            <ChatText comment="인스타 포스트 내용과 해시태그 생성중입니다" />
            <div className="flex justify-center w-[66%] h-24 items-end">
              <LongTimeLoader />
            </div>
          </>
        )}

        {isNotGenerageTags ? (
          <>
            <ChatText
              comment={`죄송해요. 실수로 태그를 빼먹고 만들었어요.🥺 \n다시 만들께요!`}
            />
          </>
        ) : (
          !contentId &&
          isFailtoGetContent && (
            <>
              <ChatText
                comment={`인스타 포스트 내용과 해시태그 생성하는데 실패했습니다.\n 잠시후 다시 시도해보세요!`}
              />
            </>
          )
        )}
        {contentId && (
          <>
            <ChatText
              comment={`생성이 완료되었습니다. \n콘텐츠보관함으로 이동해서 콘텐츠를 확인해보시겠어요?`}
            />
          </>
        )}
      </ChatWrapper>
      <>
        <ChatWrapper
          avatar={{
            position: "right",
          }}
          isShow={isNotGenerageTags || (!contentId && isFailtoGetContent)}
        >
          <Button
            variant={"primary"}
            size={"medium"}
            onClick={async () => {
              if (!onRegenerateButtonClick) return;
              await onRegenerateButtonClick();
            }}
          >
            다시 만들어 주세요!
          </Button>
        </ChatWrapper>
        <ChatWrapper
          avatar={{
            position: "right",
          }}
          isShow={!!contentId}
        >
          <Button
            size="x-small"
            variant="primary"
            onClick={async (e) => {
              e.preventDefault();

              onEntireLoading();
              router.push("/contents");
            }}
          >
            이동하기
          </Button>
        </ChatWrapper>
        <div className="pb-3" />
      </>
    </>
  );
};

export default GenerateComment;
