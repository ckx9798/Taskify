import Link from "next/link";
import React from "react";

interface NavigateButtonProps {
  link: string;
  icon: React.ReactNode;
  text: string;
}
const NavigateButton: React.FC<NavigateButtonProps> = ({
  link,
  icon,
  text,
}) => {
  return (
    <Link href={link}>
      <div
        className={
          "mb-1 mt-1 flex cursor-pointer items-center justify-center rounded-lg py-2 hover:bg-violet-8 md:mb-0 md:mt-0 md:justify-start md:gap-3 md:px-1 md:py-3 xl:gap-5 xl:px-4 xl:py-4"
        }
      >
        <span className={"-mt-1 min-w-[22px]"}>{icon}</span>
        <span
          className={
            "hidden whitespace-nowrap font-medium md:block md:text-sm xl:text-lg"
          }
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

export default NavigateButton;
