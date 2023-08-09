import Script from "next/script";

interface IMarketHeaderProps {}

const MarketHeader = ({}: IMarketHeaderProps) => {
  return (
    <Script
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4bfd12f8b22dbd2b712b8bf34a32cfdc&libraries=services,clusterer&autoload=false"
      strategy="beforeInteractive"
    />
  );
};

export default MarketHeader;
