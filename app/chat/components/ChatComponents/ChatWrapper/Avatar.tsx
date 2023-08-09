import Image from "next/image";

interface IAvatarProps {
  url: string;
}

const Avatar = ({ url }: IAvatarProps) => {
  return (
    <Image
      src={url}
      alt={"avatar"}
      width={48}
      height={48}
      className="w-12 h-12 rounded-full flex-shrink-0"
    />
  );
};

export default Avatar;
