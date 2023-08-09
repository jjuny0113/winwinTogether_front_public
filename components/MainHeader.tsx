import React from "react";
import Icon from "@/components/Icon/Icon";
import moment from "moment";

const MainHeader = () => {
  return (
    <header className="w-full py-3 px-6 flex items-center mt-5 ">
      <div className=" flex flex-1" onClick={() => {}}>
        <Icon type="hamburger" />
      </div>
      <div className="flex flex-col items-center flex-4  justify-center">
        <p className="text-[21px] leading-[25px] font-black text-monoGray6">
          Today
        </p>
        <p className="text-monoGray6 font-medium text-[12px] leading-[14px]">
          {moment().format("MMMM D YYYY")}
        </p>
      </div>
      <div className="flex-1 flex justify-end">
        <Icon type="marketBlue" />
      </div>
    </header>
  );
};

export default MainHeader;
