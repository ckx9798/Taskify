import { useEffect, useState } from "react";
import moreButton from "@/../public/icons/moreButton.svg";
import closeButton from "@/../public/icons/closeButton.svg";
import Image from "next/image";
import ProfileImage from "../ProfileImage";
import TagItem from "../TagItem";
import BoxButton from "../BoxButton";
import CommentItem from "../CommentItem";

interface Author {
  profileImageUrl: string;
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

const imageUrl =
  "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20230221%2Fourlarge%2Fpngtree-cute-carrot-hand-drawn-vector-png-image_6611563.png&type=sc960_832";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnTitle: string;
  cardId: number;
}

const MockData2: CardDetail = {
  id: 3,
  title: "카드 상세입니다",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.",
  tags: ["프로젝트", "일반", "백엔드", "상"],
  dueDate: "2024.11.11 12:00",
  assignee: {
    profileImageUrl:
      "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20230221%2Fourlarge%2Fpngtree-cute-carrot-hand-drawn-vector-png-image_6611563.png&type=sc960_832",
    nickname: "배유철",
    id: 77,
  },
  imageUrl:
    "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20230221%2Fourlarge%2Fpngtree-cute-carrot-hand-drawn-vector-png-image_6611563.png&type=sc960_832",
  teamId: "9-2",
  columnId: 3,
  createdAt: "2024.11.11 12:00",
  updatedAt: "2024.11.11 12:00",
};

const MockData: CommentInfo = {
  id: 1,
  content: "내용입니다.",
  createdAt: "2024-10-28 14:00",
  updatedAt: "2024-10-28 14:00",
  cardId: 3,
  author: {
    profileImageUrl: imageUrl,
    nickname: "테스트네임",
    id: 77,
  },
};

export default function CardModal({
  isOpen,
  onClose,
  columnTitle = "ToDo",
  cardId,
}: CardModalProps) {
  const [cardDetail, setCardDetail] = useState<CardDetail>(MockData2);
  const [comments, setComments] = useState<CommentInfo[]>([MockData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gray-100 opacity-80"></div>

      <div className="fixed z-50 h-fit w-[327px] rounded-lg bg-white p-4">
        <div className="absolute right-4 top-4 flex items-center gap-x-4">
          <button className="relative h-5 w-5">
            <Image fill src={moreButton} alt="더 보기" />
          </button>
          <button onClick={onClose} className="relative h-6 w-5">
            <Image fill src={closeButton} alt="닫기" />
          </button>
        </div>
        <h3 className="mt-10 text-xl font-bold">{cardDetail.title}</h3>
        <div className="mt-2 flex h-16 items-center gap-x-[62px] rounded-lg border border-solid border-gray-300 px-4 py-[9px]">
          <div className="flex h-full flex-col justify-between">
            <span className="text-xs font-semibold">담당자</span>
            <div className="flex items-center gap-x-2">
              <ProfileImage
                size="smallest"
                nickName={cardDetail.assignee.nickname}
                imageUrl={cardDetail.assignee.profileImageUrl}
              ></ProfileImage>
              <span className="text-xs">{cardDetail.assignee.nickname}</span>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between gap-y-2">
            <span className="text-xs font-semibold">마감일</span>
            <span className="text-xs">{cardDetail.dueDate}</span>
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="mr-3 border-r border-solid border-gray-300 pr-3">
            <div className="rounded-2xl bg-violet-8 px-2 py-1 text-xs text-violet">
              • {columnTitle}
            </div>
          </div>
          <ul className="flex gap-x-2">
            {cardDetail.tags.map((item, index) => (
              <TagItem key={index} tagName={item} />
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs">{cardDetail.description}</p>
        <div className="relative mt-8 h-[168px] w-full">
          <Image fill src={cardDetail.imageUrl} alt="카드 이미지" />
        </div>
        <div className="relative flex flex-col gap-y-1">
          <label
            className="mt-6 w-fit text-sm font-medium text-black-200"
            htmlFor="comment"
          >
            댓글
          </label>
          <input
            className="h-[70px] w-full rounded-md border border-gray-300 py-3 pl-3 pr-5 text-xs placeholder:absolute placeholder:left-3 placeholder:top-3 placeholder:text-xs"
            id="comment"
            placeholder="댓글 작성하기"
          ></input>
          <div className="absolute right-5 top-1/2 translate-y-5 transform">
            <BoxButton
              paddingTopBottom="5"
              paddingRightLeft="32"
              radius="4"
              backgroundColor="white"
              fontSize="12"
              onClick={() => alert("입력")}
            >
              입력
            </BoxButton>
          </div>
        </div>
        <ul className="mt-4">
          {comments.map((item) => (
            <CommentItem
              key={item.id}
              content={item.content}
              createdAt={item.createdAt}
              author={item.author}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
