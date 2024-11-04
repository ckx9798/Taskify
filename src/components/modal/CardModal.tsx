import { useEffect, useState } from "react";
import moreButton from "@/../public/icons/moreButton.svg";
import closeButton from "@/../public/icons/closeButton.svg";
import Image from "next/image";
import ProfileImage from "../ProfileImage";
import TagItem from "../TagItem";
import BoxButton from "../BoxButton";
import CommentItem from "../CommentItem";
import DropDownMenu from "../DropDownMenu";
import { DeleteCard, getDetailCard } from "@/libs/api/cards";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/libs/api/comments";
import TaskEditModal from "./TaskEditModal";
import formatDate from "@/utils/formatDate";

interface Author {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

interface CardDetail {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Author;
  imageUrl: string;
  teamId: string;
  columnId: number;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

interface CommentInfo {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
}

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnTitle: string;
  cardId: number;
  onClickReRender: () => void;
}

export default function CardModal({
  isOpen,
  onClose,
  columnTitle,
  cardId,
  onClickReRender,
}: CardModalProps) {
  const [cardDetail, setCardDetail] = useState<CardDetail>();
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false); // 드롭다운 상태
  const [showTaskEdit, setShowTaskEdit] = useState(false);
  // 항상 formatDate 함수를 호출하고, cardDetail이 없을 경우 빈 문자열을 반환
  const formattedDate = formatDate(cardDetail?.dueDate);

  type fontColor = {
    "bg-linen-100": "text-diserria-400";
    "bg-liceFlower-100": "text-atlantis-400";
    "bg-pinkLace-200": "text-fuchsiaPiknk-500";
    "bg-linkWater-100": "text-azureRadiance-600";
  };

  const colors: (keyof fontColor)[] = [
    "bg-linen-100",
    "bg-liceFlower-100",
    "bg-pinkLace-200",
    "bg-linkWater-100",
  ];

  const cardUpdate = (card: CardDetail) => {
    setCardDetail(card);
  };

