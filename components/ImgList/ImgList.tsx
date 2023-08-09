"use client";
import React, { MutableRefObject, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import Image from "next/image";
import Icon from "../Icon/Icon";

interface ImgListProps {
  imgUrls: string[];
  children: React.ReactNode;
  handleDeleteIconClick: (url: string, index: number) => void;
}

const ImgList = ({
  imgUrls,
  children,
  handleDeleteIconClick,
}: ImgListProps) => {
  const ref = useRef(null);
  const { events } = useDraggable(
    ref as unknown as MutableRefObject<HTMLElement>
  );

  return (
    <section
      className="flex gap-3 overflow-auto scrollbar-hide z-10 h-36 items-center px-6"
      ref={ref}
      {...events}
    >
      <div className="flex justify-start items-end w-[120px] h-[120px]">
      {children}
      </div>
      {imgUrls.map((url, index) => (
        <div
          key={url}
          className="relative w-[120px] h-[120px] flex justify-start items-end"
        >
          <Image
            src={url}
            alt={"item"}
            width={110}
            height={110}
            className="w-[110px] h-[110px] rounded-xl min-w-[110px] min-h-[110px]"
          />
          <div
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => {
              handleDeleteIconClick(url, index);
            }}
          >
            <Icon type="circleCancel" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ImgList;
