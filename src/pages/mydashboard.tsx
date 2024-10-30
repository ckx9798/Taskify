import CustomBtn from "@/components/CustomBtn";
import CreateDashboardModal from "@/components/modal/CreateDashboardModal";
import DashboardCard from "@/components/modal/DashboardCard";
import DashboardPagination from "@/components/modal/DashboardPagination";
import MydashboardList from "@/components/modal/MydashboardList";
import SideMenu from "@/components/modal/SideMenu";
import NavBar from "@/components/NavBar";
import PaginationButton from "@/components/PaginationButton";
import { Dashboard, getDashboardList } from "@/libs/api/dashboards";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function mydashboard() {
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
      size: 5,
    });
    setDashboardData(data.dashboards);
    setDashboardCount(data.totalCount);
  };

  useEffect(() => {
    loadDashboard();
  }, [dashboardPage]);

  return (
    <div className={"flex"}>
      <div>
        <SideMenu />
      </div>
      <div className={"flex w-screen flex-col"}>
        <NavBar myNickName="qwe" />
        <div className={"mt-3 grid grid-cols-3 grid-rows-2 gap-2 p-3"}>
          <CustomBtn
            borderRadius={"6"}
            content="새로운 대시보드"
            fontSize={"16"}
            fontWeight="600"
            width={354}
            height={70}
            onClick={openModal}
          />
          {dashboardData.map((dashboard) => {
            return (
              <div
                key={dashboard.id}
                className={
                  "h-[70px] w-[354px] rounded-lg border border-gray-400"
                }
              >
                <DashboardCard dashboard={dashboard} isArrow={"true"} />
              </div>
            );
          })}
        </div>

        <div className={"flex pr-6"}>
          {/* 페이지네이션 버튼 */}
          <div className="ml-auto">
            <DashboardPagination
              dashboardCount={dashboardCount}
              dashboardPage={dashboardPage}
              setDashboardPage={setDashboardPage}
            />
          </div>
        </div>
      </div>
      {/* 모달창  */}
      <CreateDashboardModal
        isOpen={isModalOpen}
        refresh={loadDashboard}
        closeModal={closeModal}
      />
    </div>
  );
}