  // 카드 상세 및 댓글 데이터 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardData = await getDetailCard(cardId);
        setCardDetail(cardData);
        const fetchedComments = await getComments(cardId);
        setComments(fetchedComments.comments);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      }
    };

    if (isOpen && cardId) {
      fetchData();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, cardDetail?.id]);

  // 댓글 생성
  const handleCommentSubmit = async () => {
    if (!newComment) return;

    try {
      const createdComment = await createComment({
        content: newComment,
        cardId,
        columnId: cardDetail?.columnId || 0,
        dashboardId: cardDetail?.dashboardId || 0,
      });
      setComments((prev) => [...prev, createdComment]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 생성 실패:", error);
    }
  };

  // 댓글 수정
  const handleCommentEdit = async (commentId: number, editContent: string) => {
    if (!editContent) return;

    try {
      const updatedComment = await updateComment(commentId, editContent);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? updatedComment : comment,
        ),
      );
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  // 댓글 삭제
  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  // 드롭다운 열기/닫기
  const handleMoreButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  };

  // 카드 삭제
  const handleCardDelete = async () => {
    try {
      await DeleteCard(cardId);
      onClose();
      onClickReRender();
    } catch (error) {
      console.error("카드 삭제 실패:", error);
    }
  };

  if (!isOpen || !cardDetail) return null;

  const options = [
    {
      label: "수정하기",
      onClick: () => {
        setShowTaskEdit(true);
      },
    },
    { label: "삭제하기", onClick: handleCardDelete },
  ];

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center"
      onClick={() => setShowOptions(false)}
    >
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="fixed z-50 h-fit w-[342px] overflow-y-auto rounded-lg bg-white p-4 md:h-[766px] md:w-[693px] md:px-8 md:py-6 xl:h-[763px] xl:w-[745px]">
        <div className="absolute right-4 top-4 flex items-center gap-x-4 md:right-8 md:top-6">
          <button
            className="relative h-5 w-5 md:h-7 md:w-7"
            type="button"
            onClick={handleMoreButtonClick}
          >
            <Image fill src={moreButton} alt="더 보기" />
          </button>
          <button
            onClick={onClose}
            className="relative h-6 w-5 md:h-8 md:w-8"
            type="button"
          >
            <Image fill src={closeButton} alt="닫기" />
          </button>
        </div>

        {showOptions && (
          <DropDownMenu
            options={options}
            onClose={() => setShowOptions(false)}
          />
        )}

        <h3 className="mt-10 text-xl font-bold text-black-200 md:mt-auto md:text-2xl">
          {cardDetail.title}
        </h3>
        <div className="h-[710px] justify-between md:flex">
          <div className="mt-2 flex h-16 items-center justify-between rounded-lg border border-solid border-gray-300 px-4 py-[9px] md:order-2 md:mt-6 md:h-[155px] md:w-[181px] md:flex-col md:items-start md:justify-between md:px-4 md:py-[15px] xl:h-[155px] xl:w-[200px]">
            <div className="flex h-full flex-col justify-between md:h-[60px] md:gap-y-[6px]">
              <span className="text-xs font-semibold text-black-400">
                담당자
              </span>
              <div className="flex items-center gap-x-2">
                <ProfileImage
                  size="smallest"
                  nickName={cardDetail.assignee.nickname}
                  imageUrl={cardDetail?.assignee.profileImageUrl}
                ></ProfileImage>
                <span className="text-xs text-black-200 md:text-sm">
                  {cardDetail.assignee.nickname}
                </span>
              </div>
            </div>
            <div className="flex h-full flex-col justify-between gap-y-2 md:h-[50px] md:gap-y-[6px]">
              <span className="text-xs font-semibold text-black-400">
                마감일
              </span>
              <span className="text-xs text-black-200 md:text-sm">
                {formattedDate}
              </span>
            </div>
          </div>
          <div className="md:order-1 md:w-[420px] xl:w-[445px]">
            <div className="mt-4 flex md:mt-6 md:h-7">
              <div className="mr-3 border-r border-solid border-gray-300 pr-3 md:mr-5 md:pr-5">
                <div className="rounded-2xl bg-violet-8 px-2 py-1 text-xs text-violet">
                  • {columnTitle}
                </div>
              </div>
              <ul className="flex gap-x-2 md:gap-x-[6px]">
                {cardDetail.tags.map((item, index) => (
                  <TagItem
                    key={index}
                    tagName={item}
                    backgroundColor={colors[index]}
                  />
                ))}
              </ul>
            </div>

            <p className="mt-4 text-xs text-black-400 md:text-sm">
              {cardDetail.description}
            </p>
            {cardDetail.imageUrl && (
              <div className="relative mt-8 h-[168px] w-full overflow-hidden rounded-md md:mt-4 md:h-[246px] xl:h-[260px]">
                <Image fill src={cardDetail.imageUrl} alt="카드 이미지" />
              </div>
            )}
            <div className="relative flex flex-col gap-y-1">
              <label
                className="mt-6 w-fit text-sm font-medium text-black-200 md:text-base xl:mt-4"
                htmlFor="comment"
              >
                댓글
              </label>
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="h-[70px] w-full rounded-md border border-gray-300 py-3 pl-3 pr-5 text-xs text-black-200 placeholder:absolute placeholder:left-3 placeholder:top-3 placeholder:text-xs md:h-[110px] md:pb-[12px] md:pl-4 md:pr-[11px] md:pt-4 xl:pb-[13px] xl:pr-3"
                id="comment"
                placeholder="댓글 작성하기"
              ></input>
              <div className="absolute right-5 top-1/2 translate-y-5 transform md:right-[11px] md:translate-y-10 xl:right-3 xl:translate-y-9">
                <BoxButton
                  paddingTopBottom="5"
                  paddingRightLeft="32"
                  radius="4"
                  backgroundColor="white"
                  fontSize="12"
                  onClick={handleCommentSubmit}
                >
                  입력
                </BoxButton>
              </div>
            </div>
            <ul className="mt-4 flex flex-col gap-y-4 pb-4 md:mt-6 md:gap-y-6 md:pb-6 xl:pb-[33px]">
              {comments.map((item) => (
                <CommentItem
                  key={item.id}
                  id={item.id}
                  content={item.content}
                  createdAt={item.createdAt}
                  author={item.author}
                  onEdit={handleCommentEdit}
                  onDelete={handleCommentDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <TaskEditModal
        isOpen={showTaskEdit}
        onClose={() => setShowTaskEdit(false)}
        cardId={cardId}
        onUpdate={cardUpdate}
      />
    </div>
  );
}
