interface Props {
  children: string;
}

export default function ProfileImage({children}: Props) {
  const backgroundColor = children.charAt(0) === "+" ? "bg-vanillaIce-200" : "bg-blue";
  const firstText = children.charAt(0) === "+" ? children : children.charAt(0);
  const textColorValue = children.charAt(0) === "+" ? "text-mandy-500" : "text-white";

  return (
      <div className={`w-[34px] h-[34px] ring-2 ring-white ${backgroundColor} rounded-full flex items-center justify-center`}>
        <small className={`${textColorValue} text-sm font-semibold`}>{firstText}</small>
      </div>
  )
}