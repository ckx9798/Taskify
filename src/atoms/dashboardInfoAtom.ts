import { atom } from "jotai";

export const dashboardInfoAtom = atom<{
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
} | null>(null);
