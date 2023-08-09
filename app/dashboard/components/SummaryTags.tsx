"use client";
import React from "react";

interface SummaryTagsProps {
  tags: {
    name: string;
    count: number;
  }[];
}

const SummaryTags = ({ tags }: SummaryTagsProps) => {
  return (
    <section className="flex flex-col gap-2 items-center px-4 mb-10">
      <div className="flex flex-col gap-2 py-2 px-5 rounded-2xl w-full bg-gradient-to-r shadow-middleShadow">
        <h2 className="text-monoGray6 font-semibold pt-2 ">
          AI 생성 태그 top 5
        </h2>

        <p className="text-monoGray4 text-xs">
          만들어진 태그는 검색엔진 최적화에 사용됩니다.
        </p>
        <div className="flex flex-col">
          <div className="grid-cols-10 grid">
            <div className="col-span-2 flex items-center min-h-[40px] px-2">
              <p className="text-monoGray6 font-semibold text-base">순위</p>
            </div>
            <div className="col-span-5  flex items-center min-h-[40px] px-2">
              <p className="text-monoGray6 font-semibold text-base">해시태그</p>
            </div>
            <div className="col-span-3  flex items-center min-h-[40px] px-2">
              <p className="text-monoGray6 font-semibold text-base">개수</p>
            </div>
          </div>
          {tags.length === 0 ? (
            <div className="flex flex-col items-center p-4">
              <p className="text-sm text-monoGray3 font-normal">
                콘텐츠 만들기를 통해서 태그를 만들어보세요
              </p>
              <p className="text-sm text-monoGray3 font-normal">
                만들어진 태그는 검색엔진 최적화를
              </p>
              <p className="text-sm text-monoGray3 font-normal">
                이용해 홍보에 활용됩니다.
              </p>
            </div>
          ) : (
            tags.map(({ name, count }, index) => (
              <div key={name} className="grid-cols-10 grid">
                <div className="col-span-2 flex items-center min-h-[40px] px-2 pb-1">
                  <p className="text-monoGray6 font-normal text-base">
                    {index + 1}
                  </p>
                </div>
                <div className="col-span-5 flex items-center min-h-[40px] px-2 pb-1">
                  <p className="text-purpleMain font-semibold text-base">
                    {name}
                  </p>
                </div>
                <div className="col-span-3 flex items-center min-h-[40px] px-2 pb-1">
                  <p className="text-monoGray6 font-normal text-base">
                    {count}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SummaryTags;
