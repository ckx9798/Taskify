// pages/dashboard/[dashboardId]/edit.tsx

import InvitationList from "@/components/card-table/invitationList";
import Layout from "@/components/Layout";
import MemberTable from "@/components/MemberTable";
import EditDashboardCard from "@/components/modal/EditDashboardCard";
import { deleteMember, getMembers, MemberType } from "@/libs/api/Members";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import beforePage from "@/../public/icons/arrow_forward_black_icon.svg";
import { deleteDashboard } from "@/libs/api/dashboards";
import { useAtom } from "jotai";
import {
  dashboardCountAtom,
  dashboardListAtom,
} from "@/atoms/dashboardInfoAtom";

const EditDashboard: NextPageWithLayout = () => {
  const router = useRouter();

  // Jotai Atom 사용
  const [, setDashboardData] = useAtom(dashboardListAtom);
  const [, setDashboardCount] = useAtom(dashboardCountAtom);

  const [members, setMembers] = useState<MemberType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalCount / 4);
  const [dashboardId, setDashboardId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // 삭제 중 상태 관리

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
  }, [router]);

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

  const handleDeleteDashboard = async () => {
    if (dashboardId === null) {
      console.error("대시보드 ID가 존재하지 않습니다.");
      return;
    }

    const confirmed = confirm("정말로 이 대시보드를 삭제하시겠습니까?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteDashboard(dashboardId);
      alert("대시보드가 성공적으로 삭제되었습니다.");

      // Atom에서 대시보드 제거
      setDashboardData((prev) => prev.filter((d) => d.id !== dashboardId));
      setDashboardCount((prev) => prev - 1);

      router.push("/mydashboard"); // 삭제 후 대시보드 목록 페이지로 리디렉션
    } catch (error) {
      console.error("대시보드 삭제 중 오류 발생:", error);
      alert("대시보드 삭제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => router.push(`/dashboard/${dashboardId}`)}
        className="flex items-center justify-center gap-2 py-4 text-[16px] font-normal text-black-200"
      >
        <Image src={beforePage} alt="이전 페이지로 가기" />
        돌아가기
      </button>
      <div className="flex max-w-[620px] flex-col gap-4">
        <div className="w-full">
          <EditDashboardCard dashboardId={dashboardId} />
        </div>
        <div className="w-full rounded-lg bg-white">
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
        </div>
        <div className="w-full rounded-lg bg-white">
          <InvitationList dashBoardId={dashboardId!} />
        </div>
        <button
          className="order-1 mb-5 box-border flex h-[62px] w-[320px] flex-none flex-grow-0 flex-row items-center justify-center gap-2.5 rounded-lg border border-[#D9D9D9] bg-[#FAFAFA] px-[95px] py-5 hover:bg-gray-200"
          onClick={handleDeleteDashboard}
          disabled={isDeleting}
        >
          대시보드 삭제하기
        </button>
      </div>
    </div>
  );
};
const getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

EditDashboard.getLayout = getLayout;

export default EditDashboard;
