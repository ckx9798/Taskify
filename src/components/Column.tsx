import { useEffect, useState } from "react";
import { getCardList } from "@/libs/api/cards";
import ColumnItem from "./ColumnItem";
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from "@hello-pangea/dnd";

export interface ColumnProps {
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
  }, [columnId]);

  return (
    <div
      className={`flex h-fit flex-col bg-gray-100 px-3 pt-8 md:w-[584px] md:px-5 ${isFirst ? "pt-4" : ""} ${isFirst ? "md:pt-[22px]" : "md:pt-0"} md:pb-[22px] xl:border-b-0 xl:border-r xl:border-solid xl:border-gray-200 xl:pr-0 xl:pt-[22px]`}
    >
      {/* Droppable로 감싸기 */}
      <Droppable droppableId={columnId.toString()} type="CARD">
        {(provided: DroppableProvided) => (
          <ul
            className="flex flex-col gap-y-8 md:gap-y-5 xl:gap-y-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cardList.map((item, index) => (
              <Draggable
                key={item.id.toString()}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided: DraggableProvided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnItem
                      {...item}
                      columnTitle={columnTitle}
                      columnId={columnId}
                      totalCard={cardList.length}
                      isFirst={index === 0}
                      isLast={index === cardList.length - 1}
                      onClickReRender={onClickReRender}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
