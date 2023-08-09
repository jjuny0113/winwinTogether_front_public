"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import { useEditInfoListHandler } from "../hooks/handler/useEditInfoListHandler";
import Description from "../../components/Description";

import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import ExpressExample from "../../components/ExpressExample";
import OperationTimeList from "../../components/OperationTimeList";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { useInstagramInputsStore } from "../../hooks/zustand/useInstagramInputsStore";
import Button from "@/components/Button";
import { useSearchParams } from "next/navigation";

const EditList = () => {
  const {
    profileImg,
    register,
    watch,
    marketExpress,
    productExpress,
    isLoading,
    operationTime,
    isLogoutLoading,
    handlelogoutButtonClick,
  } = useEditInfoListHandler();
  const { setState } = useEditInfoStore((state) => ({
    setState: state.setState,
  }));
  const searchParam = useSearchParams();

  const linkRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const linkParam = searchParam.get("link");
    if (linkParam) {
      const linkDivPostition = linkRef.current?.getBoundingClientRect().y;
      window.scrollTo(0, (linkDivPostition ?? 0) - 100);
    }
  }, []);
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full ">
        <LongTimeLoader />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-[60px] pt-[95px] ">
      <Description
        mainTitle="아래 정보를 확인해주세요!"
        subTitle="정보를 토대로 위너분의 마켓 정보 및 온라인 명함이 설정됩니다."
        selectPhrases="터치하면 수정 할 수 있습니다."
      />
      <div
        className="flex flex-col items-center gap-6 relative"
        onClick={() => {
          setState("editType", "profileImg");
        }}
      >
        {profileImg ? (
          <Image
            src={profileImg}
            alt="image"
            width={120}
            height={120}
            className="rounded-full w-40 h-40"
          />
        ) : (
          <Icon type="iconProfile" />
        )}
        <div className="absolute -right-2 bottom-0">
          <Icon type="pencil" />
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <Input
          disable
          placeholder="마켓명"
          register={register("name")}
          watchValue={watch("name")}
          onClick={() => {
            setState("editType", "marketName");
          }}
        />
        <Input
          disable
          placeholder="업종"
          register={register("sector")}
          watchValue={watch("sector")}
          onClick={() => {
            setState("editType", "section");
          }}
        />
        <Input
          disable
          placeholder="마켓 한 줄 소개"
          register={register("marketIntroduction")}
          onClick={() => {
            setState("editType", "introduction");
          }}
        />
        <Input
          disable
          placeholder="마켓 전화번호"
          register={register("phoneNum")}
          onClick={() => {
            setState("editType", "phoneNum");
          }}
        />
        <div
          className="flex flex-col gap-3"
          onClick={() => {
            setState("editType", "address");
          }}
        >
          <Input
            disable
            placeholder="마켓 주소"
            register={register("address")}
          />
          <Input
            disable
            placeholder="상세 주소 입력"
            register={register("addressDetail")}
            watchValue={watch("addressDetail")}
          />
        </div>
        <div
          className="flex flex-col gap-3"
          onClick={() => {
            setState("editType", "mainProduct");
          }}
        >
          <Input
            disable
            placeholder="주력 판매 상품"
            register={register("mainSellingProduct")}
            watchValue={watch("mainSellingProduct")}
          />
          {/* 상품설명 */}
          <Textarea
            placeholder="주력 판매 상품에 대해서 설명해주세요"
            register={register("mainSellingProductDetail")}
            disable
          />
        </div>
        <div
          className="flex flex-col gap-2 border rounded-xl border-purpleMain py-2"
          onClick={() => {
            useInstagramInputsStore
              .getState()
              .setInstaInputsStore("marketExpress", marketExpress);
            setState("editType", "adjMarket");
          }}
        >
          <p className="text-monoGray3 opacity-80 leading-[14px] text-[12px] mx-3">
            마켓 주요 분위기, 특화/차별점
          </p>
          <div className="px-2">
            <ExpressExample expressArr={marketExpress} isEdit />
          </div>
        </div>
        <div
          className="flex flex-col gap-2 border rounded-xl border-purpleMain py-2"
          onClick={() => {
            useInstagramInputsStore
              .getState()
              .setInstaInputsStore("productExpress", productExpress);
            setState("editType", "adjProduct");
          }}
        >
          <p className="text-monoGray3 opacity-80 leading-[14px] text-[12px] mx-3">
            상품 특화/차별점
          </p>
          <div className="px-2">
            <ExpressExample expressArr={productExpress} isEdit />
          </div>
        </div>
        <Input
          disable
          placeholder="마켓 주요 고객층 (ex. 성별 무관, 20대 ~ 30대)"
          register={register("mainTarget")}
          watchValue={watch("mainTarget")}
          isActive={marketExpress.length > 0}
          onClick={() => {
            setState("editType", "mainTarget");
            setState("modalType", "mainTargetSetter");
          }}
        />
        <div className="flex flex-col items-center gap-4" ref={linkRef}>
          <div
            className="flex gap-5 items-center"
            onClick={() => {
              setState("editType", "kakaoUrl");
            }}
          >
            <Icon type="kakaoUrl" />
            <Input
              disable
              placeholder="카카오톡 오픈 프로필"
              register={register("kakaoUrl")}
              width={"276"}
            />
          </div>
          <div
            className="flex gap-5 items-center"
            onClick={() => {
              setState("editType", "instaUrl");
            }}
          >
            <Icon type="instaUrl" />
            <Input
              disable
              placeholder="인스타그램 프로필"
              register={register("instaUrl")}
              width={"276"}
            />
          </div>
          <div
            className="flex gap-5 items-center"
            onClick={() => {
              setState("editType", "naverUrl");
            }}
          >
            <Icon type="naverUrl" />
            <Input
              disable
              placeholder="네이버 스마트스토어"
              register={register("naverBlogUrl")}
              width={"276"}
            />
          </div>
          <Input
            disable
            placeholder="온라인 자사몰/쇼핑몰 플랫폼 주소"
            register={register("shoppingMallUrl")}
            onClick={() => {
              setState("editType", "shoppingMallUrl");
            }}
          />
        </div>
        <div
          className="flex flex-col gap-4"
          onClick={() => {
            setState("editType", "bankInfo");
          }}
        >
          <Input disable placeholder="은행" register={register("bank")} />
          <Input
            disable
            placeholder="예금주"
            register={register("accountHolder")}
          />
          <Input
            disable
            placeholder="계좌번호"
            register={register("account")}
          />
        </div>
        <Input
          disable
          placeholder="마켓 운영 시간"
          register={register("operatingTime")}
          mode="dropdown"
          isActive
          onClick={() => {
            setState("editType", "operationTime");
            setState("modalType", "operationTimeSetter");
            setState("operationTime", operationTime);
          }}
        />
        <OperationTimeList operationTime={operationTime} />

        <Button
          variant="danger"
          size="large"
          isLoading={isLogoutLoading}
          onClick={handlelogoutButtonClick}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default EditList;
