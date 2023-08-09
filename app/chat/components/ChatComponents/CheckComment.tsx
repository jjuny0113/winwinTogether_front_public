import React from "react";
import ChatWrapper from "./ChatWrapper/ChatWrapper";
import Button from "@/components/Button";
import ChatText from "./ChatText";
import ReSelectorButton from "./ReSelectorButton";
import { useChatStore } from "../../hooks/zustand/useChatStore";
import { shallow } from "zustand/shallow";

interface CheckComment {
  isShow: boolean;
  onButtonClick: () => void;
  onReselectButtonClick: () => void;
  className?: React.ComponentProps<"div">["className"];
  buttonDisable: boolean;
}

const CheckComment = ({
  isShow,
  onButtonClick,
  onReselectButtonClick,
  className,
  buttonDisable,
}: CheckComment) => {
  const { setChatStoreState, isFailtoGetContent, showComment } = useChatStore(
    (state) => ({
      setChatStoreState: state.setState,
      isFailtoGetContent: state.isFailtoGetContent,
      showComment: state.showComment,
    }),
    shallow
  );
  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow={isShow}
        className={className}
      >
        <ChatText comment="정확히 확인 하셨나요? 인스타 콘텐츠는 하루에 한번만 만들 수 있어요!" />
      </ChatWrapper>
      <ChatWrapper
        avatar={{
          position: "right",
        }}
        isShow={isShow}
      >
        <Button
          variant={"primary"}
          size={"medium"}
          onClick={(e) => {
            e.preventDefault();
            onButtonClick();
          }}
          disable={buttonDisable}
        >
          확인 했어요!
        </Button>
        {!(showComment.isGenerate || isFailtoGetContent) && (
          <ReSelectorButton
            onClick={() => {
              onReselectButtonClick();
            }}
          />
        )}
      </ChatWrapper>
    </>
  );
};

export default CheckComment;
