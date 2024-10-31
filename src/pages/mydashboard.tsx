import InvitedDashboard from "@/components/card-table/InvitedDashboard";
import CustomBtn from "@/components/CustomBtn";
import Layout from "@/components/Layout";
import CreateDashboardModal from "@/components/modal/CreateDashboardModal";
import DashboardCard from "@/components/modal/DashboardCard";
import DashboardPagination from "@/components/modal/DashboardPagination";
import { Dashboard, getDashboardList } from "@/libs/api/dashboards";
import React, { useEffect, useState } from "react";

export default function Mydashboard() {
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
    <div className={"min-w-screen flex min-h-screen"}>
      <div className={"flex w-screen grow flex-col items-center"}>
        <main
          className={"flex h-screen w-screen grow flex-col bg-gray-100 p-10"}
        >
          <section>
            <ul className={"grid w-[1022px] grid-cols-3 grid-rows-3 gap-2"}>
              <li>
                <CustomBtn
                  borderRadius={"8"}
                  content="새로운 대시보드"
                  fontSize={"16"}
                  fontWeight="600"
                  width={354}
                  height={70}
                  onClick={openModal}
                />
              </li>
              {dashboardData.map((dashboard) => {
                return (
                  <li
                    key={dashboard.id}
                    className={"rounded-lg border border-gray-300 bg-white"}
                  >
                    <DashboardCard dashboard={dashboard} isArrow={true} />
                  </li>
                );
              })}
              <div className="col-span-3 flex max-h-10 justify-end">
                {/* 페이지네이션 버튼 */}
                <DashboardPagination
                  dashboardCount={dashboardCount}
                  dashboardPage={dashboardPage}
                  setDashboardPage={setDashboardPage}
                  data={5}
                />
              </div>
            </ul>
          </section>
          <section className={"h-[500px] w-[1022px]"}>
            <InvitedDashboard />
          </section>

          {/* 모달창  */}
          <CreateDashboardModal
            isOpen={isModalOpen}
            refresh={loadDashboard}
            closeModal={closeModal}
          />
        </main>
      </div>
    </div>
  );
}

const getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

Mydashboard.getLayout = getLayout;
