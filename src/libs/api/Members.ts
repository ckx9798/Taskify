import axios from "axios";

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
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get<MembersResponseType>(
      `https://sp-taskify-api.vercel.app/9-2/members?page=${page}&size=4&dashboardId=${dashboardId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data; // 타입 안전성을 확보한 상태로 반환
  } catch (error) {
    console.error("Error fetching members:", error);
    throw new Error("Failed to fetch members");
  }
}

export async function deleteMember(memberId: number): Promise<number> {
  const accessToken = localStorage.getItem("accessToken");

  try {
    await axios.delete(
      `https://sp-taskify-api.vercel.app/9-2/members/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return memberId; // 삭제된 멤버 ID 반환
  } catch (error) {
    console.error("Error deleting member:", error);
    throw new Error("Failed to delete member");
  }
}
