import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useChatStore } from "../zustand/useChatStore";
import { useWeatherStore } from "../zustand/useWeatherStore";
import { shallow } from "zustand/shallow";

export const useGetTodayWeather = () => {
  const { contentType } = useChatStore((state) => ({
    contentType: state.contentType,
  }));
  const { select } = useWeatherStore(
    (state) => ({
      select: state.select,
    }),
    shallow
  );
  const getTodayWeather = async () => {
    const query = gql`
      query {
        weather {
          status
          result {
            weather
            temp
            maxTemp
            minTemp
            humidity
            windSpeed
            cloudiness
            rain
          }
        }
      }
    `;

    const result: SuccessResponse | failResponse =
      await getGraphQLClient.request(query);
    if (result.weather.status === "error") {
      throw new Error(result.weather.message);
    }
    return result.weather.result;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: getTodayWeather,
    enabled: contentType === "WEATHER",
  });

  return {
    data,
    isLoading,
  };
};

export interface TodayWeather {
  weather: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  cloudiness?: string;
  rain?: string;
  windSpeed?: string;
}

interface SuccessResponse {
  weather: {
    status: "ok";
    result: TodayWeather;
  };
}

interface failResponse {
  weather: {
    status: "error";
    message: "날씨정보를 가져오는데 실패했습니다.";
  };
}
