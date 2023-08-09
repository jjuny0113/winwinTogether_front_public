import Icon from "@/components/Icon/Icon";

interface ITopBarProps {
  children: string;
}

const TopBar = ({ children }: ITopBarProps) => {
  return (
    <div className="flex flex-row w-full justify-between pt-3 px-[27px] h-16 items-center top-0 absolute">
      <div>
        <div className="cursor-pointer">
          <Icon type="hamburger" />
        </div>
      </div>

      <div>
        <p className="font-black text-xl leading-6 text-monoGray6">
          {children}
        </p>
      </div>
      <div className="flex flex-row items-center gap-[20px]">
        <div className="cursor-pointer">
          <Icon type="share" />
        </div>

        <div className="cursor-pointer">
          <Icon type="pencil" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
