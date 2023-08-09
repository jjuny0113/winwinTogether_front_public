import EmptyImgUpload from "@/app/market/components/EmptyImgUpload";
import { FaPencil } from "react-icons/fa6";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import React from "react";
export interface MarketImgViewerProps {
  marketImgs: {
    id: number;
    url: string;
  }[];
  isEdit: boolean;
  editButtonClick: () => void;
}
const MarketImgViewer = ({
  marketImgs,
  isEdit,
  editButtonClick,
}: MarketImgViewerProps) => {
  if (marketImgs.length === 0) {
    return <EmptyImgUpload />;
  }
  return (
    <div className="relative">
      <ImageCarousel imgUrls={marketImgs.map((v) => v.url) ?? []} />
      {isEdit && (
        <div className="absolute bottom-4 right-4" onClick={editButtonClick}>
          <FaPencil size={18} color="#A75AFF"/>
        </div>
      )}
    </div>
  );
};

export default MarketImgViewer;
