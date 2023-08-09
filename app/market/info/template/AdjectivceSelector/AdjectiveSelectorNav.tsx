import React, { useEffect } from "react";
import { ADJECTIVES, ADJECTIVES_Type } from "./constants";
import { useInstagramInputsStore } from "../../hooks/zustand/useInstagramInputsStore";

const AdjectiveSelectorNav = () => {
  const { navValue, setInstaInputsStore } = useInstagramInputsStore(
    (state) => ({
      navValue: state.navValue,
      setInstaInputsStore: state.setInstaInputsStore,
    })
  );
  useEffect(() => {
    setInstaInputsStore("navValue", "혁신과 독창성");
  }, []);
  return (
    <nav className="grid grid-rows-5 w-[22%] min-h-[266px]">
      {Object.keys(ADJECTIVES).map((_group) => {
        const group = _group as keyof ADJECTIVES_Type;
        return (
          <div
            key={group}
            className={`${
              navValue === group
                ? " border-r-2 border-purpleMain bg-purpleLight"
                : ""
            } min-h-[50px] min-w-[70px] flex items-center px-2 cursor-pointer transition-all duration-200`}
            onClick={() => {
              setInstaInputsStore("navValue", group);
            }}
            
          >
            <p className="text-purpleMain text-[12px] leading-[16px] break-keep">
              {group}
            </p>
          </div>
        );
      })}
    </nav>
  );
};

export default AdjectiveSelectorNav;
