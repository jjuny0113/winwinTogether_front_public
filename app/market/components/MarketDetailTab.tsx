import { MarketInfoStoreState } from "../[id]/hook/zustand/useMarketInfoStore";

export interface MarketDetailTabProps {
  tabs: {
    displayName: MarketInfoStoreState["tab"];
  }[];
  selectedTab: string;
  onTabClick: (tab: MarketInfoStoreState["tab"]) => void;
}

const MarketDetailTab = ({
  tabs,
  selectedTab,
  onTabClick,
}: MarketDetailTabProps) => {
  return (
    <div className="flex w-full h-14 justify-between border-b-[1px] border-purpleMain mt-4">
      {tabs.map((tab) => (
        <div
          key={tab.displayName}
          className={`text-xs w-[50%] h-14 items-center font-medium flex flex-col ${
            tab.displayName === selectedTab
              ? `text-monoGray6`
              : `text-monoGray3`
          }`}
          onClick={() => {
            onTabClick(tab.displayName);
          }}
        >
          <div className="h-14 text-base flex items-center">
            <p>{tab.displayName}</p>
          </div>
          {selectedTab === tab.displayName && (
            <div className="bg-purpleMain w-full h-[5px] rounded-xl"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MarketDetailTab;
