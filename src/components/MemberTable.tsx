import PaginationButton from "./PaginationButton";
import forwardButton from "@/../public/icons/arrow_forward_gray_icon.svg";
import backButton from "@/../public/icons/arrow_back_gray_icon.svg";
import Image from "next/image";
import MemberTableItem from "./MemberListItem";
import { useEffect, useState } from "react";
import { MemberType } from "@/libs/api/Members";

interface MemberTableProps {
  members: MemberType[];
  totalPage: number;
  currentPage: number;
  onClickForward: () => void;
  onClickBack: () => void;
  onClickDelete: (memberId: number) => void;
}

export default function MemberTable({
  members,
  totalPage,
  currentPage,
  onClickForward,
  onClickBack,
  onClickDelete,
}: MemberTableProps) {
  const [screenSize, setScreenSize] = useState<string>("mobile");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1280) {
        setScreenSize("tablet");
      } else {
        setScreenSize("pc");
      }
    };

    handleResize(); // 초기 사이즈 설정
    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 리스너 등록

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-fit rounded-lg">
      <div className="px-5 pt-[22px] md:px-7 md:pt-[26px]">
        <div className="flex items-center justify-between pb-[18px]">
          <h3 className="text-xl font-bold md:text-2xl">구성원</h3>
          <div className="flex items-center gap-x-3">
            <p className="text-xs font-normal text-black-200 md:text-sm">
              {totalPage} 페이지 중 {currentPage}
            </p>
            <PaginationButton
              size={screenSize === "mobile" ? "small" : "large"}
              onClickForward={onClickForward}
              onClickBack={onClickBack}
            >
              <Image src={forwardButton} alt="이전 페이지" />
              <Image src={backButton} alt="다음 페이지" />
            </PaginationButton>
          </div>
        </div>
        <p className="w-fit text-sm font-normal text-gray-600 md:text-base">
          이름
        </p>
      </div>
      <ul>
        {members.length > 0 &&
          members.map((item) => (
            <MemberTableItem
              key={item.id}
              memberId={item.id}
              isOwner={item.isOwner}
              memberName={item.nickname}
              onClick={() => onClickDelete(item.id)}
            />
          ))}
      </ul>
    </div>
  );
}
