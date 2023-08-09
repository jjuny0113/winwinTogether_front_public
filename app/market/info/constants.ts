export type ListType = {
  name: BankListType;
  icon: string;
}[];

export type BankListType =
  | "KB국민"
  | "IBK기업"
  | "NH농협"
  | "신한"
  | "시티"
  | "카카오뱅크"
  | "SC제일"
  | "우리"
  | "케이뱅크"
  | "토스뱅크"
  | "하나"
  | "경남은행"
  | "광주은행"
  | "대구은행"
  | "KDB산업"
  | "수협"
  | "우체국"
  | "제주은행"
  | "새마을금고"
  | "신협"
  | "저축은행중앙회"
  | "전북"
  | "부산"
  | "sbi저축은행";
export const banks: ListType = [
  {
    name: "KB국민",
    icon: "kb",
  },
  {
    name: "IBK기업",
    icon: "ibk",
  },
  {
    name: "NH농협",
    icon: "nh",
  },
  {
    name: "신한",
    icon: "shinhan",
  },
  {
    name: "시티",
    icon: "citi",
  },
  {
    name: "카카오뱅크",
    icon: "kakaobank",
  },
  {
    name: "SC제일",
    icon: "sc",
  },
  {
    name: "우리",
    icon: "woori",
  },
  {
    name: "케이뱅크",
    icon: "kbank",
  },
  {
    name: "토스뱅크",
    icon: "4",
  },
  {
    name: "하나",
    icon: "hana",
  },
  {
    name: "경남은행",
    icon: "bnk",
  },
  {
    name: "광주은행",
    icon: "kjbank",
  },
  {
    name: "대구은행",
    icon: "dgb",
  },

  {
    name: "KDB산업",
    icon: "kdb",
  },
  {
    name: "수협",
    icon: "sh",
  },
  {
    name: "우체국",
    icon: "epost",
  },
  {
    name: "제주은행",
    icon: "shinhan",
  },
  {
    name: "새마을금고",
    icon: "kfcc",
  },

  {
    name: "신협",
    icon: "nacufok",
  },
  {
    name: "저축은행중앙회",
    icon: "sb",
  },
  {
    name: "전북",
    icon: "jb",
  },
  {
    name: "부산",
    icon: "busan",
  },
  {
    name: "sbi저축은행",
    icon: "sbi",
  },
];

export const ADJECTIVES_PRODUCT = {
  "높은 퀄리티를 자랑해요": "High Quality",
  "신뢰할 수 있어요": "Stable, Trustworthy",
  "깨끗해요 위생에 철저해요": "clean",
  창의적이에요: "creative",
  "환경 친화적이에요": "environmentally friendly",
  "마음을 담아 준비해요": "Sincere",
  "가성비가 좋아요": "affordable,reasonable",
  "정성스럽게 만들어요": "Meticulous,carefully",
  "꼼꼼히 만들어요": "meticulous, detail",
};

export const ADJECTIVES_ATOMSPOERE = {
  "편안하고 차분해요": "Comfortable, Calm",
  "독특하고 새로워요": "Unique, Creative",
  "활기차고 즐거워요": "Energetic, Enjoyable",
  "친절하고 상냥해요": "kind, gentle",
  "자유롭고 쿨해요": "Free-spirited, cool",
  "감각적이고 트랜디해요": "Sensational, trendyd",
  "클래식하고 모던해요": "classic, Modernized",
  "귀엽고 러블리해요": "cute, lovely",
  "자연스럽고 따뜻해요": "natural, Warm",
  "신속하고 정확해요": "Prompt, Accurate",
};

export const DIRECT_INPUT_REGEX = /직접입력.*/;

export const ContentType = {
  SELF: "SELF",
  WEATHER: "WEATHER",
  PRODUCT: "PRODUCT",
  POTENTIAL: "POTENTIAL",
  RECOMMEND: "RECOMMEND",
} as const;
