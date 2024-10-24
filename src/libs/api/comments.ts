import axios from "axios";

interface CommentData {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const BASE_URL = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/9-2",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createComment(commentData: CommentData) {
  try {
    const response = await BASE_URL.post(`/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function getComments() {
  try {
    const response = await BASE_URL.get(`/comments`);
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
    const response = await BASE_URL.put(`/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
}

export async function deleteComment(commentId: string) {
  try {
    const response = await BASE_URL.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}
