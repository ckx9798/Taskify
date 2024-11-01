import { userInfo } from "@/libs/api/auth";
import { atom } from "jotai";

export interface User {
  id: number;
  email: string;
  nickname: string;
  // 추가적인 유저 필드를 여기에 정의하세요
}

export const userAtom = atom<userInfo["user"] | null>(null);
