import React from "react";
import Image from "next/image";
interface ShareUrlExampleProps {
  imgUrl: string;
  title: string;
  subTitle: string;
}
const ShareUrlExample = ({ imgUrl, title, subTitle }: ShareUrlExampleProps) => {
  return (
    <div className="w-52 rounded-md border shadow-xl">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt="url 전달시 img"
          width={208}
          height={120}
          className="h-[120px] w-52 rounded-t-md"
        />
      ) : (
        <div className="bg-monoGray2 h-[120px] rounded-md"></div>
      )}

      <div className="flex flex-col gap-1 p-3">
        <p className="text-base font-semibold text-monoGray6">{title}</p>
        <p className="text-sm font-normal text-monoGray4">{subTitle}</p>
        <p className="text-xs font-normal text-monoGray3">
          www.winwin-together.com
        </p>
      </div>
    </div>
  );
};

export default ShareUrlExample;
