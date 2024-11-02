import { atom } from "jotai";

export const memberAtom = atom<
  {
    id: number;
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
  }[]
>([]);
