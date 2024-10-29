import ProfileImage from "./ProfileImage";

interface Author {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface CommentItemProps {
  content: string;
  createdAt: string;
  author: Author;
}

export default function CommentItem({
  content,
  createdAt,
  author,
}: CommentItemProps) {
  return (
    <li className="flex gap-x-2">
      <ProfileImage
        size="small"
        nickName={author?.nickname}
        imageUrl={author?.profileImageUrl}
      ></ProfileImage>
      <div className="flex flex-col gap-y-2 pt-1">
        <div className="flex gap-x-2">
          <span className="text-xs font-semibold">{author?.nickname}</span>
          <span className="text-[10px] text-gray-400">{createdAt}</span>
        </div>
        <span className="text-xs">{content}</span>
        <div className="flex gap-x-2">
          <button
            className="border-b border-gray-400 text-[10px] text-gray-400"
            type="button"
          >
            수정
          </button>
          <button
            className="border-b border-gray-400 text-[10px] text-gray-400"
            type="button"
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}
