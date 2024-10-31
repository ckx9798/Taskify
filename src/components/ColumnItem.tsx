import { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import CustomBtn from "./CustomBtn";
import CardModal from "./modal/CardModal";
import Image from "next/image";
import settingIcon from "@/../public/icons/setting.svg";
import ColumnManager from "./modal/ColumnManager";
import { useRouter } from "next/router";

export interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface BoardCardProps {
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  columnTitle: string;
  columnId: number;
  totalCard: number;
  isFirst: boolean;
}

export default function ColumnItem({
  id,
  title,
  tags,
  dueDate,
  assignee,
  imageUrl,
  columnTitle,
  columnId,
  totalCard,
  isFirst,
}: BoardCardProps) {
  const [showCardModal, setShowCardModal] = useState(false);
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [screenSize, setScreenSize] = useState<string>("mobile");
  const router = useRouter();
  const dasboardId = Number(router.query["dashboardid"]);

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

  const handleUpdateColumnModalOpen = () => {
    setShowColumnManager(true);
  };

  const handleUpdateColumnModalClose = () => {
    setShowColumnManager(false);
  };

  const handleModalOpen = () => {
    setShowCardModal(true);
  };

  const handleModalClose = () => {
    setShowCardModal(false);
  };

  return (
    <li className="w-full border-b border-solid border-gray-200 pb-6 text-black md:p-0 md:pb-5">
      {/* 모바일이거나 첫 번째 ColumnItem일 때 상단 요소 렌더링 */}
      {(screenSize === "mobile" || isFirst) && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="h-2 w-2 rounded-full bg-violet"></div>
              <div className="flex items-center gap-x-3">
                <h3 className="text-base">{columnTitle}</h3>
                <small className="h-5 w-5 rounded bg-gray-200 text-center text-xs font-medium text-gray-500">
                  {totalCard}
                </small>
              </div>
            </div>
            <button type="button" onClick={handleUpdateColumnModalOpen}>
              <Image src={settingIcon} width={22} height={22} alt="수정" />
            </button>
          </div>
          <div className="mb-[10px] md:mb-4">
            <CustomBtn
              paddingTopBottom={screenSize === "mobile" ? 6 : 9}
              paddingRightLeft={
                screenSize === "mobile"
                  ? 132
                  : screenSize === "tablet"
                    ? 261
                    : 146
              }
              borderRadius={6}
              onClick={() => alert("추가")}
            />
          </div>
        </>
      )}
      <BoardCard
        id={id}
        title={title}
        tags={tags}
        dueDate={dueDate}
        assignee={assignee}
        imageUrl={imageUrl}
        onClick={handleModalOpen}
      />

      {showCardModal && (
        <CardModal
          isOpen={showCardModal}
          onClose={handleModalClose}
          columnTitle={columnTitle}
          cardId={id}
        />
      )}

      {showColumnManager && (
        <ColumnManager
          isOpen={showColumnManager}
          onClose={handleUpdateColumnModalClose}
          dashboardId={dasboardId}
          columnId={columnId}
        />
      )}
    </li>
  );
}
