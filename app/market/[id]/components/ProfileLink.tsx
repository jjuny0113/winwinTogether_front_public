import React from "react";
import { QuerySuccessResponse } from "../../info/hooks/query/getMarketInfo";
import EmptyValue from "../../components/EmptyValue";
import { useRouter } from "next/navigation";
import { useBottomNavStore } from "@/components/BottomNavigator/useBottomNavStore";
import Icon, { IIconProps } from "@/components/Icon/Icon";
import { useOnEntireLoading } from "@/util/useOnEntireLoading";

interface ProfileLinkProps {
  instaUrl: QuerySuccessResponse["marketInfo"]["result"]["instagram_url"];
  kakaoOpenProfileUrl: QuerySuccessResponse["marketInfo"]["result"]["kakao_open_profile_url"];
  naverBlogUrl: QuerySuccessResponse["marketInfo"]["result"]["naver_blog_url"];
  shoppingmallUrl: QuerySuccessResponse["marketInfo"]["result"]["shoppingmall_url"];
  isMarketAdmin: boolean;
}
const ProfileLink = ({
  instaUrl,
  kakaoOpenProfileUrl,
  naverBlogUrl,
  shoppingmallUrl,
  isMarketAdmin,
}: ProfileLinkProps) => {
  const router = useRouter();
  const allUrl = [
    {
      icon: "instaUrl",
      name: "instagram",
      url: instaUrl,
    },
    {
      icon: "kakaoUrl",
      name: "오픈카톡",
      url: kakaoOpenProfileUrl,
    },
    {
      icon: "naverUrl",
      name: "스마트 스토어",
      url: naverBlogUrl,
    },
    {
      icon: "marketUrl",
      name: "온라인 쇼핑몰",
      url: shoppingmallUrl,
    },
  ];
  const onEntireLoading = useOnEntireLoading();
  const checkEmpty = allUrl.map((v) => v.url).some((v) => !v);

  return (
    <>
      <div className="pt-6">
        {isMarketAdmin && checkEmpty && (
          <EmptyValue
            title="링크를 등록해보세요"
            descArr={[
              "등록하시면 링크시스템을 이용할 수 있어요.",
              "인스타, 스마트스토어, 오픈프로필, 자사몰 링크를 입력할 수 있어요",
            ]}
            buttonName="🔗 링크 등록하러 가기"
            onButtonClick={() => {
              onEntireLoading();
              router.push("market/info/edit?link=true");
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 p-6">
        {allUrl
          .filter((v) => v.url)
          .map((v) => (
            <a href={v.url} target="_blank" rel="noreferrer" key={v.icon}>
              <div className="border bg-purpleMain px-6 py-4 rounded-xl flex items-center gap-4 shadow-buttonShadow min-h-[80px]">
                <div>
                  <Icon type={v.icon as IIconProps["type"]} />
                </div>

                <div>
                  <p className="text-base text-monoGray1 font-semibold">
                    {v.name}
                  </p>
                </div>
              </div>
            </a>
          ))}
      </div>
    </>
  );
};

export default ProfileLink;
