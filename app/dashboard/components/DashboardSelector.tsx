import Icon from "@/components/Icon/Icon";
import React from "react";
import Image from "next/image";

interface IDashboardSelector {
  title: string;
  routerName: string;
  onRouterClick: () => void;
  img: string;
}

const DashboardSelector = ({
  title,
  routerName,
  onRouterClick,
  img,
}: IDashboardSelector) => {
  return (
    <div className="h-[108px] rounded-[28px] bg-purpleLight px-4 py-[22px] flex gap-5 justify-center">
      <div className="flex flex-col gap-[13px]">
        <div className="flex gap-[7px] items-center">
          <Icon type="brightLightBulb" />
          <p className="text-[16px] leading-[19px] font-black text-purpleMainHover">
            {title}
          </p>
        </div>
        <div
          className="flex"
          onClick={() => {
            onRouterClick();
          }}
        >
          <p
            dangerouslySetInnerHTML={{ __html: routerName }}
            className="text-[12px] leading-[14px] text-monoGray4"
          ></p>
          <div className="w-6 h-7 flex justify-center items-center">
            <Icon type="rightArrow" />
          </div>
        </div>
      </div>
      <Image
        src={img}
        alt={title}
        width={132}
        height={77}
        className="w-[132px]"
      />
    </div>
  );
};

export default DashboardSelector;
