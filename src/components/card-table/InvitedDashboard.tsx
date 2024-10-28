import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import React, { useState, useEffect } from "react";
// 타입 정의
interface Dashboard {
  id: number;
  title: string;
}

interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: Dashboard;
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

// 목업 데이터
const mockData: { invitations: Invitation[] } = {
  invitations: Array.from({ length: 50 }, (_, index) => ({
    id: index,
    inviter: {
      nickname: `Inviter ${index}`,
      email: `inviter${index}@example.com`,
      id: index,
    },
    teamId: `team-${index}`,
    dashboard: {
      title: `Dashboard ${index}`,
      id: index,
    },
    invitee: {
      nickname: `Invitee ${index}`,
      email: `invitee${index}@example.com`,
      id: index,
    },
    inviteAccepted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
};

// DashboardItem 컴포넌트 분리
interface DashboardItemProps {
  dashboard: Dashboard;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}
const InvitedDashboard: React.FC = () => {
  // 상태 변수
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasInvitations, setHasInvitations] = useState<boolean>(true);

  // 상수
  const PAGE_SIZE = 10;

  // 컴포넌트 마운트 시 전체 초대 데이터 여부 확인
  useEffect(() => {
    setHasInvitations(mockData.invitations.length > 0);
  }, []);

  // 검색어 변경 시 상태 초기화
  useEffect(() => {
    setDashboards([]);
    setPage(0);
    setHasMore(true);
    setIsDataLoaded(false);
  }, [searchTerm]);

  // 페이지 또는 검색어 변경 시 대시보드 데이터 페칭
  useEffect(() => {
    fetchDashboards();
  }, [page, searchTerm]);

  // 무한 스크롤 훅 사용
  const { lastElementRef } = useInfiniteScroll({
    isFetching,
    hasMore,
    onLoadMore: () => setPage((prevPage) => prevPage + 1),
  });

  // 대시보드 데이터 페칭 함수
  const fetchDashboards = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    try {
      // 검색어를 적용하여 데이터 필터링
      const filteredInvitations = mockData.invitations.filter((invitation) =>
        invitation.dashboard.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );

      const totalItems = filteredInvitations.length;
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      const paginatedData = filteredInvitations.slice(start, end);

      const newDashboards = paginatedData.map(
        (invitation) => invitation.dashboard,
      );

      setDashboards((prevDashboards) => [...prevDashboards, ...newDashboards]);

      if (end >= totalItems) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching dashboards:", error);
    } finally {
      setIsFetching(false);
      setIsDataLoaded(true);
    }
  };

  // 수락 및 거절 핸들러
  const handleAccept = (id: number) => {
    setDashboards((prevDashboards) =>
      prevDashboards.filter((dashboard) => dashboard.id !== id),
    );
  };

  const handleReject = (id: number) => {
    setDashboards((prevDashboards) =>
      prevDashboards.filter((dashboard) => dashboard.id !== id),
    );
  };

  // 초대 메시지 표시 여부 결정
  const shouldShowNoInvitationsMessage =
    dashboards.length === 0 && !isFetching && isDataLoaded && !hasInvitations;

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <input
        className="mb-4 w-full rounded p-2 text-black"
        type="text"
        placeholder="제목으로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {shouldShowNoInvitationsMessage ? (
        <p className="text-white">아직 초대받은 대시보드가 없어요</p>
      ) : (
        <div>
          {dashboards.map((dashboard, index) => {
            const isLastItem = index === dashboards.length - 1;
            return (
              <DashboardItem
                key={dashboard.id}
                dashboard={dashboard}
                onAccept={handleAccept}
                onReject={handleReject}
                ref={isLastItem ? lastElementRef : null} // 콜백 ref 전달
              />
            );
          })}
          {isFetching && <p className="text-white">Loading...</p>}
        </div>
      )}
    </div>
  );
};

const DashboardItem = React.forwardRef<HTMLDivElement, DashboardItemProps>(
  ({ dashboard, onAccept, onReject }, ref) => (
    <div ref={ref} className="mb-4 rounded bg-gray-700 p-4 shadow-md">
      <h2 className="text-white">{dashboard.title}</h2>
      <div className="flex space-x-2">
        <button
          className="bg-green-500 hover:bg-green-600 rounded px-4 py-2 text-white"
          onClick={() => onAccept(dashboard.id)}
        >
          수락
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 rounded px-4 py-2 text-white"
          onClick={() => onReject(dashboard.id)}
        >
          거절
        </button>
      </div>
    </div>
  ),
);
DashboardItem.displayName = "DashboardItem";

export default InvitedDashboard;
