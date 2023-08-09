"use client";
import React from "react";
import DescriptionWeather from "./DescriptionWeather";
import CheckComment from "./CheckWeatherComment";
import GenerateComment from "../GenerateComment";
import WeatherSelfComment from "./WeatherSelfComment";
import { useCreateWeatherPost } from "@/app/chat/hooks/query/useCreateWeatherPost";
import CheckWeatherComment from "./CheckWeatherComment";

const WeatherCreatePost = () => {
  const { mutationCreateWeatherPostAsync, isCreateWeatherPostLoading } =
    useCreateWeatherPost();
  return (
    <>
      <DescriptionWeather />
      <WeatherSelfComment />
      <CheckWeatherComment mutationAsync={mutationCreateWeatherPostAsync} />
      <GenerateComment
        isLoading={isCreateWeatherPostLoading}
        onRegenerateButtonClick={async () => {
          await mutationCreateWeatherPostAsync();
        }}
      />
    </>
  );
};

export default WeatherCreatePost;
