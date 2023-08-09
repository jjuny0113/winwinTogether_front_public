import React from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

const BannerInfo = () => {
  return (
    <div className="flex flex-col gap-[60px] items-center">
      <Icon type="idCard" width={133} height={178} />

      <div className="flex flex-col gap-4 items-center">
        <p className="text-xl text-monoGray6">
          계좌번호, 판매상품 등 여러 정보를
          <br />
          고객 분들에게 전달하기 힘드시죠?
          <br />
          <span className="text-purpleMain font-extrabold">윈윈</span>이가
          도와드릴께요!
          <br />
          몇가지 정보만 입력해주세요.
          <br /> 온라인 명함을 만들어 드릴께요.
          <br /> 쉽게 마켓 정보를 고객에게 전달해보세요!
        </p>
      </div>
    </div>
  );
};

export default BannerInfo;
