import baseaxios from "./axios";

interface CommentData {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export async function createComment(commentData: CommentData) {
  try {
    const response = await baseaxios.post(`/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function getComments() {
  try {
    const response = await baseaxios.get(`/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

export async function updateComment(
  commentId: string,
  commentData: CommentData,
) {
  try {
    const response = await baseaxios.put(`/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
}

export async function deleteComment(commentId: string) {
  try {
    const response = await baseaxios.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}
