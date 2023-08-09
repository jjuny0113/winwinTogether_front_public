import React from "react";

interface IDescription {
  mainTitle: string;
  subTitle: string;
  selectPhrases?: string;
}

const Description = ({ mainTitle, subTitle, selectPhrases }: IDescription) => {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <p className="text-monoGray6 text-[21px] leading-[25px] font-black">
        {mainTitle}
      </p>
      <p className="text-purpleMain text-[12px] leading-[14px] font-medium">
        {subTitle}
      </p>
      {selectPhrases ? (
        <p
          className="text-monoGray3 text-[12px] leading-4"
          dangerouslySetInnerHTML={{ __html: selectPhrases }}
        ></p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Description;
