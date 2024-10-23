import React from "react";
import Image from "next/image";

export interface TagIconProps {
  readonly tagName: string;
  readonly tagStyleType: "smallTag" | "bigTag";
  readonly deleteOption: boolean;
  onValueChange: (value: string) => void;
}

const TagIcon = ({
  tagName,
  tagStyleType,
  deleteOption,
  onValueChange,
}: TagIconProps) => {
  const sendDeleteOrder = (e: React.MouseEvent<HTMLImageElement>) => {
    if (onValueChange) {
      onValueChange(e.currentTarget.id);
    }
  };

  return (
    <div
      className={`flex items-center justify-center rounded-md border-none p-[0.4rem_0.6rem] gap-[0.25rem] whitespace-nowrap font-regular w-fit
        ${tagStyleType === "smallTag" ? "text-[1rem] h-[20px]" : "text-[var(--font12)] h-[22px]"}`}
    >
      {tagName}
      {deleteOption && (
        <Image
          id={tagName}
          src="/svg/cross.svg"
          alt="crossIcon"
          width={12}
          height={12}
          onClick={sendDeleteOrder}
        />
      )}
    </div>
  );
};

export default TagIcon;
