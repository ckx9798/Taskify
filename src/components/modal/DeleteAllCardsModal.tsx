import CommonModal from "@/components/modal/CommonModal";
import React, { useEffect, useState } from "react";
import BoxButton from "../BoxButton";
import { GetCardList, DeleteCard } from "@/libs/api/cards";

// 카드의 데이터 구조에 맞는 인터페이스 정의
interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface GetResponse {
  cursorId: number;
  totalCount: number;
  cards: Card[];
}

interface DeleteAllCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}

const DeleteAllCardsModal: React.FC<DeleteAllCardsModalProps> = ({
  isOpen,
  onClose,
  columnId,
}) => {
  const [totalCards, setTotalCards] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardCount = async () => {
      try {
        const response: GetResponse = await GetCardList(columnId);
        setTotalCards(response.totalCount);
      } catch (err) {
        console.error("카드 목록 조회 중 오류 발생:", err);
        setError("카드 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };

    if (isOpen) {
      fetchCardCount();
    }
  }, [isOpen, columnId]);

  const handleDeleteAllCards = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      // 모든 카드를 한 번에 가져오는 방식으로 변경
      const response: GetResponse = await GetCardList(columnId);
      const allCards: Card[] = response.cards;

      // 모든 카드 삭제 (병렬로 처리)
      const deletePromises = allCards.map((card) => DeleteCard(card.id));
      await Promise.all(deletePromises);

      // 성공적으로 삭제되면 모달을 닫고 상태를 초기화합니다.
      onClose();
      setTotalCards(0);
    } catch (err) {
      console.error("카드 삭제 중 오류 발생:", err);
      setError("카드 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTotalCards(0);
    setError(null);
  };

  return (
    <div>
      <CommonModal
        isOpen={isOpen}
        onClose={handleClose}
        hideCloseButton={false}
      >
        <div className="flex flex-col gap-6">
          <p className="text-[24px] font-bold text-black-200">모든 카드 삭제</p>
          <div className="flex flex-col gap-2">
            <p>해당 컬럼 내의 모든 카드를 삭제하시겠습니까?</p>
            <p className="text-[14px] text-gray-600">
              총 <span className="font-semibold">{totalCards}</span>개의 카드가
              삭제됩니다.
            </p>
            {error && <p className="text-red-500 text-[14px]">{error}</p>}
          </div>
          <div className="flex gap-2">
            <BoxButton
              width="100%"
              paddingTopBottom="14"
              paddingRightLeft="46"
              radius="8"
              backgroundColor="white2"
              fontSize="16"
              onClick={handleClose}
              disabled={isDeleting}
            >
              취소
            </BoxButton>
            <BoxButton
              width="100%"
              paddingTopBottom="14"
              paddingRightLeft="46"
              radius="8"
              backgroundColor="purple"
              fontSize="16"
              disabled={isDeleting || totalCards === 0}
              onClick={handleDeleteAllCards}
            >
              {isDeleting ? "삭제 중..." : "모두 삭제"}
            </BoxButton>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default DeleteAllCardsModal;
