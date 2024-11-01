import Image from "next/image";

interface Props {
  size: "large" | "medium" | "small" | "smallest";
  nickName: string;
  imageUrl?: string | null;
}

export default function ProfileImage({ size, nickName, imageUrl }: Props) {
  const profileWidth = {
    large: "w-[38px]",
    medium: "w-[34px]",
    small: "w-[24px]",
    smallest: "w-[22px]",
  };
  const profileHeight = {
    large: "h-[38px]",
    medium: "h-[34px]",
    small: "h-[24px]",
    smallest: "h-[22px]",
  };
  const fontSize = {
    large: "text-base",
    medium: "text-sm",
    small: "text-xs",
    smallest: "text-[10px]",
  };
  const backgroundColor =
    nickName?.charAt(0) === "+" ? "bg-vanillaIce-200" : "bg-blue";
  const firstText =
    nickName?.charAt(0) === "+" ? nickName : nickName?.charAt(0);
  const textColorValue =
    nickName?.charAt(0) === "+" ? "text-mandy-500" : "text-white";

  return (
    <div
      className={`relative ${profileWidth[size]} ${profileHeight[size]} ring-2 ring-white ${backgroundColor} flex items-center justify-center rounded-full`}
    >
      {imageUrl ? (
        <Image
          fill
          src={imageUrl}
          alt="프로필 사진"
          className="rounded-full object-cover"
        />
      ) : (
        <small className={`${textColorValue} ${fontSize[size]} font-semibold`}>
          {firstText}
        </small>
      )}
    </div>
  );
}
