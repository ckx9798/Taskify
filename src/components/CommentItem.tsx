import { useState } from "react";
import ProfileImage from "./ProfileImage";
import BoxButton from "./BoxButton";

interface Author {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface CommentItemProps {
  id: number;
  content: string;
  createdAt: string;
  author: Author;
  onEdit: (id: number, editContent: string) => void;
  onDelete: (id: number) => void;
}

export default function CommentItem({
  id,
  content,
  createdAt,
  author,
  onEdit,
  onDelete,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditContent(content); // 초기 내용으로 되돌림
  };

  const handleSaveClick = () => {
    onEdit(id, editContent);
    setIsEditing(false); // 수정 모드 종료
  };

  return (
    <li className="flex gap-x-2">
      <ProfileImage
        size="small"
        nickName={author?.nickname}
        imageUrl={author?.profileImageUrl}
      ></ProfileImage>
      <div className="flex flex-col gap-y-2 pt-1">
        <div className="flex gap-x-2">
          <span className="text-xs font-semibold text-black-200 md:text-sm">
            {author?.nickname}
          </span>
          <span className="text-[10px] text-gray-400 md:text-xs">
            {createdAt}
          </span>
        </div>
        {isEditing ? (
          <div className="flex flex-col gap-y-2">
            <input
              className="rounded border border-gray-300 px-1 py-1 text-xs text-black-200 md:text-sm"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="ml-auto flex gap-x-2">
              <BoxButton
                paddingTopBottom="2"
                paddingRightLeft="5"
                radius="4"
                backgroundColor="white2"
                fontSize="12"
                onClick={handleSaveClick}
              >
                완료
              </BoxButton>
              <BoxButton
                paddingTopBottom="2"
                paddingRightLeft="5"
                radius="4"
                backgroundColor="white2"
                fontSize="12"
                onClick={handleCancelClick}
              >
                취소
              </BoxButton>
            </div>
          </div>
        ) : (
          <span className="text-xs text-black-200 md:text-sm">{content}</span>
        )}
        {!isEditing && (
          <div className="flex gap-x-2">
            <button
              className="border-b border-gray-400 text-[10px] text-gray-400 md:text-xs"
              type="button"
              onClick={handleEditClick}
            >
              수정
            </button>
            <button
              className="border-b border-gray-400 text-[10px] text-gray-400 md:text-xs"
              type="button"
              onClick={() => onDelete(id)}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
