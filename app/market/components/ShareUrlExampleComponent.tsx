import React from "react";
import ShareUrlExample from "./ShareUrlExample";

interface ShareUrlExampleComponentProps {
  // mode: "마켓사진" | "상품사진";
  children: React.ReactNode;
  mainImg: string;
  title: string;
  subTitle: string;
  message: string;
}

const ShareUrlExampleComponent = ({
  children,
  mainImg,
  title,
  subTitle,
  message,
}: ShareUrlExampleComponentProps) => {
  return (
    <div className="flex flex-col gap-5 px-5">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-purpleMain">{message}</p>
        <p className="text-sm font-semibold text-monoGray5">
          url을 공유했을 때 예시
        </p>
      </div>
      <ShareUrlExample imgUrl={mainImg} title={title} subTitle={subTitle} />
      <div className="flex justify-center pt-14">{children}</div>
    </div>
  );
};

export default ShareUrlExampleComponent;
