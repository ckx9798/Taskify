// pages/api/login.js
import axios from "axios";

interface PostCard {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}
interface PostResponse {
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

// 카드 생성
export async function CreatCard(postCard: PostCard) {
  try {
    const response = await axios.post(
      "https://sp-taskify-api.vercel.app/9-2/cards",
      postCard,
    );
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
export async function GetCardList(columnId: number) {
  try {
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/9-2/cards?size=10&columnId=${columnId}`,
    );
    return response.data as GetResponse;
  } catch (error) {
    console.log("카드 목록 조회 api 오류");
    throw error;
  }
}

interface PutCard {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}
interface EditResponse {
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
export async function EditCard(putCard: PutCard, cardId: number) {
  try {
    const response = await axios.put(
      `https://sp-taskify-api.vercel.app/9-2/cards/${cardId}`,
      putCard,
    );
    return response.data as EditResponse;
  } catch (error) {
    console.log("카드 수정 api 오류");
    throw error;
  }
}

interface DetailResponse {
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

// 카드 상세 조회
export async function GetDetailCard(cardId: number) {
  try {
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/9-2/cards/${cardId}`,
    );
    return response.data as DetailResponse;
  } catch (error) {
    console.log("카드 상세 조회 api 오류");
    throw error;
  }
}

// 카드삭제
export async function DeleteCard(cardId: number): Promise<void> {
  try {
    await axios.delete(`https://sp-taskify-api.vercel.app/9-2/cards/${cardId}`);
    console.log(`카드${cardId} 삭제`);
  } catch (error) {
    console.log("카드 삭제 api 오류");
    throw error;
  }
}
