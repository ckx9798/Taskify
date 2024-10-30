import React, { useState, useEffect } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import searchicon from "../../../public/icons/search.svg";
import notInvited from "../../../public/icons/notInvited.svg";
import Image from "next/image";
import {
  getReceivedInvitations,
  acceptInvite,
  InvitationType,
} from "../../libs/api/Invitations"; // API 함수 임포트
import BoxButton from "../BoxButton";

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
    <div className="flex h-full flex-col gap-3 bg-white p-4">
      <div className="flex flex-col gap-4">
        <p className="text-[20px] font-bold">초대받은 대시보드</p>
        <div className="relative">
          <Image
            src={searchicon}
            alt="search"
            className="absolute left-3 top-2.5"
          />
          <input
            className="mb-4 h-[36px] w-full rounded-lg border border-gray-300 py-1 pl-8 pr-3 text-black"
            type="text"
            placeholder="이름으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {shouldShowNoInvitationsMessage ? (
        <div className="margincenter my-7">
          <Image src={notInvited} alt="not invited" className="margincenter" />
          <p className="text-gray-400">아직 초대받은 대시보드가 없어요</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between pl-[28px] pr-[104px] text-gray-400 max-[499px]:hidden">
            <p>이름</p>
            <p>초대자</p>
            <p>수락 여부</p>
          </div>
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
    <div className="margincenter flex flex-col gap-[13px] divide-y divide-gray-200 p-[13px] min-[500px]:flex-row min-[500px]:justify-between">
      <h2 className="text-black-200 max-[499px]:hidden min-[500px]:w-[95px]">
        {invitation.dashboard.title}
      </h2>
      <p className="text-black-200 max-[499px]:hidden min-[500px]:relative">
        {invitation.inviter.nickname}
      </p>
      <div
        ref={ref}
        className="flex flex-col gap-[3px] min-[500px]:hidden min-[500px]:flex-row"
      >
        <div className="flex gap-6">
          <h2 className="w-[38px] text-[14px] text-gray-400 min-[500px]:hidden">
            이름
          </h2>
          <h2 className="text-black-200">{invitation.dashboard.title}</h2>
        </div>
        <div className="flex gap-6">
          <p className="m w-[38px] text-[14px] text-gray-400 min-[500px]:hidden">
            초대자
          </p>
          <p className="text-black-200">{invitation.inviter.nickname}</p>
        </div>
      </div>
      <div className="min-[500px]:grid">
        <div className="flex gap-[10px]">
          <BoxButton
            paddingTopBottom="7"
            paddingRightLeft="37"
            radius="4"
            backgroundColor="purple"
            fontSize="12"
            onClick={() => onAccept(invitation.id)}
          >
            수락
          </BoxButton>
          <BoxButton
            paddingTopBottom="7"
            paddingRightLeft="37"
            radius="4"
            backgroundColor="white"
            fontSize="12"
            onClick={() => onReject(invitation.id)}
          >
            거절
          </BoxButton>
        </div>
      </div>
    </div>
  ),
);
DashboardItem.displayName = "DashboardItem";

export default InvitedDashboard;
