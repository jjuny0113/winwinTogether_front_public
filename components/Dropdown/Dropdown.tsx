import { ForwardRefSubComponent } from "@/app/@types/Component";
import React, { forwardRef, useRef, useState } from "react";
import { Options } from "./Options";
import { Select } from "./Select";
import OptionWrapper from "./OptionWrapper";
import useOutsideAlerter from "@/util/useOutsideAlerter";

const Label = ({ children }: { children: React.ReactNode }) => {
  return <label>{children}</label>;
};

interface IDropdown {
  children: React.ReactNode;
  selectValue: string;
  placeholder?: string;
  width?: number;
}

interface IDropdownContext {
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
  selectValue: string;
  placeholder?: string;
  width?: number;
}

export const DropdownContext = React.createContext<IDropdownContext | null>(
  null
);

const Dropdown = forwardRef(
  (
    {
      children,
      selectValue,
      placeholder = "옵션을 선택해주세요",
      width = 342,
    }: IDropdown,
    ref: React.Ref<HTMLFormElement>
  ) => {
    const [showList, setShowList] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(divRef, () => {
      setShowList(false);
    });
    return (
      <DropdownContext.Provider
        value={{
          showList,
          setShowList,
          selectValue,
          placeholder,
          width,
        }}
      >
        <form
          className={`bg-white relative`}
          style={{
            width,
          }}
          ref={ref}
        >
          <div ref={divRef}>{children}</div>
        </form>
      </DropdownContext.Provider>
    );
  }
) as ForwardRefSubComponent<IDropdown, ISubComponent>;

interface ISubComponent {
  Label: typeof Label;
  Select: typeof Select;
  Options: typeof Options;
  OptionWrapper: typeof OptionWrapper;
}

Dropdown.displayName = "Dropdown";
Dropdown.Label = Label;
Dropdown.Select = Select;
Dropdown.Options = Options;
Dropdown.OptionWrapper = OptionWrapper;

export default Dropdown;
