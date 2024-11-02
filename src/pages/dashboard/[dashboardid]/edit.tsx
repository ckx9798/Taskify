// pages/dashboard/[dashboardId]/edit.tsx

import InvitationList from "@/components/card-table/invitationList";
import Layout from "@/components/Layout";
import MemberTable from "@/components/MemberTable";
import EditDashboardCard from "@/components/modal/EditDashboardCard";
import { deleteMember, getMembers, MemberType } from "@/libs/api/Members";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditDashboard: NextPageWithLayout = () => {
  const router = useRouter();
  const [members, setMembers] = useState<MemberType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalCount / 4);
  const [dashboardId, setDashboardId] = useState<number | null>(null);

  useEffect(() => {
    // router.isReady로 라우터가 준비되었는지 확인합니다.
    if (!router.isReady) return;

    const { dashboardid } = router.query;

    // dashboardid가 있고, 문자열 타입인지 확인합니다.
    if (dashboardid && typeof dashboardid === "string") {
      const id = Number(dashboardid);
      setDashboardId(id); // dashboardId 상태 설정

      const createdDashboard = {
        dashboardId: Number(dashboardid),
        page: 1,
      };

      async function fetchData() {
        const response = await getMembers(createdDashboard);
        setMembers(response.members);
        setTotalCount(response.totalCount);
        console.log(response.members);
      }
      fetchData();
    }
  }, [router.isReady, router.query.dashboardid]);

  const handleDeleteMember = async (memberId: number) => {
    if (!confirm("정말로 이 멤버를 삭제하시겠습니까?")) return;

    try {
      await deleteMember(memberId);
      // 멤버 목록에서 삭제된 멤버 제거
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId),
      );
      // 총 멤버 수 업데이트
      setTotalCount((prevCount) => prevCount - 1);
      alert("멤버가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("멤버 삭제에 실패했습니다.");
    }
  };

  return (
    <div>
      <button onClick={() => router.push(`/dashboard/${dashboardId}`)}>
        돌아가기
      </button>
      <EditDashboardCard dashboardId={dashboardId} dashboardTitle="dk" />
      <MemberTable
        members={members}
        totalPage={totalPage}
        currentPage={currentPage}
        onClickBack={() => {
          if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
          }
        }}
        onClickForward={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
        onClickDelete={handleDeleteMember}
      />
      <div className="w-[620px]">
        <InvitationList dashBoardId={dashboardId} />
      </div>
    </div>
  );
};
const getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

EditDashboard.getLayout = getLayout;

export default EditDashboard;
