import baseaxios from "./axios";

type MemberType = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
};

interface MembersResponseType {
  members: MemberType[];
  totalCount: number;
}

export async function getMembers(createdDashboard: {
  dashboardId: number | undefined;
  page: number;
}): Promise<MembersResponseType> {
  const { dashboardId, page } = createdDashboard;

  try {
    const response = await baseaxios.get<MembersResponseType>(
      `/members?page=${page}&size=4&dashboardId=${dashboardId}`,
    );
    return response.data; // 타입 안전성을 확보한 상태로 반환
  } catch (error) {
    console.error("Error fetching members:", error);
    throw new Error("Failed to fetch members");
  }
}

export async function deleteMember(memberId: number): Promise<number> {
  try {
    await baseaxios.delete(`/members/${memberId}`);
    return memberId; // 삭제된 멤버 ID 반환
  } catch (error) {
    console.error("Error deleting member:", error);
    throw new Error("Failed to delete member");
  }
}
