import Image from "next/image";
import TagItem from "./TagItem";
import ProfileImage from "./ProfileImage";
import calendarIcon from "@/../public/icons/calendarIcon.svg";
import { useEffect, useState } from "react";

interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface BoardCardProps {
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  createdAt: string;
}

export default function BoardCard({
  title,
  tags,
  createdAt,
  assignee,
  imageUrl,
}: BoardCardProps) {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "pc">(
    "mobile",
  );

  const wrapPadding = imageUrl
    ? screenSize === "mobile"
      ? "pt-3 px-3 pb-[5px]"
      : screenSize === "tablet"
        ? "pt-5 px-5 pb-4"
        : "py-4 px-5"
    : screenSize === "mobile"
      ? "py-[5px] px-3"
      : screenSize === "tablet"
        ? "py-[15px] px-5"
        : "py-4 px-5";

  const imageInfoGap =
    screenSize === "tablet"
      ? "gap-x-5 items-center"
      : screenSize === "pc"
        ? "gap-y-4"
        : "gap-y-1";

  const dateProfileGap =
    screenSize === "tablet" ? (imageUrl ? "gap-x-[125px]" : "gap-[235px]") : "";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(width < 768 ? "mobile" : width < 1280 ? "tablet" : "pc");
    };

    handleResize(); // 초기 사이즈 설정
    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 리스너 등록

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`flex h-fit w-[284px] flex-col md:w-[544px] md:flex-row xl:w-[314px] xl:flex-col ${imageInfoGap} rounded-md border border-solid border-gray-300 bg-white ${wrapPadding}`}
    >
      {imageUrl && (
        <div
          className={`relative h-[152px] w-[260px] overflow-hidden rounded-md md:h-[53px] md:w-[91px] md:rounded xl:h-[160px] xl:w-[274px] xl:rounded-md`}
        >
          <Image
            fill
            src={imageUrl}
            alt="카드 이미지"
            className="object-cover"
          />
        </div>
      )}
      <div className={`flex flex-col gap-y-1.5 md:gap-y-2 xl:gap-y-2.5`}>
        <span
          className={`w-fit text-sm font-medium text-black-200 md:text-base`}
        >
          {title}
        </span>
        <div
          className={`flex flex-col gap-y-1.5 md:flex-row md:gap-x-4 xl:flex-col xl:gap-y-2`}
        >
          <div className="flex gap-x-1.5">
            {tags?.map((tagName, index) => (
              <TagItem key={index} tagName={tagName} />
            ))}
          </div>
          <div className={`flex justify-between ${dateProfileGap}`}>
            <div className="flex items-center gap-x-1">
              <div className="relative h-3.5 w-3.5">
                <Image fill src={calendarIcon} alt="달력" />
              </div>
              <div className="text-xs font-medium text-gray-500">
                {createdAt}
              </div>
            </div>
            <ProfileImage size={screenSize === "mobile" ? "smallest" : "small"}>
              {assignee.nickname}
            </ProfileImage>
          </div>
        </div>
      </div>
    </div>
  );
}
