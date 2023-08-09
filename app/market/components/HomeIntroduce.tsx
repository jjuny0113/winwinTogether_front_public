"use client";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import { BankListType } from "@/app/market/info/constants";

import moment from "moment";
import Icon from "@/components/Icon/Icon";
import { Circle } from "./Circle";
import { OperationTimeType } from "../info/hooks/query/getMarketInfo";
import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import { toast } from "react-toastify";
import OperationTimeList, {
  OperationTimeListProps,
} from "../info/components/OperationTimeList";

export interface HomeIntroduceProps {
  coordinate_longitude: string;
  coordinate_latitude: string;
  address: string;
  addressDetail?: string;
  bank?: BankListType;
  accountHolder?: string;
  account?: string;
  operatingTime: OperationTimeType[];
}

const HomeIntroduce = ({
  coordinate_longitude,
  coordinate_latitude,
  address,
  accountHolder,
  addressDetail,
  bank,
  account,
  operatingTime,
}: HomeIntroduceProps) => {
  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(
    () => ({
      lat: Number(coordinate_latitude),
      lng: Number(coordinate_longitude),
    }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: libraries as any,
  });

  const dayOfWeek = (() => {
    const todayTimestamp = moment().valueOf();
    const weekDay = moment(todayTimestamp).weekday() as
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7; // 일0 ~ 토6;
    const dayArr = ["일", "월", "화", "수", "목", "금", "토"];
    return dayArr[weekDay] as "월" | "화" | "수" | "목" | "금" | "토" | "일";
  })();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-full">
        <LongTimeLoader />
      </div>
    );
  }
  return (
    <div className="w-full py-6 px-8 flex flex-col gap-4">
      <div className="text-[#111111] font-semibold  flex flex-col justify-center gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-black font-semibold text-base flex items-center gap-2">
            <Circle />
            매장 위치
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-black font-medium text-sm">
            {address} {addressDetail ? addressDetail : ""}
          </p>
          <Button
            variant={"primary"}
            size={"x-small"}
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${address} ${addressDetail ? addressDetail : ""}`
              );
              toast(
                `주소가 복사되었습니다.\n ${address} ${
                  addressDetail ? addressDetail : ""
                }`
              );
            }}
            className="min-w-[64px]"
          >
            주소 복사
          </Button>
        </div>
      </div>
      <GoogleMap
        options={mapOptions}
        zoom={17}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "200px" }}
        onLoad={() => console.log("Map Component Loaded...")}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log("Marker Loaded")}
        />
      </GoogleMap>
      {bank && account && (
        <div className="bg-white rounded-2xl w-full flex flex-col text-black  gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-black font-semibold text-base flex  items-center gap-2">
              <Circle />
              계좌번호
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-[#111111]">
              {bank}은행 &nbsp;
              {account}({accountHolder})
            </p>

            <Button
              variant={"primary"}
              size={"x-small"}
              onClick={async () => {
                await navigator.clipboard.writeText(`${bank}은행 ${account} 예금주: ${accountHolder}`);
                toast(
                  `계좌정보가 복사되었습니다. \n ${bank}은행 ${account} 예금주: ${accountHolder}`
                );
              }}
            >
              계좌 복사
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl w-full flex flex-col text-black  gap-2">
        <div className="flex gap-3 items-center">
          <h3 className="text-black font-semibold text-base flex  items-center gap-2">
            <Circle />
            영업 시간
          </h3>
        </div>
        <OperationTimeList
          operationTime={
            operatingTime as OperationTimeListProps["operationTime"]
          }
          dayOfWeek={dayOfWeek}
        />
      </div>
    </div>
  );
};

export default HomeIntroduce;
