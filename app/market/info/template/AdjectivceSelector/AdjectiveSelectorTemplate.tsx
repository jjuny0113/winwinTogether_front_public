import Button from "@/components/Button";
import Header from "@/components/Header";
import React from "react";
import { useInfoStore } from "../../hooks/zustand/useInfoStore";

interface AdjectiveSelectorTemplateProps {
  children: React.ReactNode;
  disable: boolean;
  onClick: () => void;
  mode: "product" | "market";
  onHeaderBackFuncButtonClick: () => void;
  express: string[];
  buttonName?: string;
  isShowHeader?: boolean;
  isLoading?: boolean;
}

const AdjectiveSelectorTemplate = ({
  children,
  disable,
  onClick,
  mode,
  onHeaderBackFuncButtonClick,
  express,
  isLoading = false,
  isShowHeader = true,
  buttonName = "확인",
}: AdjectiveSelectorTemplateProps) => {
  return (
    <div className="flex flex-col  h-full pb-12 min-h-[100vh]">
      {isShowHeader && (
        <Header
          title="세부정보"
          backFunc={() => {
            onHeaderBackFuncButtonClick();
          }}
        />
      )}

      <form className="flex flex-col items-center justify-center gap-[60px] pt-[95px] ">
        <div className="flex flex-col justify-center gap-[6px] items-center">
          <p className="text-[16px] leading-[20px] text-monoGray6">
            {`우리 ${
              mode === "product" ? "제품을 표현하자면?" : "마켓의 분위기는"
            }`}
          </p>
          <div className="flex flex-wrap gap-2">
            {express.map((val, index, self) => (
              <p
                key={val}
                className="text-base text-purpleMainHover font-semibold"
              >
                {val}
                {self.length - 1 !== index ? "," : ""}
              </p>
            ))}
          </div>
          <p className="text-[12px] leading-[14px] text-monoGray6 ">
            최대 5가지 옵션을 선택 할 수 있어요
          </p>
        </div>
        <div className="flex px-6 gap-4">{children}</div>
        <Button
          variant="primary"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          disable={disable}
          isLoading={isLoading}
        >
          {buttonName}
        </Button>
      </form>
    </div>
  );
};

export default AdjectiveSelectorTemplate;
