import React, { useState, useEffect } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import {
  getReceivedInvitations,
  acceptInvite,
  InvitationType,
} from "../../libs/api/Invitations"; // API 함수 임포트

interface DashboardItemProps {
  invitation: InvitationType;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

const InvitedDashboard: React.FC = () => {
  // 상태 변수
  const [invitations, setInvitations] = useState<InvitationType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // 검색어 변경 시 상태 초기화 및 데이터 로드
  useEffect(() => {
    setInvitations([]);
    setCursorId(null);
    setHasMore(true);
    setIsDataLoaded(false);
    fetchInvitations();
  }, [searchTerm]);

  // 무한 스크롤 훅 사용
  const { lastElementRef } = useInfiniteScroll({
    isFetching,
    hasMore,
    onLoadMore: () => {
      if (!isFetching && hasMore) {
        fetchInvitations();
      }
    },
  });

  // 초대 데이터 페칭 함수
  const fetchInvitations = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    try {
      const response = await getReceivedInvitations(cursorId);
      const newInvitations = response.invitations;

      // 검색어가 있을 때만 필터링
      const filteredInvitations = searchTerm
        ? newInvitations.filter((invitation) =>
            invitation.inviter.nickname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
        : newInvitations; // 검색어가 없으면 모든 데이터 사용

      if (cursorId === null) {
        // 초기 로드 또는 검색어 변경 시 상태 덮어쓰기
        setInvitations(filteredInvitations);
      } else {
        // 무한 스크롤로 추가 데이터 로드 시 기존 데이터에 추가
        setInvitations((prev) => [...prev, ...filteredInvitations]);
      }

      // 다음 페이지를 위한 cursorId 업데이트
      if (response.cursorId !== null) {
        setCursorId(response.cursorId);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching invitations:", error);
    } finally {
      setIsFetching(false);
      setIsDataLoaded(true);
    }
  };

  // 수락 및 거절 핸들러
  const handleAccept = async (id: number) => {
    try {
      await acceptInvite(id, true);
      setInvitations((prev) =>
        prev.filter((invitation) => invitation.id !== id),
      );
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await acceptInvite(id, false);
      setInvitations((prev) =>
        prev.filter((invitation) => invitation.id !== id),
      );
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  // 메시지 표시 여부 결정
  const shouldShowNoInvitationsMessage =
    invitations.length === 0 && !isFetching && isDataLoaded;

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <input
        className="mb-4 w-full rounded p-2 text-black"
        type="text"
        placeholder="이름으로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {shouldShowNoInvitationsMessage ? (
        <p className="text-white">아직 초대받은 대시보드가 없어요</p>
      ) : (
        <div>
          {invitations.map((invitation, index) => {
            const isLastItem = index === invitations.length - 1;
            return (
              <DashboardItem
                key={invitation.id}
                invitation={invitation}
                onAccept={handleAccept}
                onReject={handleReject}
                ref={isLastItem ? lastElementRef : null}
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
  ({ invitation, onAccept, onReject }, ref) => (
    <div ref={ref} className="mb-4 rounded bg-gray-700 p-4 shadow-md">
      <div className="">
        <h2>이름</h2>
        <h2 className="text-white">{invitation.dashboard.title}</h2>
      </div>
      <div>
        <p>초대자</p>
        <p className="text-white">{invitation.inviter.nickname}</p>
      </div>

      <div className="flex space-x-2">
        <button
          className="bg-green-500 hover:bg-green-600 rounded px-4 py-2 text-white"
          onClick={() => onAccept(invitation.id)}
        >
          수락
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 rounded px-4 py-2 text-white"
          onClick={() => onReject(invitation.id)}
        >
          거절
        </button>
      </div>
    </div>
  ),
);
DashboardItem.displayName = "DashboardItem";

export default InvitedDashboard;
