import React from "react";

interface ExpressExampleProps {
  expressArr: string[];
  isEdit?: boolean;
}

const ExpressExample = ({
  expressArr,
  isEdit = false,
}: ExpressExampleProps) => {
  return (
    <>
      {expressArr.length > 0 && (
        <div className={`flex flex-wrap gap-1  ${isEdit ?"":"w-[342px]" }`}>
          {expressArr.map((express) => (
            <div
              key={express}
              className="px-3 py-1 justify-center items-center rounded-full border border-purpleMainHover bg-purpleMainHover"
            >
              <p className="text-monoGray1 text-[8px] leading-[12px]">
                {express}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ExpressExample;
