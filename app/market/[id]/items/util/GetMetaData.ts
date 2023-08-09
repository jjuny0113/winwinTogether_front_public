import { QuerySuccessResponse } from "@/app/market/info/hooks/query/getMarketInfo";
import { QueryItemSuccessResponse } from "../hooks/query/getItem";
import { Metadata } from "next";

export class GetItemMetaData {
  private constructor(
    private readonly marketInfo: QuerySuccessResponse["marketInfo"]["result"],
    private readonly item: QueryItemSuccessResponse["item"]["result"],
    private readonly getItemOpenGraph: GetItemOpenGraph
  ) {}

  static getMetaData(
    marketInfo: QuerySuccessResponse["marketInfo"]["result"],
    item: QueryItemSuccessResponse["item"]["result"],
    previousImages: any[]
  ): Metadata {
    return new GetItemMetaData(
      marketInfo,
      item,
      new GetItemOpenGraph(marketInfo, item, previousImages)
    ).getData();
  }

  private getData() {
    return {
      title: this.title,
      description: this.getDescription(),
      keywords: this.getKeywords(),
      bookmarks: this.bookmarks,
      openGraph: this.getItemOpenGraph.getData(),
    };
  }

  private get title() {
    return `${this.marketInfo.market_name} | 판매상품 - ${this.item.name} : 윈윈투게더`;
  }

  private getRoadAddress() {
    return (this.marketInfo.address.match(/\((.*?)\)/) ?? [])[0]?.replace(
      /\(|\)/g,
      ""
    );
  }

  private getDescription() {
    const roadAddress = this.getRoadAddress();
    return `${this.marketInfo.market_name} / ${this.item.name} ${
      this.marketInfo.mostFrequentTags.length > 0
        ? `[해시태그]: ${this.marketInfo.mostFrequentTags
            .map((v) => v.name)
            .join("/ ")}, [특징]: ${this.marketInfo.mostFrequentTags
            .map((v) => v.name.replace("#", ""))
            .join("/ ")} ${roadAddress}, ${roadAddress}${
            this.marketInfo.sector
          },`
        : ""
    } [상품명]: ${this.item.name} ${this.item.description}/ ${
      this.item.mall_url && `[판매링크]: ${this.item.mall_url}`
    } `;
  }

  private getKeywords() {
    const roadAddress = this.getRoadAddress();
    return `${
      this.marketInfo.mostFrequentTags.length > 0
        ? `[해시태그] ${this.marketInfo.mostFrequentTags
            .map((v) => v.name)
            .join(", ")}/ [특징],${this.marketInfo.mostFrequentTags
            .map((v) => v.name.replace("#", ""))
            .join(", ")}`
        : ""
    }  [마켓주소] ${roadAddress}${this.marketInfo.sector}/ [상품명] ${
      this.item.name
    } ${this.item.description}, ${
      this.item.mall_url && `[판매링크] ${this.item.mall_url}`
    }`;
  }

  private get bookmarks() {
    return `${this.marketInfo.market_name} | 판매상품 : ${this.item.name} - 윈윈투게더 `;
  }
}

class GetItemOpenGraph {
  constructor(
    private readonly marketInfo: QuerySuccessResponse["marketInfo"]["result"],
    private readonly item: QueryItemSuccessResponse["item"]["result"],
    private readonly previousImages: string[]
  ) {}

  getData() {
    return {
      title: this.title,
      siteName: this.siteName,
      description: this.description,
      url: this.getUrl(),
      type: this.type,
      ...this.getImages(),
    };
  }

  private get title() {
    return `${this.marketInfo.market_name}님의 판매상품 ${this.item.name} - 윈윈투게더`;
  }

  private getImages() {
    return {
      ...(this.item.market_item_imgs[0]
        ? {
            images: [this.item.market_item_imgs[0].url, ...this.previousImages],
          }
        : {
            images: [
              "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
              ...this.previousImages,
            ],
          }),
    };
  }

  private get siteName() {
    return `${this.marketInfo.market_name} | 판매상품 : ${this.item.name} - 윈윈투게더`;
  }

  private get description() {
    return `상품명: ${this.item.name}, 상품 설명: ${this.item.description}, ${
      this.item.mall_url && `판매 링크: ${this.item.mall_url}`
    }`;
  }

  private getUrl() {
    return `https://winwin-together.com/market/${this.marketInfo.id}/items/${this.item.id}`;
  }

  private get type() {
    return "website";
  }
}
