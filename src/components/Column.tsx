import { useEffect, useState } from "react";
import { getCardList } from "@/libs/api/cards";
import ColumnItem from "./ColumnItem";

interface ColumnProps {
  columnId: number;
  columnTitle: string;
  isFirst: boolean;
  onClickReRender: () => void;
}

interface CardList {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export default function Column({
  columnId,
  columnTitle,
  isFirst,
  onClickReRender,
}: ColumnProps) {
  const [cardList, setCardList] = useState<CardList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardList = await getCardList(columnId);
        setCardList(cardList.cards);
      } catch (error) {
        console.error("카드 목록 조회 실패: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`flex h-fit flex-col bg-gray-100 px-3 pt-8 md:w-[584px] md:px-5 ${isFirst ? "pt-4" : ""} ${isFirst ? "md:pt-[22px]" : "md:pt-0"} md:pb-[22px] xl:border-b-0 xl:border-r xl:border-solid xl:border-gray-200 xl:pr-0 xl:pt-[22px]`}
    >
      <ul className="flex flex-col gap-y-8 md:gap-y-5 xl:gap-y-4">
        {/* cardList가 비어 있을 때도 ColumnItem 생성 */}
        {cardList.length > 0 ? (
          cardList.map((item, index) => (
            <ColumnItem
              key={item.id}
              {...item}
              columnTitle={columnTitle}
              columnId={columnId}
              totalCard={cardList.length}
              isFirst={index === 0}
              isLast={index === cardList.length - 1}
              onClickReRender={onClickReRender}
            />
          ))
        ) : (
          // 카드가 없을 때의 ColumnItem
          <ColumnItem
            key={0}
            id={0}
            title="No Cards"
            tags={[]}
            dueDate=""
            assignee={{ profileImageUrl: "", nickname: "No Assignee", id: 0 }}
            imageUrl=""
            columnTitle={columnTitle}
            columnId={columnId}
            totalCard={0}
            isFirst={true} // 첫 번째 항목으로 표시
            isLast={true}
            onClickReRender={onClickReRender}
          />
        )}
      </ul>
    </div>
  );
}
