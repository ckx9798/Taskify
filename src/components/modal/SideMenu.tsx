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
          "flex h-screen w-[68px] min-w-[68px] flex-col gap-2.5 bg-white px-2 py-5 md:w-40 md:min-w-40 xl:w-72 xl:min-w-72"
        }
      >
        {/* 상단  */}
        <div className={"mb-9 flex justify-center"}>
          <Link href={"/"}>
            <Image
              src="/logo/midLogo.svg"
              alt="로고이미지"
              width={109}
              height={33}
              className={"hidden md:block"}
            />
            <Image
              src="/logo/smallLogo.svg"
              alt="로고이미지"
              width={27}
              height={30}
              className={"block md:hidden"}
            />
          </Link>
        </div>
        <div
          className={"flex items-center justify-center px-5 md:justify-between"}
        >
          <span
            className={
              "hidden text-xs font-semibold text-gray-500 md:inline md:text-base"
            }
          >
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

        <div
          className={
            "mt-2 flex flex-col gap-5 border-b border-t border-b-gray-300 border-t-gray-300 p-5"
          }
        >
          <Link href={"/mydashboard"}>
            <div className={"flex justify-center gap-5 md:justify-start"}>
              <span>📝</span>
              <span className={"hidden md:block"}> 내 대시보드</span>
            </div>
          </Link>
          <Link href={"/mypage"}>
            <div className={"flex justify-center gap-6 md:justify-start"}>
              <span>🎈</span>
              <span className={"hidden md:block"}> 내 계정</span>
            </div>
          </Link>
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
        <div className="fixed bottom-3 hidden md:block">
          <DashboardPagination
            dashboardCount={dashboardCount}
            dashboardPage={dashboardPage}
            setDashboardPage={setDashboardPage}
            data={10}
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
