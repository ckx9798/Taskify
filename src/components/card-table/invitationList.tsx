import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import BoxButton from "../BoxButton";
import PaginationButton from "../PaginationButton";
import arrow_forward_gray_icon from "../../public/icons/arrow_forward_gray_icon.svg";
import arrow_back_gray_icon from "../../public/icons/arrow_back_gray_icon.svg";
import whitePlus from "../../public/svg/whitePlus.svg";

interface Invitation {
  id: number;
  invitee: { email: string };
}

interface InvitationsType {
  totalCount: number;
  invitations: Invitation[];
}

interface InvitationListProps {
  dashBoardId: number;
}

export default function InvitationList({ dashBoardId }: InvitationListProps) {
  const router = useRouter();
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<InvitationsType | null>({
    totalCount: 10,
    invitations: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      invitee: { email: `user${i + 1}@example.com` },
    })),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/dashboards/${dashBoardId}/invitations`,
          {
            params: { page: currentPage, size: pageSize },
          },
        );
        if (response?.data) {
          setData(response.data as InvitationsType);
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

  const handleInviteClick = () => {
    router.push(`/dashboard/${dashBoardId}/edit`);
  };

  const handleRemoveInvitation = (invitationId: number) => {
    setData((prevData) => {
      if (!prevData) return prevData;
      const updatedInvitations = prevData.invitations.filter(
        (inv) => inv.id !== invitationId,
      );
      return {
        ...prevData,
        totalCount: prevData.totalCount - 1,
        invitations: updatedInvitations,
      };
    });
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
            <PaginationButton
              size="large"
              onClickForward={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              onClickBack={() => {
                if (
                  currentPage < Math.ceil((data?.totalCount ?? 0) / pageSize)
                ) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              {[
                <img
                  key="foward"
                  src={arrow_forward_gray_icon.src}
                  alt="Forward"
                  style={{ marginLeft: "8px", blockSize: "40px" }}
                />,
                <img
                  key="back"
                  src={arrow_back_gray_icon.src}
                  alt="Back"
                  style={{ marginRight: "8px", blockSize: "40px" }}
                />,
                ,
              ]}
            </PaginationButton>
            <BoxButton
              paddingTopBottom="15"
              paddingRightLeft="10"
              radius="4"
              backgroundColor="purple"
              fontSize="18"
              onClick={handleInviteClick}
            >
              <img
                src={whitePlus.src}
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
        <div className="flex justify-between pl-[28px] pr-[104px] text-2xl text-gray-400 max-[499px]:hidden">
          이메일
        </div>

        <div>
          {loading ? (
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
            <ul style={{ listStyle: "none", padding: 0 }}>
              {data?.invitations
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((invitation) => (
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
