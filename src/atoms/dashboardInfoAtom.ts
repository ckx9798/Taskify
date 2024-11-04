import { Dashboard } from "@/libs/api/dashboards";
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

// 대시보드 목록을 저장하는 Atom
export const dashboardListAtom = atom<Dashboard[]>([]);

// 대시보드 총 개수를 저장하는 Atom
export const dashboardCountAtom = atom<number>(0);

// 현재 페이지를 저장하는 Atom
export const dashboardPageAtom = atom<number>(1);
