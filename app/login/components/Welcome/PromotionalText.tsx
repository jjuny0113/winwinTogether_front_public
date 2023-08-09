import React from "react";
import { GrInstagram } from "react-icons/gr";
import "./styles.css";

const PromotionalText = () => {
  return (
    <div className="flex flex-col gap-[60px] items-center">
      <GrInstagram fill="#A75AFF" className="promotionalText" />
      <div className="flex flex-col gap-4 items-center">
        <p className="text-2xl text-monoGray6">
          매일 인스타에 어떤 콘텐츠를
          <br />
          올릴지 매번 고민이시죠?
          <br />
          <div className="w-1 h-3" />
          <span className="text-purpleMain font-extrabold">윈윈</span>이
          도와드릴게요!
          <div className="w-1 h-3" />
          콘텐츠 추천과&nbsp;
          <span className="text-purpleMain font-extrabold">위너님</span>의
          <br />
          마켓 특징을 잘 살려서 <br />
          문구를 만들어 드릴께요!
        </p>
      </div>
    </div>
  );
};

export default PromotionalText;
