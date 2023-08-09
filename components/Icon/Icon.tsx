import React from "react";
import AddressIcon from "./svg/address.svg";
import BankIcon from "./svg/bank.svg";
import DetailPhoneIcon from "./svg/detailPhone.svg";
import MainProductIcon from "./svg/mainProduct.svg";
import MainTargetIcon from "./svg/mainTarget.svg";
import MarketIcon from "./svg/market.svg";
import OperationTimeIcon from "./svg/operationTime.svg";
import SectorIcon from "./svg/sector.svg";
import Hamburgur from "./svg/hamburger.svg";
import MarketBlue from "./svg/marketBlue.svg";
import Setting from "./svg/setting.svg";
import BrightLightBulb from "./svg/brightLightBulb.svg";
import RightArrow from "./svg/rightArrow.svg";
import Flag from "./svg/flag.svg";
import BluePencil from "./svg/bluePencil.svg";
import AddPicture from "./svg/addPicture.svg";
import ShareIcon from "./svg/share.svg";
import PencilIcon from "./svg/pencil.svg";
import NaverIcon from "./svg/smallNaver.svg";
import KakaoIcon from "./svg/smallKakao.svg";
import InstaIcon from "./svg/smallInsta.svg";
import AddressWhiteIcon from "./svg/addressWhite.svg";
import WhitePencil from "./svg/whitePencil.svg";
import KakaoUrlIcon from "./svg/kakao.svg";
import InstaUrlIcon from "./svg/insta.svg";
import NaverUrlIcon from "./svg/naver.svg";
import IconProfile from "./svg/iconProfile.svg";
import BottomNavHome from "./svg/bottomNavHome.svg";
import BottomNavInsta from "./svg/bottomNavInsta.svg";
import BottomNavPerson from "./svg/bottomNavPerson.svg";
import BottomNavStore from "./svg/bottomNavStore.svg";
import CircleCancel from "./svg/circleCancel.svg";
import MarketUrl from "./svg/marketUrl.svg";
import DropdownArrow from "./svg/dropdownArrow.svg";
import SmallProfileImg from "./svg/smallProfileImg.svg";
import IdCard from "./svg/idCard.svg";
import PencilSmall from "./svg/pencilSmall.svg";
import Person from "./svg/person.svg";
import Carmera from "./svg/camera.svg";
import Frown from "./svg/frown.svg";
import Happy from "./svg/happy.svg";
import PawFull from "./svg/paw_full.svg";
import PawLine from "./svg/paw_line.svg";
export interface IIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  type:
    | "address"
    | "bank"
    | "detailPhone"
    | "mainProduct"
    | "mainTarget"
    | "market"
    | "operationTime"
    | "sector"
    | "hamburger"
    | "marketBlue"
    | "setting"
    | "brightLightBulb"
    | "rightArrow"
    | "flag"
    | "bluePencil"
    | "addPicture"
    | "share"
    | "pencil"
    | "naver"
    | "kakao"
    | "insta"
    | "addressWhite"
    | "whitePencil"
    | "kakaoUrl"
    | "instaUrl"
    | "naverUrl"
    | "iconProfile"
    | "bottomNavHome"
    | "bottomNavInsta"
    | "bottomNavPerson"
    | "bottomNavStore"
    | "circleCancel"
    | "marketUrl"
    | "dropdownArrow"
    | "smallprofile"
    | "idCard"
    | "pencilsmall"
    | "person"
    | "camera"
    | "frown"
    | "happy"
    | "pawFull"
    | "pawLine";
  className?: string;
}
const Icon = ({ type, className = "", ...props }: IIconProps) => {
  const getIcon = () => {
    const mapper = new Map<IIconProps["type"], any>([
      [
        "address",
        <AddressIcon className={className} key={"address"} {...props} />,
      ],
      ["bank", <BankIcon className={className} key={"bank"} {...props} />],
      [
        "detailPhone",
        <DetailPhoneIcon
          className={className}
          key={"detailPhone"}
          {...props}
        />,
      ],
      [
        "mainProduct",
        <MainProductIcon
          className={className}
          key={"mainProduct"}
          {...props}
        />,
      ],
      [
        "mainTarget",
        <MainTargetIcon className={className} key={"mainTarget"} {...props} />,
      ],
      [
        "market",
        <MarketIcon className={className} key={"market"} {...props} />,
      ],
      [
        "operationTime",
        <OperationTimeIcon
          className={className}
          key={"operationTime"}
          {...props}
        />,
      ],
      [
        "sector",
        <SectorIcon className={className} key={"sector"} {...props} />,
      ],
      [
        "hamburger",
        <Hamburgur className={className} key={"hamburger"} {...props} />,
      ],
      [
        "marketBlue",
        <MarketBlue className={className} key={"marketBlue"} {...props} />,
      ],
      ["setting", <Setting className={className} key={"setting"} {...props} />],
      [
        "brightLightBulb",
        <BrightLightBulb
          className={className}
          key={"brightLightBulb"}
          {...props}
        />,
      ],
      [
        "rightArrow",
        <RightArrow className={className} key={"rightArrow"} {...props} />,
      ],
      ["flag", <Flag className={className} key={"flag"} {...props} />],
      [
        "bluePencil",
        <BluePencil className={className} key={"bluePencil"} {...props} />,
      ],
      [
        "addPicture",
        <AddPicture className={className} key={"addPicture"} {...props} />,
      ],
      ["share", <ShareIcon className={className} key={"share"} {...props} />],
      [
        "pencil",
        <PencilIcon className={className} key={"pencil"} {...props} />,
      ],
      [
        "naver",
        <NaverIcon className={className} key={"naver"} {...props} width={24} />,
      ],
      ["kakao", <KakaoIcon className={className} key={"kakao"} {...props} />],
      ["insta", <InstaIcon className={className} key={"insta"} {...props} />],
      [
        "addressWhite",
        <AddressWhiteIcon
          className={className}
          key={"addressWhite"}
          {...props}
        />,
      ],
      [
        "whitePencil",
        <WhitePencil className={className} key={"whitePencil"} {...props} />,
      ],
      [
        "kakaoUrl",
        <KakaoUrlIcon className={className} key={"kakaoUrl"} {...props} />,
      ],
      [
        "instaUrl",
        <InstaUrlIcon className={className} key={"instaUrl"} {...props} />,
      ],
      [
        "naverUrl",
        <NaverUrlIcon className={className} key={"naverUrl"} {...props} />,
      ],
      [
        "iconProfile",
        <IconProfile className={className} key={"iconProfile"} {...props} />,
      ],
      [
        "bottomNavHome",
        <BottomNavHome
          className={className}
          key={"bottomNavHame"}
          {...props}
        />,
      ],
      [
        "bottomNavInsta",
        <BottomNavInsta
          className={className}
          key={"bottomNavInsta"}
          {...props}
        />,
      ],
      [
        "bottomNavPerson",
        <BottomNavPerson
          className={className}
          key={"bottomNavPerson"}
          {...props}
        />,
      ],
      [
        "bottomNavStore",
        <BottomNavStore
          className={className}
          key={"bottomNavStore"}
          {...props}
        />,
      ],
      [
        "circleCancel",
        <CircleCancel className={className} key={"circleCancel"} {...props} />,
      ],
      [
        "marketUrl",
        <MarketUrl className={className} key={"marketUrl"} {...props} />,
      ],
      [
        "dropdownArrow",
        <DropdownArrow
          className={className}
          key={"dropdownArrow"}
          {...props}
        />,
      ],
      [
        "smallprofile",
        <SmallProfileImg
          className={className}
          key={"smallprofile"}
          {...props}
        />,
      ],
      ["idCard", <IdCard className={className} key={"idCard"} {...props} />],
      [
        "pencilsmall",
        <PencilSmall className={className} key={"pencilsmall"} {...props} />,
      ],
      ["person", <Person className={className} key={"person"} {...props} />],
      ["camera", <Carmera className={className} key={"camera"} {...props} />],
      ["frown", <Frown className={className} key={"frown"} {...props} />],
      ["happy", <Happy className={className} key={"happy"} {...props} />],
      ["pawFull", <PawFull className={className} key={"pawFull"} {...props} />],
      ["pawLine", <PawLine className={className} key={"pawLine"} {...props} />],
    ]);
    return mapper.get(type) ?? <></>;
  };
  return <>{getIcon()}</>;
};

export default Icon;
