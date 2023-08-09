import React from "react";
import Image from "next/image";
import moment from "moment";
import Icon from "@/components/Icon/Icon";
import { handlingWordiness } from "@/util/handlingWordiness";
import { putColonPrice } from "@/util/putColonPrice";

interface InstaViewerProps {
  profileImgUrl: string | null;
  marketName: string;
  createAt: number;
  content: string;
  tags: {
    id: number;
    name: string;
  }[];
  instaPostOptions: {
    id: number;
    key: string;
    option: string;
  }[];
}

const InstaViewer = ({
  profileImgUrl,
  marketName,
  createAt,
  content,
  tags,
  instaPostOptions,
}: InstaViewerProps) => {
  const topic = (() => {
    switch (instaPostOptions[0].key) {
      case "SELF":
        return instaPostOptions[0].option;
      case "WEATHER":
        return "오늘의 날씨";
      case "name":
        return (
          <div className="flex gap-1 items-center">
            <p className="text-sm text-monoGray6">등록상품 : </p>
            <p className="text-sm text-purpleMain font-semibold">
              {handlingWordiness(instaPostOptions[0].option, 15)}
            </p>
            <p className="text-xs text-monoGray6">
              ({putColonPrice(Number(instaPostOptions[1].option))}원)
            </p>
          </div>
        );
      default:
        return "";
    }
  })();
  return (
    <div className="flex flex-col gap-2 px-6">
      <header className="flex items-center gap-2 h-12">
        {profileImgUrl ? (
          <Image
            src={profileImgUrl}
            alt={"avatar"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
        ) : (
          <Icon type="smallprofile" />
        )}
        <div className="flex items-center gap-1">
          <p className="text-sm text-monoGray6 font-bold">{marketName}</p>
          <p className="text-sm text-monoGray6 font-medium">
            ﹒&nbsp;{moment(createAt).utc().format("YYYY-MM-DD")}
          </p>
        </div>
      </header>
      <div className="min-h-[350px] flex flex-col justify-center items-center rounded-xl bg-monoGray1 gap-4 p-5">
        <Image
          src="/512pxLogoImg.png"
          width={100}
          height={100}
          alt="메인 케릭터"
          className="rounded-full"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-base text-monoGray6 font-medium">
            아래 주제로 만들어진 인스타 문구 입니다.
          </p>
          <div className="text-sm text-monoGray6 font-medium break-keep flex">
            ‣&nbsp;{topic}
          </div>
          <p className="text-sm text-monoGray3 font-medium">
            (문구와 태그를 인스타 콘텐츠 올리실 때 활용하세요.)
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-monoGray6 font-medium">
          <span className="text-sm text-monoGray6 font-bold">윈윈</span>님 외
          <span className="text-sm text-monoGray6 font-bold">
            &nbsp; 여러 명
          </span>
          이 좋아합니다.
        </p>
      </div>
      <div>
        <p className="text-sm text-monoGray6 font-bold">{marketName}</p>
        <p className="text-sm text-monoGray6 font-medium break-keep">
          {content}
        </p>
      </div>
      <div className="flex gap-1 flex-wrap">
        {tags.map((tag) => (
          <p className="text-sm text-monoGray6 font-semibold" key={tag.id}>
            {tag.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InstaViewer;
