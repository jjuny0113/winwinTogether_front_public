import moment from "moment";
import { useState } from "react";

interface GetRecentPostsHook {
  recentPosts: {
    isExist: boolean;
    date: number;
  }[];
  registrationDate: number;
}

export const useGetRecentPosts = ({
  recentPosts,
  registrationDate,
}: GetRecentPostsHook) => {
  const [isExtend, setIsExtend] = useState(false);
  const sortedRecentPosts = recentPosts.sort((a, b) => b.date - a.date);
  const registrationDateVal = moment(registrationDate)
    .utc()
    .format("YYYY-MM-DD");
  const recentRegistrationIndex = sortedRecentPosts.findIndex(
    (v) => moment(v.date).utc().format("YYYY-MM-DD") === registrationDateVal
  );
  const sliceData =
    recentRegistrationIndex === -1
      ? sortedRecentPosts
      : sortedRecentPosts.slice(0, recentRegistrationIndex + 1);
  const isShowExtendButton = sliceData.length > 4;
  const recentPostsData = (() => {
    const isExistRecentRegistrationIndex = recentRegistrationIndex !== -1;
    if (isExistRecentRegistrationIndex) {
      return isExtend ? sliceData : sliceData.slice(0, 4);
    } else {
      return isExtend ? sortedRecentPosts : sortedRecentPosts.slice(0, 4);
    }
  })();

  const handleMoreButtonClick = () => {
    setIsExtend(!isExtend);
  };
  const buttonName = isExtend ? "간략히" : "더보기";
  return {
    isShowExtendButton,
    recentPostsData,
    handleMoreButtonClick,
    buttonName,
  };
};
