import { useEffect, useState } from "react";
import BoxButton from "../BoxButton";
import PaginationButton from "../PaginationButton";
import arrow_forward_gray_icon from "@/../public/icons/arrow_forward_gray_icon.svg";
import arrow_back_gray_icon from "@/../public/icons/arrow_back_gray_icon.svg";
import whitePlus from "@/../public/svg/whitePlus.svg";
import {
  deleteDashboardInvitation,
  getDashboardInvitations,
} from "@/libs/api/dashboards";
import DashboardInvite from "../modal/DashboardInvite";
import Image from "next/image";

interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboardId: {
    title: string;
    id: number;
  };
  invitee: {
    email: string;
    nickname: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationsType {
  totalCount: number;
  invitations: Invitation[];
}

interface InvitationListProps {
  dashBoardId: number; // 대시보드 ID를 전달하기 위한 prop
}

export default function InvitationList({ dashBoardId }: InvitationListProps) {
  const pageSize = 5; // 페이지당 표시할 초대 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [data, setData] = useState<InvitationsType | undefined>(); // 초대 데이터 상태
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [isopen, setIsopen] = useState(false); // 모달 상태 관리

  // 대시보드의 초대 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true);
      try {
        const response = await getDashboardInvitations(dashBoardId, {
          page: currentPage,
          size: pageSize,
        });
        if (response) {
          setData(response as InvitationsType);
          console.log("초대 데이터d:", response);
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setLoading(false);
      }
    };
    if (dashBoardId) {
      fetchInvitations();
    }
  }, [dashBoardId, currentPage]);

  // 초대하기 버튼 클릭 시 대시보드 편집 페이지로 이동
  const handleOpenInvite = () => {
    setIsopen(true);
  };
  const handelColseInvite = () => {
    setIsopen(false);
  };

  // 초대 취소 기능 (특정 초대 삭제)
  const handleRemoveInvitation = async (invitationId: number) => {
    if (!confirm("정말로 이 초대를 취소하시겠습니까?")) return;

    setLoading(true);
    try {
      await deleteDashboardInvitation(dashBoardId, invitationId);
      // 초대 목록에서 삭제
      setData((prevData) => {
        if (!prevData) return prevData;
        const updatedInvitations = prevData.invitations.filter(
          (inv) => inv.id !== invitationId,
        );
        return {
          ...prevData,
          totalCount: prevData.totalCount - 1,
          invitations: updatedInvitations,
        } as InvitationsType;
      });
    } catch (error) {
      console.error("Error removing invitation:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section
        style={{
          padding: "2.8rem",
          maxWidth: "62rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2.8rem",
          borderRadius: "0.8rem",
          background: "var(--color-white)",
          boxShadow:
            "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
        }}
      >
        {/* 헤더 부분: 초대 내역 제목과 페이지 정보, 버튼들 */}
        <div
          style={{
            paddingBottom: "2.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.6rem",
          }}
        >
          <div style={{ flex: "1 1 auto", minWidth: "200px" }}>
            <h2
              style={{
                padding: "0.4rem 0",
                fontSize: "2.4rem",
                fontWeight: 700,
                color: "var(--color-black_33)",
              }}
            >
              초대 내역
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--color-black_33)",
                marginRight: "15px",
              }}
            >
              {Math.ceil((data?.totalCount ?? 0) / pageSize)} 페이지 중{" "}
              {currentPage}
            </span>
            {/* 페이지네이션 버튼 */}
            <PaginationButton
              size="large"
              onClickBack={() => {
                if (
                  currentPage < Math.ceil((data?.totalCount ?? 0) / pageSize)
                ) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              onClickForward={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              {/* 페이지네이션 버튼의 자식 요소: 이미지 아이콘 */}
              <Image
                key="foward"
                src={arrow_forward_gray_icon}
                alt="Forward"
                style={{ marginLeft: "8px", blockSize: "40px" }}
              />
              <Image
                key="back"
                src={arrow_back_gray_icon}
                alt="Back"
                style={{ marginRight: "8px", blockSize: "40px" }}
              />
            </PaginationButton>
            {/* 초대하기 버튼 */}
            <DashboardInvite
              isOpen={isopen}
              onClose={handelColseInvite}
              dashboardId={dashBoardId}
            />
            <BoxButton
              paddingTopBottom="15"
              paddingRightLeft="10"
              radius="4"
              backgroundColor="purple"
              fontSize="18"
              onClick={handleOpenInvite}
            >
              <Image
                src={whitePlus}
                alt="Plus Icon"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  blockSize: "24px",
                }}
              />
              <div className="mr-[10px] text-xl">초대하기</div>
            </BoxButton>
          </div>
        </div>
        {/* 초대 내역 헤더 */}
        <div className="flex justify-between pl-[28px] pr-[104px] text-2xl text-gray-400 max-[499px]:hidden">
          이메일
        </div>

        <div>
          {loading ? (
            // 로딩 중 표시
            <p
              style={{
                textAlign: "center",
                fontSize: "1.6rem",
                color: "var(--color-gray40)",
              }}
            >
              로딩 중...
            </p>
          ) : data?.totalCount === 0 ? (
            // 초대 내역이 없을 때 표시
            <p
              style={{
                textAlign: "center",
                fontSize: "1.6rem",
                color: "var(--color-gray40)",
              }}
            >
              초대 내역이 없어요
            </p>
          ) : (
            // 초대 목록
            <ul style={{ listStyle: "none", padding: 0 }}>
              {data?.invitations.map((invitation) => (
                <li
                  key={invitation.id}
                  style={{
                    padding: "1.9rem 2.8rem",
                    borderBottom: "1px solid var(--color-gray20)",
                    listStyle: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 400,
                        color: "var(--color-black_33)",
                      }}
                    >
                      {invitation.invitee.email}
                    </span>
                    <div className="flex gap-[10px]">
                      {/* 초대 취소 버튼 */}
                      <BoxButton
                        paddingTopBottom="14"
                        paddingRightLeft="44"
                        radius="4"
                        backgroundColor="white"
                        fontSize="18"
                        onClick={() => handleRemoveInvitation(invitation.id)}
                      >
                        <div className="text-xl, font-bold">취소</div>
                      </BoxButton>
                    </div>
                  </div>

                  {/* 초대 목록 사이의 구분선 */}
                  <hr className="my-4 w-full border-t border-gray-300" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
