import { Metadata } from "next";
import {
  QuerySuccessResponse,
  getMarketInfo,
} from "../info/hooks/query/getMarketInfo";

export class GetMarketInfoMetaData {
  private constructor(
    private readonly marketInfo: QuerySuccessResponse["marketInfo"]["result"],
    private readonly openGraph: GetMarketInfoOpenGraph
  ) {}

  static getMetaData(
    marketInfo: QuerySuccessResponse["marketInfo"]["result"],
    previousImages: any[]
  ) {
    return new GetMarketInfoMetaData(
      marketInfo,
      new GetMarketInfoOpenGraph(marketInfo, previousImages)
    ).getData();
  }

  private async getData(): Promise<Metadata> {
    return {
      title: this.title,
      description: this.description,
      keywords: this.getkeywords(),
      bookmarks: this.bookmarks,
      openGraph: this.openGraph.getOpenGraph(),
    };
  }

  private get title() {
    return this.marketInfo.market_name;
  }

  private get description() {
    return `${this.marketInfo.market_name}${
      this.marketInfo.marketIntroduction
        ? ` - ${this.marketInfo.marketIntroduction}`
        : ""
    }`;
  }

  private getkeywords() {
    const roadAddress = (this.marketInfo.address.match(/\((.*?)\)/) ??
      [])[0]?.replace(/\(|\)/g, "");
    return `${
      this.marketInfo.mostFrequentTags.length > 0
        ? `${this.marketInfo.mostFrequentTags.map((v) => v.name).join(", ")},`
        : ``
    }${this.marketInfo.mostFrequentTags
      .map((v) => v.name.replace("#", ""))
      .join(", ")} ${roadAddress}, ${roadAddress}${this.marketInfo.sector}, ${
      this.marketInfo.main_selling_product
    } : ${this.marketInfo.main_selling_product_detail}`;
  }

  private get bookmarks() {
    return `${this.marketInfo.market_name} - 윈윈투게더`;
  }
}

class GetMarketInfoOpenGraph {
  constructor(
    private readonly marketInfo: QuerySuccessResponse["marketInfo"]["result"],
    private readonly previousImages: string[]
  ) {}

  getOpenGraph() {
    return {
      title: this.title,
      ...this.getImages(),
      ...this.getDescription(),
      url: this.getUrl(),
      type: this.type,
      siteName: this.siteName,
    };
  }

  private get title() {
    return `${this.marketInfo.market_name} - 윈윈투게더`;
  }

  private getImages() {
    return {
      ...(this.marketInfo.market_imgs[0]
        ? {
            images: [
              this.marketInfo.market_imgs[0].url,
              ...this.previousImages,
            ],
          }
        : {
            images:
              "https://winwin-together-asset.s3.ap-northeast-2.amazonaws.com/winwin_color_X4.png",
            ...this.previousImages,
          }),
    };
  }

  private get siteName() {
    return `${this.marketInfo.market_name} - 윈윈투게더`;
  }

  private getDescription() {
    return {
      ...(this.marketInfo.marketIntroduction
        ? { description: this.marketInfo.marketIntroduction }
        : {}),
    };
  }

  private getUrl() {
    return `https://winwin-together.com/market/${this.marketInfo.id}`;
  }

  private get type() {
    return "website";
  }
}
