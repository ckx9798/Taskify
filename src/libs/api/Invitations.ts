interface InvitationType {
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

interface ReceivedInvitationsResponseType {
  invitations: InvitationType[];
  cursorId: number;
}

export async function getReceivedInvitations(
  searchQuery: string | null,
): Promise<ReceivedInvitationsResponseType> {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.get<ReceivedInvitationsResponseType>(
      `https://sp-taskify-api.vercel.app/9-2/invitations?size=5${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
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
  const accessToken = localStorage.getItem("accessToken");
  try {
    await axios.put(
      `https://sp-taskify-api.vercel.app/9-2/invitations/${invitationId}`,
      {
        inviteAccepted: isAccept,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return invitationId; // 초대 ID 반환
  } catch (error) {
    console.error("Error accepting invite:", error);
    throw new Error("Failed to accept invite");
  }
}
