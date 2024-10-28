interface Props {
  size: "large" | "medium" | "small" | "smallest";
  children: string;
}

export default function ProfileImage({ size, children }: Props) {
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
    children.charAt(0) === "+" ? "bg-vanillaIce-200" : "bg-blue";
  const firstText = children.charAt(0) === "+" ? children : children.charAt(0);
  const textColorValue =
    children.charAt(0) === "+" ? "text-mandy-500" : "text-white";

  return (
    <div
      className={`${profileWidth[size]} ${profileHeight[size]} ring-2 ring-white ${backgroundColor} flex items-center justify-center rounded-full`}
    >
      <small className={`${textColorValue} ${fontSize[size]} font-semibold`}>
        {firstText}
      </small>
    </div>
  );
}
