import baseaxios from "./axios";
export interface InvitationType {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  invitedAccepted: null | boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReceivedInvitationsResponseType {
  invitations: InvitationType[];
  cursorId: number;
}

export async function getReceivedInvitations(
  cursorId: number | null = null,
): Promise<ReceivedInvitationsResponseType> {
  try {
    const params: { size: number; cursorId?: number } = { size: 10 };
    if (cursorId !== null) {
      params.cursorId = cursorId;
    }
    const response = await baseaxios.get<ReceivedInvitationsResponseType>(
      `/invitations`,
      { params },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching received invitations:", error);
    throw new Error("Failed to fetch received invitations");
  }
}

export async function acceptInvite(
  invitationId: number,
  isAccept: boolean,
): Promise<number> {
  try {
    await baseaxios.put(`/invitations/${invitationId}`, {
      inviteAccepted: isAccept,
    });
    return invitationId; // 초대 ID 반환
  } catch (error) {
    console.error("Error accepting invite:", error);
    throw new Error("Failed to accept invite");
  }
}
