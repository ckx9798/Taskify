import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardList, Dashboard } from "@/libs/api/dashboards";
import Image from "next/image";
import CreateDashboardModal from "./CreateDashboardModal";
import DashboardPagination from "./DashboardPagination";
import DashboardCard from "./DashboardCard";

// 왼쪽 사이드바에서 대시보드 목록을 보여주고 생성하는 컴포넌트
export default function SideMenu() {
  // 새로운 대시보드 모달창 열기
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 대시보드 데이터 불러오기
  const [dashboardData, setDashboardData] = useState<Dashboard[]>([]);
  const [dashboardPage, setDashboardPage] = useState<number>(1);
  const [dashboardCount, setDashboardCount] = useState<number>(0);

  const loadDashboard = async (): Promise<void> => {
    const data = await getDashboardList({
      navigationMethod: "pagination",
      page: dashboardPage,
      size: 10,
    });
    setDashboardData(data.dashboards);
    setDashboardCount(data.totalCount);
  };

  useEffect(() => {
    loadDashboard();
  }, [dashboardPage]);

  return (
    <>
      <div
        className={
          "flex h-screen w-72 min-w-72 flex-col gap-2.5 bg-white px-2 py-5"
        }
      >
        {/* 상단  */}
        <div className={"mb-9"}>
          <Link href={"/"}>
            <Image
              src="/logo/midLogo.svg"
              alt="로고이미지"
              width={109}
              height={33}
            />
          </Link>
        </div>
        <div
          className={
            "flex items-center justify-between border-2 border-rose-500"
          }
        >
          <span className={"text-xs font-semibold text-gray-500"}>
            Dash Boards
          </span>
          <button onClick={openModal}>
            <Image
              src="/icons/sideMenuPlus.svg"
              alt="+"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* 대시보드 목록  */}
        <ul className="space-y-1">
          {dashboardData.map((dashboard) => {
            return (
              <li key={dashboard.id}>
                <DashboardCard dashboard={dashboard} />
              </li>
            );
          })}
        </ul>
        {/* 페이지네이션 버튼 */}
        <div className="fixed bottom-3">
          <DashboardPagination
            dashboardCount={dashboardCount}
            dashboardPage={dashboardPage}
            setDashboardPage={setDashboardPage}
          />
        </div>
      </div>
      {/* 모달창  */}
      <CreateDashboardModal
        isOpen={isModalOpen}
        refresh={loadDashboard}
        closeModal={closeModal}
      />
    </>
  );
}
