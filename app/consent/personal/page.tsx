"use client";
import { useLogin } from "@/app/login/hooks/zustand/useLogin";
/* eslint-disable react/no-unescaped-entities */
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { useOffEntireLoading } from "@/util/useOffEntireLoading";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ConsentPersonal = () => {
  const router = useRouter();
  useOffEntireLoading();

  return (
    <PageWrapper
      header={
        <Header
          backFunc={() => {
            router.back();
            useLogin.getState().setIsFromConsent(true);
          }}
        />
      }
    >
      <div className="px-6 flex flex-col gap-3">
        <p className="text-lg text-monoGray6 font-bold">개인정보처리동의서</p>

        <p className="text-sm text-monoGray6">
          <span className="font-bold">윈윈 투게더</span>(이하 '회사' 라고
          합니다)는 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며
          귀하의 개인정보보호에 최선을 다하고 있습니다. 회사는 개인정보보호법에
          근거하여 다음과 같은 내용으로 개인정보를 수집 및 처리하고자 합니다.
        </p>
        <p className="text-sm text-monoGray6">
          다음의 내용을 자세히 읽어보시고 모든 내용을 이해하신 후에 동의 여부를
          결정해주시기 바랍니다.
        </p>
        <div>
          <p className="text-base text-monoGray6 font-semibold">
            제1조(개인정보 수집 및 이용 목적)
          </p>
          <p className="text-sm text-monoGray6">
            이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 목적 이외의
            용도로는 사용되지 않습니다.
          </p>
          <p className="text-sm text-monoGray6">- 서비스 정보의 제공</p>
        </div>
        <div>
          x
          <p className="text-base text-monoGray6 font-semibold">
            제2조(개인정보 수집 및 이용 항목)
          </p>
          <p className="text-sm text-monoGray6">
            회사는 개인정보 수집 목적을 위하여 다음과 같은 정보를 수집합니다.
          </p>
          <p className="text-sm text-monoGray6">
            - 주소 및 계좌번호, 상품 정보, 휴대폰 번호, 서비스 이용 기록, 회사명
          </p>
        </div>
        <div>
          <p className="text-base text-monoGray6 font-semibold">
            제3조(개인정보 보유 및 이용 기간)
          </p>
          <p className="text-sm text-monoGray6">
            1. 수집한 개인정보는 수집·이용 동의일로부터 개인정보 수집·이용
            목적을 달성할 때까지 보관 및 이용합니다.
          </p>
          <p className="text-sm text-monoGray6">
            2. 개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가
            불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
        </div>
        <div>
          <p className="text-base text-monoGray6 font-semibold">
            제4조(동의 거부 관리)
          </p>
          <p className="text-sm text-monoGray6">
            귀하는 본 안내에 따른 개인정보 수집·이용에 대하여 동의를 거부할
            권리가 있습니다. 다만, 귀하가 개인정보 동의를 거부하시는 경우에
            서비스 이용 중 일부 제약의 불이익이 발생할 수 있음을 알려드립니다.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ConsentPersonal;
