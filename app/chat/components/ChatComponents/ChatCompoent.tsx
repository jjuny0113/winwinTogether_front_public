import React from "react";
import InitComment from "./Comment/InitComment";
import { useChatStore } from "../../hooks/zustand/useChatStore";
import WeatherCreatePost from "./Comment/WeatherCreatePost/WeatherCreatePost";
import SelectContents from "./SelectContents";
import CustomCreatePost from "./Comment/CustomCreatePost/CustomCreatePost";
import ProductCreatePost from "./Comment/ProductCreatePost/ProductCreatePost";

const ChatCompoent = () => {
  const { contentType } = useChatStore((state) => ({
    contentType: state.contentType,
  }));
  const viewComponents = (() => {
    switch (contentType) {
      case "WEATHER":
        return <WeatherCreatePost />;
      case "PRODUCT":
        return <ProductCreatePost />;
      default:
        return (
          <>
            <SelectContents />
            <CustomCreatePost />
          </>
        );
    }
  })();
  return (
    <div className="flex flex-col gap-7 mt-8">
      <InitComment />
      {viewComponents}
    </div>
  );
};

export default ChatCompoent;
