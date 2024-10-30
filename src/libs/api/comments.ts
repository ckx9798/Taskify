import baseaxios from "./axios";

interface CommentData {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}
interface Author {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

interface CommentInfo {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
}

interface CommentsResponse {
  cursorId: number;
  comments: CommentInfo[]; // CommentInfo[] 타입 배열
}

// 댓글 생성
export async function createComment(
  commentData: CommentData,
): Promise<CommentInfo> {
  try {
    const response = await baseaxios.post<CommentInfo>(
      `/comments`,
      commentData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

// 댓글 조회
export async function getComments(cardId: number): Promise<CommentsResponse> {
  try {
    const response = await baseaxios.get<CommentsResponse>(
      `/comments?cardId=${cardId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

// 댓글 수정
export async function updateComment(commentId: number, content: string) {
  try {
    const response = await baseaxios.put<CommentInfo>(
      `/comments/${commentId}`,
      { content },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
}

// 댓글 삭제
export async function deleteComment(commentId: number) {
  try {
    await baseaxios.delete(`/comments/${commentId}`);
    return commentId;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}
