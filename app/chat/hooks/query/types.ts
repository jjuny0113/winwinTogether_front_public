import { ValueOf } from "@/app/@types/ValueOf";
import { ContentType } from "@/app/market/info/constants";

export interface CreatePostDto {
  type: ValueOf<typeof ContentType>;
  instaPostOptionInput: {
    key: string;
    option: string;
  }[];
}

export interface SuccessResponse {
  instaPosts: {
    status: "ok";
    result: {
      id: number;
    };
  };
}

export interface failResponse {
  instaPosts: {
    status: "error";
    message: "인스타 생성에 실패했습니다." | "태그가 생성되지 않았습니다.";
  };
}
