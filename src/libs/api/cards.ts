// pages/api/login.js
import baseaxios from "./axios";

// PostCard 인터페이스 정의
export interface PostCard {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

export interface PostResponse {
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
  imageUrl?: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

// 카드 생성
export async function createCard(postCard: PostCard) {
  try {
    const response = await baseaxios.post("/cards", postCard);
    return response.data as PostResponse;
  } catch (error) {
    console.log("카드 생성 api 오류");
    throw error;
  }
}

interface GetResponse {
  cursorId: number;
  totalCount: number;
  cards: {
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
  }[];
}

// 카드 목록 조회
export async function getCardList(columnId: number) {
  try {
    const response = await baseaxios.get(`/cards?size=10&columnId=${columnId}`);
    return response.data as GetResponse;
  } catch (error) {
    console.log("카드 목록 조회 api 오류");
    throw error;
  }
}

export interface PutCard {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}
export interface EditResponse extends DetailResponse {
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

// 카드 수정
export async function editCard(putCard: Partial<PutCard>, cardId: number) {
  try {
    const response = await baseaxios.put(`/cards/${cardId}`, putCard);
    return response.data as EditResponse;
  } catch (error) {
    console.log("카드 수정 api 오류");
    throw error;
  }
}

export interface DetailResponse extends PutCard {
  id: number;
  dashboardId: number;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

// 카드 상세 조회
export async function getDetailCard(cardId: number): Promise<DetailResponse> {
  try {
    const response = await baseaxios.get<DetailResponse>(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.log("카드 상세 조회 api 오류");
    throw error;
  }
}

// 카드삭제
export async function DeleteCard(cardId: number): Promise<void> {
  try {
    await baseaxios.delete(`/cards/${cardId}`);
    console.log(`카드${cardId} 삭제`);
  } catch (error) {
    console.log("카드 삭제 api 오류");
    throw error;
  }
}
