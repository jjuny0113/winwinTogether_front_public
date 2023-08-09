"use client";
import React, { useEffect } from "react";
import ChatWrapper from "./ChatWrapper/ChatWrapper";
import ChatText from "./ChatText";

import { shallow } from "zustand/shallow";
import { useChatStore } from "../../hooks/zustand/useChatStore";
import Button from "@/components/Button";
import { ContentType } from "@/app/market/info/constants";
import { useScollDown } from "../../hooks/useScollDown";
import ReSelectorButton from "./ReSelectorButton";

const SelectContents = () => {
  const { isSelected, setState } = useChatStore((state) => ({
    isSelected: state.showComment.isSelected,
    setState: state.setState,
  }));

  useScollDown(isSelected, "howContent");

  return (
    <>
      <ChatWrapper
        avatar={{
          position: "left",
        }}
        isShow={isSelected}
        className="howContent"
      >
        <ChatText comment="제가 추천해드리는 콘텐츠에요.<br/>(추후 더많은 콘텐츠를 추천해 드릴깨요!)" />
      </ChatWrapper>
      <ChatWrapper
        avatar={{
          position: "right",
        }}
        isShow={isSelected}
      >
        <>
          {[
            {
              name: "날씨와 분위기",
              onClick: () => {
                setState("contentType", ContentType.WEATHER);
              },
            },
            {
              name: "등록 상품들",
              onClick: () => {
                setState("contentType", ContentType.PRODUCT);
              },
            },

            // {
            //   name: "나의 잠재고객들에게",
            //   onClick: () => {
            //     setState("contentType", ContentType.POTENTIAL);
            //   },
            // },
            // {
            //   name: "윈윈의 추천주제",
            //   onClick: () => {
            //     setState("contentType", ContentType.RECOMMEND);
            //   },
            // },
          ].map(({ name, onClick }) => (
            <Button
              size="medium"
              variant="primary"
              key={name}
              onClick={(e) => {
                e.preventDefault();
                onClick();
              }}
            >
              {name}
            </Button>
          ))}
          <ReSelectorButton
            onClick={() => {
              setState("showComment.isSelected", false);
            }}
          />
        </>
      </ChatWrapper>
    </>
  );
};

export default SelectContents;
