import baseAxios from "axios";

interface DashboardData {
  title: string;
  color: string;
}

interface ListQueryData {
  navigationMethod: string;
  cursorId?: number;
  page: number;
  size: number;
}

interface InvitationsQueryData {
  page: number;
  size: number;
}

const axios = baseAxios.create({
  baseURL: "https://sp-taskify-api.vercel.app/9-2",
  timeout: 10000, // 요청 제한 시간 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 대시보드 생성
export async function createDashboard(dashboardData: DashboardData) {
  try {
    const response = await axios.post("/dashboards", dashboardData);
    return response.data;
  } catch (error) {
    console.error("Error creating dashboard", error);
    throw error;
  }
}

// 대시보드 목록 조회
export async function getDashboardList(listQueryData: ListQueryData) {
  try {
    const response = await axios.get(`/dashboards`, {
      params: {
        navigationMethod: listQueryData.navigationMethod,
        cursorId: listQueryData.cursorId,
        page: listQueryData.page,
        size: listQueryData.size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting dashboard", error);
    throw error;
  }
}

// 대시보드 상세 조회
export async function getDashboardDetail(dashboardId: number) {
  try {
    const response = await axios.get(`/dashboards/${dashboardId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting dashboard detail", error);
    throw error;
  }
}

// 대시보드 수정
export async function updateDashboard(
  dashboardId: number,
  dashboardData: DashboardData,
) {
  try {
    const response = await axios.put(
      `/dashboards/${dashboardId}`,
      dashboardData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating dashboard", error);
    throw error;
  }
}

// 대시보드 삭제
export async function deleteDashboard(dashboardId: number) {
  try {
    const response = await axios.delete(`/dashboards/${dashboardId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting dashboard", error);
    throw error;
  }
}

// 대시보드 초대하기
export async function createDashboardInvitation(
  dashboardId: number,
  email: string,
) {
  try {
    const response = await axios.post(
      `/dashboards/${dashboardId}/invitations`,
      email,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating dashboard invitation", error);
    throw error;
  }
}

// 대시보드 초대 불러오기
export async function getDashboardInvitations(
  dashboardId: number,
  invitationsQueryData: InvitationsQueryData,
) {
  try {
    const response = await axios.get(`/dashboards/${dashboardId}/invitations`, {
      params: {
        page: invitationsQueryData.page,
        size: invitationsQueryData.size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting dashboard invitations", error);
    throw error;
  }
}

// 대시보드 초대 취소
export async function deleteDashboardInvitation(
  dashboardId: number,
  invitationId: number,
) {
  try {
    const response = await axios.delete(
      `/dashboards/${dashboardId}/invitations/${invitationId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting dashboard invitation", error);
    throw error;
  }
}
