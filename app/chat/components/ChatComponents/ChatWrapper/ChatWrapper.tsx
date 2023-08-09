"use client";
import { useGetUser } from "@/app/common/user/useGetUser";
import Avatar from "./Avatar";
import Icon from "@/components/Icon/Icon";

interface IChatWrapperProps {
  avatar: {
    position: "left" | "right";
  };
  children: React.ReactNode;
  isShow?: boolean;
  className?: React.ComponentProps<"div">["className"];
}

const ChatWrapper = ({
  avatar,
  children,
  isShow = false,
  className,
}: IChatWrapperProps) => {
  const user = useGetUser();
  const avatarJSX = (() => {
    if (avatar.position === "left") {
      return <Avatar url={"/logoCircle.png"} />;
    }
    return user?.profile_img ? (
      <Avatar url={user.profile_img} />
    ) : (
      <div className="pr-[2px]">
        <Icon type="smallprofile" />
      </div>
    );
  })();

  return (
    <div
      className={`${
        isShow ? "px-6" : "h-0 w-0 opacity-0 translate-y-6 px-0"
      } flex flex-row gap-4 ${
        avatar.position === "left" ? "duration-500" : "duration-700"
      } ease-in ${className}`}
    >
      {avatar.position === "left" && <>{avatarJSX}</>}
      <div
        className={`w-full flex flex-col gap-3 ${
          avatar.position === "left" ? "items-start" : "items-end"
        }`}
      >
        {isShow ? children : <></>}
      </div>
      {avatar.position === "right" && <>{avatarJSX}</>}
    </div>
  );
};

export default ChatWrapper;
